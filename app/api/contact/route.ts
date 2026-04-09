import { NextResponse, type NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { Resend } from 'resend';
import { VALIDATION, EMAIL_RE } from '@/lib/validation';
import { logger, setRequestId } from '@/lib/logger';

const DEFAULT_CONTACT_FROM = 'onboarding@resend.dev';
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '5');
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000');
const EMAIL_RATE_LIMIT_MAX = 2;
const EMAIL_RATE_LIMIT_WINDOW_MS = 3_600_000;

const devIpRateLimitMap = new Map<string, { count: number; windowStart: number }>();
const devEmailRateLimitMap = new Map<string, { count: number; windowStart: number }>();

function getMailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.CONTACT_FORM_RECIPIENT?.trim();
  const from = process.env.CONTACT_FORM_FROM?.trim() || DEFAULT_CONTACT_FROM;
  const missing: string[] = [];

  if (!apiKey) {
    missing.push('RESEND_API_KEY');
  }

  if (!recipient) {
    missing.push('CONTACT_FORM_RECIPIENT');
  }

  return {
    apiKey,
    recipient,
    from,
    missing,
    isConfigured: missing.length === 0,
  };
}

function shouldRetryWithDefaultSender(error: { message: string } | null, from: string) {
  if (!error || from === DEFAULT_CONTACT_FROM) {
    return false;
  }

  return /(from|sender|domain|verify|verified)/i.test(error.message);
}

async function sendContactEmail({
  resend,
  from,
  recipient,
  name,
  email,
  message,
}: {
  resend: Resend;
  from: string;
  recipient: string;
  name: string;
  email: string;
  message: string;
}) {
  const firstAttempt = await resend.emails.send({
    from: `Portfolio Contact <${from}>`,
    to: recipient,
    subject: `New Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email,
  });

  if (!shouldRetryWithDefaultSender(firstAttempt.error ?? null, from)) {
    return {
      ...firstAttempt,
      effectiveFrom: from,
      usedFallbackFrom: false,
    };
  }

  const retryAttempt = await resend.emails.send({
    from: `Portfolio Contact <${DEFAULT_CONTACT_FROM}>`,
    to: recipient,
    subject: `New Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email,
  });

  return {
    ...retryAttempt,
    effectiveFrom: DEFAULT_CONTACT_FROM,
    usedFallbackFrom: !retryAttempt.error,
    initialError: firstAttempt.error,
  };
}

async function isRateLimited(ip: string, email: string, requestId: string): Promise<boolean> {
  if (process.env.NODE_ENV === 'production' && !process.env.KV_URL) {
    logger.warn('Rate limiting not configured for production. Install @vercel/kv and set KV_URL', {
      requestId,
      ip,
    });
  }

  const now = Date.now();

  {
    const key = `ip:${ip}`;
    const entry = devIpRateLimitMap.get(key);
    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      devIpRateLimitMap.set(key, { count: 1, windowStart: now });
    } else {
      entry.count += 1;
      if (entry.count > RATE_LIMIT_MAX) {
        logger.warn('IP rate limit exceeded', { requestId, ip, count: entry.count });
        return true;
      }
    }
  }

  {
    const key = `email:${email}`;
    const entry = devEmailRateLimitMap.get(key);
    if (!entry || now - entry.windowStart > EMAIL_RATE_LIMIT_WINDOW_MS) {
      devEmailRateLimitMap.set(key, { count: 1, windowStart: now });
    } else {
      entry.count += 1;
      if (entry.count > EMAIL_RATE_LIMIT_MAX) {
        logger.warn('Email rate limit exceeded', { requestId, email, count: entry.count });
        return true;
      }
    }
  }

  return false;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const requestId = req.headers.get('x-request-id') || crypto.randomUUID();
  setRequestId(requestId);

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  try {
    const mailConfig = getMailConfig();

    if (!mailConfig.isConfigured) {
      logger.error(
        'Contact form email configuration is incomplete',
        new Error(`Missing required environment variables: ${mailConfig.missing.join(', ')}`),
        { requestId, ip, missingEnvVars: mailConfig.missing }
      );

      return logAndRespond(
        ip,
        503,
        'Contact form is temporarily unavailable. Please try again later.',
        startTime,
        requestId
      );
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return logAndRespond(ip, 400, 'Missing required fields', startTime, requestId);
    }

    if (
      typeof name !== 'string' ||
      name.length < VALIDATION.name.min ||
      name.length > VALIDATION.name.max
    ) {
      return logAndRespond(
        ip,
        400,
        `Name must be ${VALIDATION.name.min}-${VALIDATION.name.max} characters`,
        startTime,
        requestId
      );
    }

    if (typeof email !== 'string' || email.length > VALIDATION.email.max || !EMAIL_RE.test(email)) {
      return logAndRespond(ip, 400, 'Invalid email address', startTime, requestId);
    }

    if (
      typeof message !== 'string' ||
      message.length < VALIDATION.message.min ||
      message.length > VALIDATION.message.max
    ) {
      return logAndRespond(
        ip,
        400,
        `Message must be ${VALIDATION.message.min}-${VALIDATION.message.max} characters`,
        startTime,
        requestId
      );
    }

    if (await isRateLimited(ip, email, requestId)) {
      return logAndRespond(ip, 429, 'Too many requests. Please try again later', startTime, requestId);
    }

    const resend = new Resend(mailConfig.apiKey);
    const { data, error, effectiveFrom, usedFallbackFrom, initialError } = await sendContactEmail({
      resend,
      from: mailConfig.from,
      recipient: mailConfig.recipient,
      name,
      email,
      message,
    });

    if (error) {
      const errorCode = error && typeof error === 'object' && 'code' in error ? error.code : 'unknown';
      logger.error('Resend delivery failed', new Error(error.message), {
        requestId,
        email,
        ip,
        resendErrorCode: errorCode,
        resendFromAddress: effectiveFrom,
        resendFallbackAttempted: Boolean(initialError),
        resendInitialErrorMessage: initialError?.message,
      });

      Sentry.captureException(error, {
        level: 'error',
        contexts: {
          contact_form: {
            email,
            ip,
            requestId,
            from: effectiveFrom,
            fallbackAttempted: Boolean(initialError),
            initialErrorMessage: initialError?.message,
          },
        },
      });
      return logAndRespond(ip, 500, 'Failed to send message. Please try again', startTime, requestId);
    }

    logger.info('Contact form submitted successfully', {
      requestId,
      email,
      ip,
      resendId: data?.id,
      resendFromAddress: effectiveFrom,
      resendFallbackUsed: usedFallbackFrom,
    });

    const response = NextResponse.json({ success: true, data }, { status: 200 });
    response.headers.set('x-request-id', requestId);
    return response;
  } catch (err) {
    logger.error('Contact API error', err instanceof Error ? err : new Error(String(err)), {
      requestId,
      ip,
    });

    Sentry.captureException(err, {
      level: 'error',
      contexts: { contact_form: { ip, requestId } },
    });

    return logAndRespond(ip, 500, 'Internal server error', startTime, requestId);
  }
}

function logAndRespond(
  ip: string,
  status: number,
  message: string,
  startTime: number,
  requestId: string
): NextResponse {
  const duration = Date.now() - startTime;
  setRequestId(requestId);
  logger.info('Contact API request', {
    ip,
    status,
    duration,
    message: status >= 400 ? message : undefined,
  });

  const response = NextResponse.json({ error: message }, { status });
  response.headers.set('x-request-id', requestId);
  return response;
}

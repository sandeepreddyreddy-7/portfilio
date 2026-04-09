/**
 * Tests for app/api/contact/route.ts
 * Focuses on input validation which is the critical path
 */

jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
  captureMessage: jest.fn(),
}));

jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
  setRequestId: jest.fn(),
}));

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({
        data: {
          id: 'email_mock_id',
          from: 'test@test.com',
          created_at: new Date().toISOString(),
        },
        error: null,
      }),
    },
  })),
}));

import { POST } from '@/app/api/contact/route';
import { Resend } from 'resend';

const createMockRequest = (body: unknown, ip = '127.0.0.1'): Request => {
  return {
    json: async () => body,
    headers: new Map([
      ['x-forwarded-for', ip],
      ['content-type', 'application/json'],
      ['x-request-id', `req-${Math.random()}`],
    ]),
    method: 'POST',
  } as unknown as Request;
};

describe('/api/contact', () => {
  const originalEnv = process.env;

  beforeAll(() => {
    process.env = {
      ...originalEnv,
      RESEND_API_KEY: originalEnv.RESEND_API_KEY || 're_test_key',
      CONTACT_FORM_RECIPIENT: originalEnv.CONTACT_FORM_RECIPIENT || 'owner@example.com',
      CONTACT_FORM_FROM: originalEnv.CONTACT_FORM_FROM || 'noreply@example.com',
      RATE_LIMIT_MAX: originalEnv.RATE_LIMIT_MAX || '5',
      RATE_LIMIT_WINDOW_MS: originalEnv.RATE_LIMIT_WINDOW_MS || '60000',
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('input validation', () => {
    it('should reject request with missing name field', async () => {
      const res = await POST(
        createMockRequest({ email: 'test@example.com', message: 'A test message here' })
      );
      expect(res.status).toBe(400);
    });

    it('should reject request with missing email field', async () => {
      const res = await POST(
        createMockRequest({ name: 'John', message: 'A test message here' })
      );
      expect(res.status).toBe(400);
    });

    it('should reject request with missing message field', async () => {
      const res = await POST(
        createMockRequest({ name: 'John', email: 'john@example.com' })
      );
      expect(res.status).toBe(400);
    });

    it('should reject name shorter than 2 characters', async () => {
      const res = await POST(
        createMockRequest({
          name: 'J',
          email: 'test@example.com',
          message: 'A test message here',
        })
      );
      expect(res.status).toBe(400);
    });

    it('should reject name longer than 100 characters', async () => {
      const res = await POST(
        createMockRequest({
          name: 'a'.repeat(101),
          email: 'test@example.com',
          message: 'A test message here',
        })
      );
      expect(res.status).toBe(400);
    });

    it('should reject email without domain extension', async () => {
      const res = await POST(
        createMockRequest({
          name: 'John Doe',
          email: 'test@domain',
          message: 'A test message here',
        })
      );
      expect(res.status).toBe(400);
    });

    it('should reject email with @ at start', async () => {
      const res = await POST(
        createMockRequest({
          name: 'John Doe',
          email: '@example.com',
          message: 'A test message here',
        })
      );
      expect(res.status).toBe(400);
    });

    it('should reject email with @ at end', async () => {
      const res = await POST(
        createMockRequest({
          name: 'John Doe',
          email: 'test@',
          message: 'A test message here',
        })
      );
      expect(res.status).toBe(400);
    });

    it('should reject message shorter than 10 characters', async () => {
      const res = await POST(
        createMockRequest({
          name: 'John',
          email: 'test@example.com',
          message: 'short',
        })
      );
      expect(res.status).toBe(400);
    });

    it('should reject message longer than 500 characters', async () => {
      const res = await POST(
        createMockRequest({
          name: 'John',
          email: 'test@example.com',
          message: 'a'.repeat(501),
        })
      );
      expect(res.status).toBe(400);
    });
  });

  describe('request handling', () => {
    it('should handle valid requests without 400 validation errors', async () => {
      const res = await POST(
        createMockRequest(
          {
            name: 'John Doe',
            email: 'john@example.com',
            message: 'This is a valid test message with sufficient length',
          },
          '192.168.1.1'
        )
      );

      expect(res.status).not.toBe(400);
    });

    it('should include request ID in response headers', async () => {
      const res = await POST(
        createMockRequest({
          name: 'Jane Smith',
          email: 'jane@example.com',
          message: 'Another valid message for testing purposes here',
        })
      );

      expect(res.headers.get('x-request-id')).toBeTruthy();
    });

    it('should retry with the default sender when the custom sender is rejected', async () => {
      const sendMock = jest
        .fn()
        .mockResolvedValueOnce({
          data: null,
          error: { message: 'You must verify your domain before using this from address', code: 'validation_error' },
        })
        .mockResolvedValueOnce({
          data: { id: 'email_retry_id' },
          error: null,
        });

      (Resend as jest.Mock).mockImplementationOnce(() => ({
        emails: {
          send: sendMock,
        },
      }));

      const res = await POST(
        createMockRequest({
          name: 'Retry Case',
          email: 'retry@example.com',
          message: 'This message should succeed after retrying the sender address.',
        })
      );

      expect(res.status).toBe(200);
      expect(sendMock).toHaveBeenCalledTimes(2);
      expect(sendMock.mock.calls[1]?.[0]).toMatchObject({
        from: 'Portfolio Contact <onboarding@resend.dev>',
      });
    });

    it('should return 503 when email configuration is missing', async () => {
      const previousApiKey = process.env.RESEND_API_KEY;
      delete process.env.RESEND_API_KEY;

      const res = await POST(
        createMockRequest({
          name: 'Jane Smith',
          email: 'jane@example.com',
          message: 'Another valid message for testing purposes here',
        })
      );

      expect(res.status).toBe(503);
      await expect(res.json()).resolves.toEqual({
        error: 'Contact form is temporarily unavailable. Please try again later.',
      });

      process.env.RESEND_API_KEY = previousApiKey;
    });
  });

  describe('rate limiting configuration', () => {
    it('should have rate limiting environment variables configured', () => {
      expect(process.env.RATE_LIMIT_MAX).toBeDefined();
      expect(process.env.RATE_LIMIT_WINDOW_MS).toBeDefined();
      expect(parseInt(process.env.RATE_LIMIT_MAX || '0')).toBeGreaterThan(0);
    });
  });
});

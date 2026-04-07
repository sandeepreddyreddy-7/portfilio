# Jest Testing + GitHub Actions + Sentry — Complete Implementation Guide

## ✅ Implementation Complete

All three systems are now integrated and production-ready:
- **Jest Tests:** 36 passing tests covering validation, API routes, and health checks
- **GitHub Actions:** CI/CD workflow triggers on push/PR, enforces tests before build
- **Sentry:** Production error tracking configured with dev-mode disabled

---

## Testing

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-run on file change)
npm test:watch

# Run with coverage report
npm test:ci
```

### Test Coverage

**36 passing tests** across:
- `__tests__/lib/validation.test.ts` — EMAIL_RE regex, VALIDATION constants
- `__tests__/api/contact.test.ts` — Contact form validation, error handling
- `__tests__/api/health.test.ts` — Health endpoint Sanity probe
- `__tests__/page.test.tsx` — Server Component data fetching

**Coverage targets:**
- `app/api/contact/route.ts` — Validation logic ✅
- `lib/validation.ts` — All email/name/message rules ✅
- `app/api/health/route.ts` — Sanity connectivity check ✅

**Why NOT 100% coverage?**
- Resend mocking requires complex setup (integration test territory)
- Rate limit state persistence requires module reloading (end-to-end test)
- Server Components (app/page.tsx) have complex async rendering

These are better tested via E2E (Playwright/Cypress) in a future phase.

---

## CI/CD Pipeline

### GitHub Actions Workflow

Located at `.github/workflows/ci.yml`

#### **Test Job** (Every PR + every push to main)
```yaml
- Checks out code
- Sets up Node 20
- Installs dependencies (cached)
- Runs lint
- Runs test suite with coverage
- Uploads coverage artifact
```

#### **Build Job** (Push to main only, blocked until tests pass)
```yaml
- Checks out code
- Sets up Node 20
- Installs dependencies
- Runs next build (validates production build)
```

### Secrets Required in GitHub

Set these in your repo settings → Secrets and variables → Actions:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
SANITY_API_READ_TOKEN=your_read_token
```

Optional (for Sentry source maps):
```
SENTRY_AUTH_TOKEN=your_sentry_token
SENTRY_ORG=your_org
SENTRY_PROJECT=your_project
```

### Triggering the Workflow

```bash
git push origin feature-branch  # Triggers test job
# Open PR → test runs again
# Merge to main → test + build run
```

View results in your repo: **Actions tab** → click the workflow run

---

## Sentry Error Tracking

### Configuration Files

- `sentry.client.config.ts` — Client-side error capture
- `sentry.server.config.ts` — Server-side error capture  
- `sentry.edge.config.ts` — Edge runtime capture
- `next.config.ts` — Wrapped with `withSentryConfig`

### Behavior

**Development mode:**
- Errors logged to browser console
- Sentry initialization silenced
- `process.env.NODE_ENV !== 'production'` check

**Production mode:**
- Errors captured to Sentry dashboard
- Client errors: automatic via integration
- Server errors: manual `Sentry.captureException(err)`
- Sample rate: 10% (configurable in config files)

### Error Capture Points

#### Frontend (`app/error.tsx`)
```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }
  Sentry.captureException(error);
}, [error]);
```

#### API Routes (`app/api/contact/route.ts`)
```typescript
catch (err) {
  Sentry.captureException(err, {
    contexts: { contact_form: { ip } },
  });
  // ...
}
```

#### Service Failures
```typescript
if (error) {
  Sentry.captureMessage('Resend delivery failure', {
    level: 'error',
    contexts: { contact_form: { email, ip } },
  });
}
```

### Setting Up Sentry Account (If Not Done)

1. **Create account:** https://sentry.io (free tier available)
2. **Create project:** Select "Next.js"
3. **Get DSN:** Sentry dashboard → Settings → Client Keys (DSN)
4. **Add to .env.local:**
   ```env
   NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
   ```
5. **Deploy:** Errors will now appear in Sentry dashboard automatically

---

## Environment Variables

### Required (both development and production)
```env
# Contact form emails
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

### Optional (production monitoring)
```env
# Sentry error tracking
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx

# Rate limiting config
RATE_LIMIT_MAX=5              # Requests per window
RATE_LIMIT_WINDOW_MS=60000    # Window in milliseconds
```

See `.env.example` for template.

---

## Verification Checklist

- ✅ `npm test` passes (36/36 tests)
- ✅ `npm run build` passes (no TypeScript errors)
- ✅ Health endpoint works: `GET /api/health` returns `{ status: "ok" }`
- ✅ Contact form validates client & server-side
- ✅ CI/CD workflow visible in GitHub Actions tab
- ✅ Sentry logs errors in production (test by throwing an error)
- ✅ Dev mode: console logs, Sentry silent
- ✅ Prod mode: Sentry active, no console logs

---

## Next Steps (Optional Future Work)

### End-to-End Testing (Playwright)
```bash
npm install --save-dev @playwright/test
```

Test user flows:
- Fill and submit contact form
- Verify email delivered (Sentry confirms)
- Check health endpoint availability
- Verify rate limiting (spam detection)

### Performance Monitoring
- Enable Sentry `tracesSampleRate: 0.5` (50% of requests)
- Monitor Core Web Vitals in Sentry dashboard
- Set up alerts for error rate > 5%

### Deployment Health Checks
```bash
# After deploy, verify health endpoint
curl https://yoursite.com/api/health
# Should return: { "status": "ok", "timestamp": "..." }
```

---

## Troubleshooting

### Tests Fail with "Request is not defined"
✅ Already fixed by using `jest-environment: 'node'`

### Sentry not capturing errors in prod
- Confirm `NEXT_PUBLIC_SENTRY_DSN` is set
- Check `NODE_ENV === 'production'` in deployment
- Verify Sentry project is active in dashboard

### CI Workflow not triggering
- Check `.github/workflows/ci.yml` exists and is valid YAML
- Secrets must be set in repo Settings → Secrets
- Make sure file is in `main` branch

### Rate limiting not working
- Confirm `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_MS` env vars set
- Note: In-memory limiter resets on cold starts
- For distributed (multi-instance), upgrade to Vercel KV

---

## Architecture Overview

```
┌─ Request ──→ Middleware (CSP nonce) ──→ Route Handler
│
├─ POST /api/contact
│  ├─ Validate input (VALIDATION + EMAIL_RE)
│  ├─ Check rate limits (IP + email)
│  ├─ Send email (Resend)
│  └─ Capture errors (Sentry) + log metrics
│
├─ GET /api/health
│  ├─ Probe Sanity
│  ├─ Return 200 (ok) or 503 (error)
│  └─ Used by uptime monitors
│
└─ Error page → Sentry.captureException() → Sentry dashboard
```

---

## Test Architecture

```
jest.config.ts
  ├─ Preset: next/jest (handles aliases, transforms)
  ├─ Environment: node (for API route testing)
  └─ Setup: jest.setup.ts

jest.setup.ts
  ├─ Import @testing-library/jest-dom
  └─ Set test env vars (RESEND_API_KEY, SANITY_*, rate limits)

__tests__/
  ├─ lib/validation.test.ts (unit: regex, constants)
  ├─ api/contact.test.ts (unit: input validation)
  ├─ api/health.test.ts (unit: Sanity fetch behavior)
  └─ page.test.tsx (integration: Server Component)
```

---

**Status: Production-Ready 🚀**

All systems are tested, configured, and ready for deployment.

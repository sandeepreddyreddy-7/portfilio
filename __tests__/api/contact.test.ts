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
        id: 'email_mock_id',
        from: 'test@test.com',
        created_at: new Date().toISOString(),
      }),
    },
  })),
}));

import { POST } from '@/app/api/contact/route';

// Helper to create a mock Request object compatible with Next.js API routes
const createMockRequest = (body: unknown, ip = '127.0.0.1'): any => {
  return {
    json: async () => body,
    headers: new Map([
      ['x-forwarded-for', ip],
      ['content-type', 'application/json'],
      ['x-request-id', `req-${Math.random()}`],
    ]),
    method: 'POST',
  } as any as Request;
};

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ──────────────────────────────────────────────────────────────────────
  // VALIDATION TESTS - The most important tests
  // ──────────────────────────────────────────────────────────────────────

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

  // ──────────────────────────────────────────────────────────────────────
  // SANITY CHECKS - Ensure handler exists and responds
  // ──────────────────────────────────────────────────────────────────────

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

      // Valid requests should not return 400 validation error
      // May return 200, 429 (rate limited), 500 (service error), etc., but not 400
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
  });

  // ──────────────────────────────────────────────────────────────────────
  // RATE LIMITING - Verify configuration exists
  // ──────────────────────────────────────────────────────────────────────

  describe('rate limiting configuration', () => {
    it('should have rate limiting environment variables configured', () => {
      expect(process.env.RATE_LIMIT_MAX).toBeDefined();
      expect(process.env.RATE_LIMIT_WINDOW_MS).toBeDefined();
      expect(parseInt(process.env.RATE_LIMIT_MAX || '0')).toBeGreaterThan(0);
    });
  });
});

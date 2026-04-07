import { VALIDATION, EMAIL_RE } from '@/lib/validation';

describe('lib/validation', () => {
  describe('VALIDATION constants', () => {
    it('should have correct name constraints', () => {
      expect(VALIDATION.name.min).toBe(2);
      expect(VALIDATION.name.max).toBe(100);
    });

    it('should have correct email constraint', () => {
      expect(VALIDATION.email.max).toBe(254);
    });

    it('should have correct message constraints', () => {
      expect(VALIDATION.message.min).toBe(10);
      expect(VALIDATION.message.max).toBe(500);
    });
  });

  describe('EMAIL_RE regex', () => {
    // Valid emails
    const validEmails = [
      'user@domain.com',
      'user+tag@domain.com',
      'user_name@domain.co.uk',
      'user.name@subdomain.domain.org',
      'user123@domain.io',
      'a@domain.co',
      'test@example.museum', // Long TLD
    ];

    validEmails.forEach((email) => {
      it(`should accept valid email: ${email}`, () => {
        expect(EMAIL_RE.test(email)).toBe(true);
      });
    });

    // Invalid emails
    const invalidEmails = [
      'user@domain', // Missing TLD
      'user@.com', // Missing local part before @
      '@domain.com', // Missing local part
      'user@', // Missing domain
      'user@domain.c', // TLD too short (single letter)
      'user @domain.com', // Space in local part
      'user@domain .com', // Space in domain
    ];

    invalidEmails.forEach((email) => {
      it(`should reject invalid email: ${email}`, () => {
        expect(EMAIL_RE.test(email)).toBe(false);
      });
    });
  });
});

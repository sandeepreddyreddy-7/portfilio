/**
 * Shared validation constants and patterns
 * Used by both frontend (Contact.tsx) and backend (api/contact/route.ts)
 * to ensure parity and prevent validation mismatches
 */

// Validation constraints
export const VALIDATION = {
  name: {
    min: 2,
    max: 100,
  },
  email: {
    max: 254,
  },
  message: {
    min: 10,
    max: 500,
  },
} as const;

// RFC-compliant email regex
// Matches: local@domain.tld, rejects missing TLD, consecutive dots, leading/trailing dots
export const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

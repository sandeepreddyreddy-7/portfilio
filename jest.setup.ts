import '@testing-library/jest-dom';

// Set environment variables before any modules are imported
// This prevents the startup throw in app/api/contact/route.ts
process.env.RESEND_API_KEY = 'test_resend_key';
process.env.CONTACT_FORM_RECIPIENT = 'test@example.com';
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test_project';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
process.env.RATE_LIMIT_MAX = '1000'; // High limit for tests to avoid interference
process.env.RATE_LIMIT_WINDOW_MS = '60000';

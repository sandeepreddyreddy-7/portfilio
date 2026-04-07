import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { logger } from '@/lib/logger';

/**
 * Health check endpoint for monitoring
 * Probes Sanity connectivity with a lightweight query
 * Use: uptime monitoring services (UptimeRobot, Pingdom, etc.)
 */
export async function GET() {
  try {
    // Light probe: fetch single project ID (minimal data transfer)
    await client.fetch('*[_type == "project"][0]._id');

    const response = NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );

    // Cache for 1 minute at CDN level to reduce load on Sanity
    response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');

    return response;
  } catch (error) {
    logger.error('[health] Sanity probe failed', error instanceof Error ? error : new Error(String(error)));

    const response = NextResponse.json(
      {
        status: 'error',
        message: 'Sanity connectivity check failed',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );

    // Don't cache error responses
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    return response;
  }
}

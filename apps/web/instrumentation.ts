import * as Sentry from '@sentry/nextjs';

/**
 * Load the runtime-specific Sentry configuration by dynamically importing the appropriate module for the current NEXT_RUNTIME.
 *
 * @returns No value.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
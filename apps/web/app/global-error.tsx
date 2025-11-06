"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

/**
 * Global client-side error boundary that reports the provided error to Sentry and renders a generic Next.js error page.
 *
 * @param error - The thrown error (may include a `digest` property) to report and display.
 * @returns A minimal HTML document that renders Next.js's default error page (`NextError`) with `statusCode` set to `0`.
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
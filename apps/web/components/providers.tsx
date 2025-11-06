"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useAuth } from '@clerk/nextjs'


if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "")

/**
 * Wraps application UI with theme, Convex, and Clerk providers.
 *
 * The returned element applies a class-based theme (defaulting to dark), preserves system theme support,
 * disables transitions on theme changes, and enables color-scheme handling. It also provides a Convex client
 * integrated with Clerk authentication to all descendants.
 *
 * @param children - The React nodes to render inside the providers.
 * @returns A React element that renders `children` within NextThemesProvider and ConvexProviderWithClerk.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
        </ConvexProviderWithClerk>
    </NextThemesProvider>
  )
}
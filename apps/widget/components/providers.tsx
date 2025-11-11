"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import {Provider} from 'jotai'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "")

/**
 * Wraps its children in theme, Convex client, and Jotai state providers.
 *
 * Provides NextThemes configuration (class attribute, light default, system support,
 * transition disabling, and color-scheme support), a Convex client context, and a Jotai Provider
 * so descendant components can access them.
 *
 * @param children - The React nodes to render inside the provider tree
 * @returns A React element that supplies theming, Convex, and Jotai contexts to `children`
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <ConvexProvider client={convex}>
          <Provider>
            {children}
          </Provider>
      </ConvexProvider>
    </NextThemesProvider>
  )
}
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes";
import { Toaster} from "@workspace/ui/components/sonner"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

/**
 * Defines the application's root HTML layout and wraps page content with authentication and application providers.
 *
 * @param children - The page content to render inside the providers.
 * @returns The root HTML element containing the configured body, ClerkProvider, Providers, Toaster, and the provided children.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <ClerkProvider appearance={{
          theme: dark
        }}>
          <Providers>
            <Toaster />
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}
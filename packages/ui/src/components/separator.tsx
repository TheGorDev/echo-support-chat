"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Render a styled separator line supporting horizontal or vertical layout.
 *
 * @param className - Additional CSS classes to apply to the separator container.
 * @param orientation - "horizontal" or "vertical"; controls the separator's axis. Defaults to "horizontal".
 * @param decorative - When true, marks the separator as decorative for accessibility. Defaults to true.
 * @returns A JSX element representing the styled separator.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
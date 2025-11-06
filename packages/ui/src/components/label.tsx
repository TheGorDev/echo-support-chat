"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Render a stylable label element using Radix UI's Label primitive.
 *
 * Merges a default set of layout, typography, and disabled-state utility classes with an optional `className`, sets `data-slot="label"`, and forwards remaining props to the underlying `LabelPrimitive.Root`.
 *
 * @param className - Additional CSS classes to merge with the component's default classes
 * @returns The rendered `LabelPrimitive.Root` element
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
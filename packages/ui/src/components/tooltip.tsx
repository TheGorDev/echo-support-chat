"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Wraps Radix's TooltipProvider, applying a configurable `delayDuration` and a `data-slot="tooltip-provider"` attribute.
 *
 * @param delayDuration - Milliseconds to wait before showing the tooltip. Defaults to `0`.
 * @param props - Additional props forwarded to `TooltipPrimitive.Provider`.
 * @returns The rendered `TooltipPrimitive.Provider` element.
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

/**
 * Composes a TooltipRoot inside a TooltipProvider to provide default provider context.
 *
 * @param props - Props forwarded to the underlying Tooltip root element
 * @returns The Tooltip root element rendered inside a TooltipProvider
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

/**
 * Renders the tooltip trigger element.
 *
 * @returns The Tooltip trigger element with forwarded props and a `data-slot="tooltip-trigger"` attribute.
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

/**
 * Renders styled tooltip content inside a portal and appends a positioned arrow.
 *
 * @param className - Additional CSS classes to merge with the component's default styling.
 * @param sideOffset - Distance in pixels between the tooltip content and its trigger (defaults to 0).
 * @param children - Content to display inside the tooltip.
 * @returns The tooltip content element (wrapped in a portal) including the arrow element.
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
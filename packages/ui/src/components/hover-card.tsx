"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Wraps the Radix HoverCard root element and attaches a data-slot attribute for identification.
 *
 * @param props - Props forwarded to `HoverCardPrimitive.Root`
 * @returns The rendered HoverCard root element with `data-slot="hover-card"`
 */
function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

/**
 * Renders a hover-card trigger element and forwards all received props.
 *
 * @param props - Props forwarded to the underlying trigger element.
 * @returns A trigger element with `data-slot="hover-card-trigger"` and the forwarded props.
 */
function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

/**
 * Renders the styled content area for a hover card inside a Portal.
 *
 * Merges provided class names with the component's default styling, and forwards
 * remaining props to Radix's HoverCard.Content.
 *
 * @param className - Additional CSS class names to merge with the default styles.
 * @param align - Alignment of the content relative to the trigger; default: `"center"`.
 * @param sideOffset - Distance in pixels between the trigger and content; default: `4`.
 * @param props - Additional props forwarded to `HoverCardPrimitive.Content`.
 * @returns The hover card content element wrapped in a Portal.
 */
function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
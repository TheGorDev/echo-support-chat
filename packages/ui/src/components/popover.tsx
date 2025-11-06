"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Renders a Radix Popover root element with a `data-slot="popover"` attribute and forwards all received props.
 *
 * @param props - Props forwarded to `PopoverPrimitive.Root`
 * @returns The rendered Popover root element
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

/**
 * Renders a Popover trigger element and forwards received props to the underlying Radix Trigger.
 *
 * @param props - Props passed through to the underlying Popover trigger element.
 * @returns The rendered Popover trigger element with `data-slot="popover-trigger"` and forwarded props.
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

/**
 * Renders popover content inside a portal with standardized styling and animations.
 *
 * @param className - Additional class names appended to the default content styles.
 * @param align - Alignment of the content relative to the trigger (defaults to "center").
 * @param sideOffset - Distance in pixels between trigger and content (defaults to 4).
 * @returns The rendered popover content element.
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

/**
 * Renders a Radix Popover Anchor element with a standardized `data-slot` attribute.
 *
 * @returns A `PopoverPrimitive.Anchor` element with `data-slot="popover-anchor"` and all received props applied
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
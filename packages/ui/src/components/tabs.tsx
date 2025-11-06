"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Renders a Tabs root element with a default vertical layout and merged className.
 *
 * @param className - Additional CSS class(es) appended to the default layout classes.
 * @returns The rendered Tabs root element with `data-slot="tabs"` and combined classes.
 */
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled tabs list wrapper around Radix UI's TabsPrimitive.List.
 *
 * @param className - Additional CSS classes to merge with the component's default styling.
 * @returns The rendered tabs list element.
 */
function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a styled tab trigger element for the Tabs component.
 *
 * Forwards all received props to Radix's TabsPrimitive.Trigger and applies a set of default classes for active, focus, disabled, dark-mode, and layout behavior.
 *
 * @returns A TabsPrimitive.Trigger element with a `data-slot="tabs-trigger"` attribute and composed styling classes.
 */
function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a tab content panel with default layout and merged classes.
 *
 * @returns A TabsPrimitive.Content element with `data-slot="tabs-content"`, the default `flex-1 outline-none` classes merged with any provided `className`, and all other props forwarded.
 */
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
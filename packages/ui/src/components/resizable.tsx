"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Renders a PanelGroup wrapper configured for the resizable panel layout.
 *
 * Applies default flex-based layout (including vertical-direction handling), sets a `data-slot`
 * attribute for identifying resizable panel groups, merges any provided `className`, and
 * forwards all other props to the underlying PanelGroup primitive.
 *
 * @param className - Additional CSS class names to merge with the component's default classes
 * @returns A configured PanelGroup element for resizable panels
 */
function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a resizable panel wrapper that applies a `data-slot="resizable-panel"` attribute and forwards all panel props.
 *
 * @param props - Props compatible with `ResizablePrimitive.Panel`; all props are forwarded to the underlying panel.
 * @returns A React element representing the configured resizable panel.
 */
function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

/**
 * Render a resize handle for a resizable panel group.
 *
 * Renders a PanelResizeHandle with layout and focus styles and optional visual grip.
 *
 * @param withHandle - When `true`, renders a small grip element inside the handle to provide an explicit visual affordance.
 * @param className - Additional CSS classes to apply to the handle container.
 * @returns The configured `PanelResizeHandle` element to place between resizable panels.
 */
function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
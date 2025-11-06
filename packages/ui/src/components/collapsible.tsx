"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Renders a Collapsible root element with data-slot="collapsible".
 *
 * @param props - Props forwarded to the underlying Radix Collapsible root component.
 * @returns The rendered Collapsible root React element.
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

/**
 * Renders a Radix Collapsible trigger element configured for the design system.
 *
 * Forwards all received props to the underlying Radix `CollapsibleTrigger` and
 * sets `data-slot="collapsible-trigger"` on the rendered element.
 *
 * @param props - Props forwarded to the underlying Radix `CollapsibleTrigger`
 * @returns A React element for a collapsible trigger
 */
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

/**
 * Renders a collapsible content region and forwards all props to the underlying Radix primitive.
 *
 * @param props - Props forwarded to the underlying `CollapsiblePrimitive.CollapsibleContent`
 * @returns The rendered `CollapsiblePrimitive.CollapsibleContent` element
 */
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
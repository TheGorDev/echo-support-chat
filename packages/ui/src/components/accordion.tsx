"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Renders a Radix UI Accordion root element with a data-slot of "accordion".
 *
 * @param props - Props forwarded to the underlying AccordionPrimitive.Root
 * @returns A React element representing the Accordion root
 */
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

/**
 * Renders an accordion item element with a default bottom border and forwards all received props.
 *
 * @param className - Additional CSS class names to merge with the default "border-b last:border-b-0" classes
 * @returns The rendered accordion item element
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

/**
 * Renders an accordion trigger with a trailing chevron icon and preset styling.
 *
 * @param className - Additional CSS classes to merge with the component's default styles.
 * @param children - Content displayed inside the trigger, rendered before the chevron icon.
 * @returns The rendered accordion trigger element with applied styles and forwarded props.
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/**
 * Render a styled accordion content region with state-based open/close animations and internal padding.
 *
 * @param className - Additional CSS classes applied to the inner content wrapper.
 * @param children - Elements rendered inside the accordion panel.
 * @returns The AccordionPrimitive.Content element with animation classes, overflow handling, `text-sm` sizing, and an inner div that applies top/bottom padding and the provided `className`.
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
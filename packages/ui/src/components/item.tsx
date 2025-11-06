import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"
import { Separator } from "@workspace/ui/components/separator"

/**
 * Renders a vertical container for grouping Item components.
 *
 * The element has role="list" and data-slot="item-group" and merges the
 * provided `className` with the default "group/item-group flex flex-col" classes.
 *
 * @returns A `div` element used as an item group container
 */
function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  )
}

/**
 * Renders a horizontal item separator with item-specific attributes and default spacing.
 *
 * The separator is rendered with data-slot="item-separator", orientation fixed to
 * "horizontal", and a default class of `my-0`. Additional classes provided via
 * `className` are merged with the default.
 *
 * @param className - Additional CSS class names to merge with the default `my-0`
 * @returns The rendered horizontal Separator element configured for item lists
 */
function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Render a styled, variant-driven item container used as a composable list element.
 *
 * Renders either a div or the provided `Slot` child proxy and applies classes for the selected `variant` and `size`.
 *
 * @param className - Additional class names to merge with the component's computed classes
 * @param variant - Visual variant to apply; one of `"default"`, `"outline"`, or `"muted"`
 * @param size - Spacing and sizing variant; one of `"default"` or `"sm"`
 * @param asChild - When true, render using Radix `Slot` so the caller's element becomes the rendered node
 * @returns A React element representing an item container configured with the specified variant and size
 */
function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Renders the media slot for an Item with variant-specific styling.
 *
 * @param className - Additional class names applied to the media container
 * @param variant - Visual variant for the media area (`default`, `icon`, or `image`)
 * @returns A `div` element used as the item's media container with `data-slot="item-media"` and variant-driven classes
 */
function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * Renders the content area for an Item, providing a vertical flex container for titles, descriptions, and other content.
 *
 * Accepts the same props as a standard `div`; `className` is merged with the component's layout classes.
 *
 * @returns A `div` element used as an Item's content container
 */
function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the title slot for an Item component.
 *
 * The element is a div with data-slot="item-title" and default classes that
 * provide inline layout, centered alignment, small text size, snug line height,
 * and medium font weight. Additional className and div props are forwarded.
 *
 * @returns A `div` element serving as the item title slot with layout and typography styling.
 */
function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a paragraph formatted as an item description with muted styling, truncation, and link styles.
 *
 * @returns A `<p>` element with classes for muted text, two-line clamp, balanced text flow, and link hover/underline styling
 */
function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a horizontal container for item action controls.
 *
 * The element is a div with data-slot="item-actions" and horizontal layout spacing.
 *
 * @returns The rendered actions container element.
 */
function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/**
 * Layout container for an item's header that aligns content on opposite ends.
 *
 * Renders a div with data-slot="item-header" and utility classes to space and center header content.
 *
 * @returns The rendered header div element
 */
function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders an item footer container that arranges its children with space between.
 *
 * @returns A div element with `data-slot="item-footer"` that lays out children horizontally with space between and forwards any additional div props.
 */
function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
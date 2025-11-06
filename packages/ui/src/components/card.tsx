import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Render a styled card container that forwards native div props.
 *
 * @param className - Additional CSS class names to merge with the component's base card styles
 * @param props - All other props are passed through to the underlying div element
 * @returns A div element with card styling and a `data-slot="card"` attribute
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a card header container with slot="card-header" and header layout styles.
 *
 * @param className - Additional CSS class names to merge with the header's default styles
 * @param props - Additional attributes passed to the underlying `div`
 * @returns A `div` element representing the card header
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a div styled as a card title and tagged with `data-slot="card-title"`.
 *
 * @param props - Standard div props. `className` is merged with the component's default title classes (`leading-none font-semibold`).
 * @returns A `div` element with the `data-slot="card-title"` attribute and composed title styling.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders the card's description slot.
 *
 * @returns A div with `data-slot="card-description"` styled for muted, small text
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Renders a container positioned for card actions inside a Card.
 *
 * The element has data-slot="card-action" and layout classes that place it in
 * the second column and align it to the end of the header area.
 *
 * @param className - Additional CSS classes to merge with the component's layout classes
 * @returns The `div` element used as the card action slot
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card's content container with horizontal padding and a `data-slot="card-content"` attribute.
 *
 * @param className - Additional CSS classes to merge with the base horizontal padding (`px-6`)
 * @returns A `div` element configured as the card content container
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Renders a container for card footer content with footer-specific layout and spacing.
 *
 * @returns A `div` element with `data-slot="card-footer"` that applies horizontal padding, centers items, and adds top padding when a top border is present.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
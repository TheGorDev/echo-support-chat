import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Renders a navigation container for a breadcrumb trail.
 *
 * @param props - Props forwarded to the underlying `<nav>` element.
 * @returns A `<nav>` element with `aria-label="breadcrumb"` and `data-slot="breadcrumb"` with all provided props applied.
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

/**
 * Renders the breadcrumb list container as an ordered list.
 *
 * Merges provided `className` with the component's default breadcrumb list styles and forwards other `ol` props.
 *
 * @param className - Additional class names merged with the default breadcrumb list styles
 * @returns The rendered `<ol>` element serving as the breadcrumb list
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a list item configured as a breadcrumb item.
 *
 * @returns A `<li>` element with `data-slot="breadcrumb-item"` and a composed `className` that includes layout and spacing styles merged with any provided `className`.
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

/**
 * Renders a breadcrumb link that is either an anchor (`<a>`) or replaces the anchor with its child element.
 *
 * @param asChild - If `true`, renders the provided child element in place of the anchor; otherwise renders an `<a>` element.
 * @returns A React element representing the breadcrumb link.
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

/**
 * Renders the current breadcrumb item as a non-interactive page label.
 *
 * @param className - Additional CSS class names to apply to the span
 * @param props - Additional props forwarded to the underlying `span` element
 * @returns A `span` element used for the current page in a breadcrumb; marked with `role="link"`, `aria-current="page"`, `aria-disabled="true"`, and `data-slot="breadcrumb-page"`
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

/**
 * Renders a breadcrumb separator list item with optional custom content.
 *
 * The element is presentation-only (role="presentation", aria-hidden="true") and, if no `children` are provided, displays a default chevron icon.
 *
 * @param children - Optional custom separator content; defaults to a chevron icon when omitted.
 * @param className - Additional CSS classes to merge; the component ensures descendant SVGs receive a scoped size.
 * @returns The `<li>` element used as the breadcrumb separator.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

/**
 * Renders a presentation-only breadcrumb ellipsis indicating truncated items.
 *
 * Renders a span containing an ellipsis icon and a visually hidden "More" label for screen readers.
 *
 * @returns The ellipsis span element used within a breadcrumb sequence
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
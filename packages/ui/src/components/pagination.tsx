import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Button, buttonVariants } from "@workspace/ui/components/button"

/**
 * Container element for pagination controls.
 *
 * Renders a centered `<nav>` prepared for pagination with `role="navigation"`, `aria-label="pagination"`, a `data-slot="pagination"` attribute, and merged class names.
 *
 * @returns The rendered `<nav>` element for pagination controls
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

/**
 * Container for pagination items laid out in a horizontal row.
 *
 * @returns A `ul` element with `data-slot="pagination-content"` and default horizontal layout classes; any additional props are spread onto the element.
 */
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * Wrapper list item used for pagination.
 *
 * @param props - Props passed to the underlying `li` element.
 * @returns A `li` element with `data-slot="pagination-item"` and the provided props.
 */
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

/**
 * Renders a styled anchor element used as a pagination control.
 *
 * The link reflects an active state when `isActive` is true (sets `aria-current="page"` and applies active styling)
 * and exposes `data-slot="pagination-link"` and `data-active` attributes for integration with UI tooling.
 *
 * @param isActive - If true, marks the link as the current page and applies active styling.
 * @param size - Controls the visual size of the control; forwarded to the underlying button variant styling (default: `"icon"`).
 * @param className - Additional CSS classes to apply to the anchor element.
 * @returns A JSX anchor element representing the pagination link.
 */
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a "Previous" pagination link configured for navigating to the previous page.
 *
 * @param className - Additional CSS classes applied to the link container
 * @param props - Additional props forwarded to PaginationLink (for example `href`, `onClick`, or `aria-*` attributes)
 * @returns A PaginationLink element styled and labelled as the previous-page control
 */
function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

/**
 * Renders a styled "next" pagination control configured for navigating to the following page.
 *
 * The link includes a right chevron icon and a responsive "Next" label (visible on small screens and up) and sets an appropriate aria-label for accessibility.
 *
 * @returns A PaginationLink element configured as the "next" pagination control
 */
function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

/**
 * Renders an ellipsis indicator used to compress pagination controls.
 *
 * Renders a visually centered ellipsis icon and includes screen-reader text "More pages". Additional span props (including `className`) are forwarded to the root element.
 *
 * @returns A span element that visually represents an ellipsis for pagination.
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
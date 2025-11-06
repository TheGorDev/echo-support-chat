import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Root container for an empty-state UI that centers and styles its children.
 *
 * Renders an element with `data-slot="empty"`, applies base layout and typography classes,
 * merges an optional `className`, and forwards remaining div props.
 *
 * @returns The empty-state container element.
 */
function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the header area for an empty-state layout.
 *
 * @param className - Additional class names appended to the default header classes
 * @param props - Additional props spread onto the root `div` element
 * @returns A `div` element used as the empty-state header slot
 */
function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Render the media area for an empty state with variant-driven styling.
 *
 * @param variant - Visual variant for the media area. `"default"` uses a transparent background; `"icon"` applies icon-specific background, sizing, and rounded styles.
 * @returns A `div` element used as the empty state's media area, with `data-slot="empty-icon"`, `data-variant` set to the chosen variant, and classes derived from the variant and `className`.
 */
function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * Renders the empty-state title container.
 *
 * @param className - Additional CSS classes appended to the base title styles.
 * @param props - Other attributes forwarded to the underlying div element.
 * @returns A div element serving as the empty-state title container.
 */
function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  )
}

/**
 * Renders the empty-state description slot.
 *
 * @returns A div element with description typography and link styles, marked with `data-slot="empty-description"`.
 */
function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the content area for an empty state with centered, column layout and compact typography.
 *
 * @returns A div element used as the empty-state content container with centered items, gap spacing, and small, balanced text.
 */
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
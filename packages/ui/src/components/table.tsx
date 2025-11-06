"use client"

import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Renders a full-width, responsive table inside a horizontally scrollable container.
 *
 * @param className - Additional class names to apply to the table element
 * @param props - Other props forwarded to the underlying `table` element
 * @returns The table wrapped in a scrollable container element
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

/**
 * Renders a table header (<thead>) with default row-bottom borders and a data-slot for composition.
 *
 * @param className - Additional CSS classes to apply to the thead
 * @returns The rendered table header element
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

/**
 * Renders a table body (`tbody`) element with default row styling and a data-slot for composition.
 *
 * @param className - Additional class names to merge with the component's default row-reset styles
 * @returns The rendered `tbody` element with `data-slot="table-body"` and combined class names
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/**
 * Renders a table footer element with table-specific footer styling.
 *
 * @returns A `tfoot` React element with `data-slot="table-footer"` and a composed `className` including footer styles.
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table row element (<tr>) with default row styles and a data-slot for composition.
 *
 * @param className - Additional CSS class names to merge with the component's default row classes
 * @param props - Other native `<tr>` props to forward to the rendered element
 * @returns The rendered `<tr>` element with applied classes and forwarded props
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table header cell with default layout and typography classes, merging any provided className and forwarding remaining props.
 *
 * @param className - Additional class names to combine with the component's default styles
 * @returns The rendered `th` element with applied classes, `data-slot="table-head"`, and forwarded props
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table data cell with base spacing, vertical alignment, and checkbox-aware layout tweaks.
 *
 * @param className - Additional CSS classes to merge with the component's base classes.
 * @param props - Remaining `td` props are forwarded to the underlying element.
 * @returns A `td` element with predefined table-cell styling and any provided classes applied.
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table caption with muted foreground styling and top spacing.
 *
 * @returns The rendered `<caption>` element for the table.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Root menubar component that renders a styled menubar container and exposes the Radix Menubar root API.
 *
 * @param className - Additional CSS classes appended to the component's default styling.
 * @param props - All other props are forwarded to the underlying Menubar root element.
 * @returns The rendered menubar root element.
 */
function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a Menubar menu element with a standardized `data-slot` and forwards all received props.
 *
 * @param props - Props forwarded to the underlying Menubar primitive.
 * @returns The rendered Menubar menu element.
 */
function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

/**
 * Wrapper for the Radix Menubar Group primitive that applies a `data-slot` and forwards props.
 *
 * @param props - Props passed to the underlying Radix Menubar Group primitive.
 * @returns A React element rendering a Menubar Group with `data-slot="menubar-group"`.
 */
function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

/**
 * Renders a menubar portal element that applies a data-slot attribute and forwards all received props.
 *
 * @returns A React element representing the menubar portal
 */
function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

/**
 * Wraps Radix's Menubar RadioGroup primitive to provide consistent styling hooks.
 *
 * This component forwards all props to the underlying Radix RadioGroup and
 * sets data-slot="menubar-radio-group" for consistent theming and testing.
 *
 * @returns A React element rendering a menubar radio group.
 */
function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

/**
 * Renders a Menubar trigger element with standardized styling and a `data-slot="menubar-trigger"` attribute while forwarding all received props.
 *
 * @returns A JSX element for a styled menubar trigger that forwards props to the underlying Radix Menubar Trigger.
 */
function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders menubar content inside a portal with positioning, animation, and styling applied.
 *
 * @param className - Additional CSS class names to merge with the component's default styles.
 * @param align - Alignment of the content relative to its trigger; defaults to `"start"`.
 * @param alignOffset - Pixel offset applied along the alignment axis; defaults to `-4`.
 * @param sideOffset - Pixel offset applied along the side axis; defaults to `8`.
 * @returns The menubar content element configured with alignment, offsets, animations, and default styling.
 */
function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

/**
 * Renders a styled menubar item with optional inset spacing and a visual variant.
 *
 * @param inset - When true, applies inset spacing (left padding) intended for items with an icon.
 * @param variant - Visual variant: `"default"` for normal styling, `"destructive"` for destructive styling.
 * @returns A React element representing a menubar item with data-slot and composed classes applied.
 */
function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Checkbox-styled menubar item that displays a check indicator when selected.
 *
 * Forwards additional props to the underlying Radix CheckboxItem.
 *
 * @param checked - `true` if the item is checked, `false` otherwise.
 * @returns The rendered menubar checkbox item element.
 */
function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

/**
 * Styled wrapper for a Radix Menubar RadioItem that includes a left-aligned radio indicator.
 *
 * Forwards all props to the underlying Radix RadioItem, applies consistent styling and a
 * `data-slot="menubar-radio-item"` attribute, and renders a circular selection indicator on the left.
 *
 * @returns A React element representing a menubar radio item with a left radio indicator.
 */
function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

/**
 * Wrapper around Radix Menubar Label that applies consistent typography and optional inset spacing.
 *
 * @param inset - When `true`, applies additional left padding to visually inset the label.
 * @returns The rendered Menubar label element with applied class names and attributes.
 */
function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a horizontal separator for the menubar with consistent styling and data attributes.
 *
 * @returns A `MenubarPrimitive.Separator` element with `data-slot="menubar-separator"` and composed separator classes
 */
function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

/**
 * Renders a small, right-aligned span for keyboard shortcuts within the menubar.
 *
 * @returns A `span` element with `data-slot="menubar-shortcut"` and styling for muted, small, right-aligned shortcut text; forwards all native span props.
 */
function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

/**
 * Wraps Radix UI's MenubarPrimitive.Sub, adding a consistent data-slot and forwarding all props.
 *
 * @param props - Props to pass through to MenubarPrimitive.Sub
 * @returns A Menubar Sub React element with `data-slot="menubar-sub"` and the provided props applied
 */
function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

/**
 * Renders a menubar sub-menu trigger that displays its children and a trailing chevron icon.
 *
 * @param inset - When `true`, applies inset styling (additional left padding) to align the trigger with inset items.
 * @returns A `MenubarPrimitive.SubTrigger` element with data-slot `menubar-sub-trigger`, optional inset attribute, composed class names, and a right-aligned chevron icon.
 */
function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

/**
 * Renders a styled Menubar subcontent element with consistent data-slot and className composition.
 *
 * @returns A `MenubarPrimitive.SubContent` element with applied styling, `data-slot="menubar-sub-content"`, and all forwarded props.
 */
function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
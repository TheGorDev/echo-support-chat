"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@workspace/ui/lib/utils"
import { buttonVariants } from "@workspace/ui/components/button"

/**
 * Wraps Radix AlertDialog.Root and applies a standardized `data-slot="alert-dialog"` attribute for slot-based styling and testing.
 *
 * @param props - Props forwarded to Radix AlertDialog.Root.
 * @returns The AlertDialog root element with `data-slot="alert-dialog"`.
 */
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

/**
 * Trigger element that opens the alert dialog.
 *
 * @param props - Props forwarded to the underlying trigger element.
 * @returns The trigger element node for the alert dialog.
 */
function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

/**
 * Portal container that hosts alert dialog content.
 *
 * Renders a portal used to mount dialog content outside the DOM hierarchy and applies
 * the `data-slot="alert-dialog-portal"` attribute.
 *
 * @returns A React element that mounts its children into a portal and includes the `data-slot="alert-dialog-portal"` attribute.
 */
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

/**
 * Renders the alert dialog overlay with a dimmed backdrop and state-based animations.
 *
 * @param className - Additional CSS classes to merge with the component's default styling
 * @returns The overlay element for the alert dialog
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the alert dialog content wrapped in a portal with its overlay and styled content panel.
 *
 * @returns The composed alert dialog content element
 */
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

/**
 * Layout container for an alert dialog header.
 *
 * Applies default header layout and text alignment classes, merges any provided `className`, and forwards other `div` props.
 *
 * @param className - Additional CSS classes to merge with the default header classes
 * @returns The header container element for the alert dialog
 */
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * Footer container for the alert dialog that applies responsive layout and spacing.
 *
 * @param className - Additional CSS classes to merge with the component's default layout classes.
 * @param props - Other HTML div attributes are forwarded to the footer container.
 * @returns A `div` element used as the alert dialog footer with responsive ordering (column-reverse on small screens, row on larger screens) and gap spacing.
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the alert dialog title element with default title styling and a slot attribute.
 *
 * @param className - Additional CSS classes merged with the component's default title styles
 * @returns The Radix AlertDialog Title element with merged class names and `data-slot="alert-dialog-title"`
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders the alert dialog description element with default typography, a data-slot attribute, and merged classes.
 *
 * @param className - Additional CSS classes to merge with the component's default classes.
 * @returns The rendered alert dialog description element.
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Renders an AlertDialog action button with the library's standard button styling.
 *
 * The component forwards all props to Radix's AlertDialog.Action while merging
 * the result of `buttonVariants()` with any provided `className`.
 *
 * @returns The AlertDialog action element with the default button classes merged with `className`.
 */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

/**
 * Renders the alert dialog's cancel button with the "outline" button styling.
 *
 * Merges the outline button styles with any provided `className` and forwards all other props to the underlying AlertDialog cancel primitive.
 *
 * @param className - Additional class names to merge with the default outline button styles
 * @returns The rendered cancel button element
 */
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
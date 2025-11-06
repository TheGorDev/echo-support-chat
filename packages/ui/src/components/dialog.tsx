"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Top-level Dialog root component that provides the dialog context for child primitives.
 *
 * Renders Radix's DialogPrimitive.Root with a data-slot of "dialog" and forwards all received props.
 *
 * @param props - Props forwarded to DialogPrimitive.Root
 * @returns The DialogPrimitive.Root element configured for this dialog
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * Renders a dialog trigger element.
 *
 * Sets `data-slot="dialog-trigger"` on the underlying Radix Trigger and forwards all received props to it.
 *
 * @returns The trigger element used to open or toggle the dialog
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * Renders a Dialog portal configured with data-slot="dialog-portal".
 *
 * @param props - Props forwarded to the underlying DialogPrimitive.Portal
 * @returns A Portal element that mounts dialog content into a React portal
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * Renders a dialog close element and forwards all props to the underlying close primitive.
 *
 * The rendered element includes `data-slot="dialog-close"`.
 *
 * @param props - Props passed to the underlying close element.
 * @returns A dialog close element that closes the dialog when activated.
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * Renders the dialog backdrop overlay with default backdrop styling and state-driven animation classes.
 *
 * @param className - Additional CSS classes to merge with the overlay's default classes
 * @returns The rendered dialog overlay element
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the dialog content inside a portal with an overlay and an optional close button.
 *
 * Merges `className` into the content container, renders `children` inside the content,
 * and always includes the overlay. When `showCloseButton` is `true`, a positioned close
 * control is rendered in the top-right corner.
 *
 * @param className - Additional CSS classes to apply to the dialog content container
 * @param children - Elements displayed inside the dialog content
 * @param showCloseButton - Whether to render the top-right close button (default: `true`)
 * @returns The composed dialog content element (portal, overlay, content, children, and optional close button)
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/**
 * Renders the dialog header container with responsive alignment and spacing.
 *
 * @returns A `div` element serving as the dialog header container.
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * Renders a dialog footer container that arranges action controls responsively.
 *
 * @param className - Additional CSS classes to apply to the footer container.
 * @param props - Other `div` props forwarded to the container.
 * @returns The footer `div` element; items are laid out column-reverse on small screens and row-aligned to the end on larger screens.
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a dialog title element with base typography and merges any additional classes.
 *
 * @param className - Optional additional CSS classes to apply to the title
 * @returns The dialog title element
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders dialog description text with base styling and `data-slot="dialog-description"`.
 *
 * @param className - Additional CSS classes appended to the base description styles.
 * @returns The DialogPrimitive.Description element with merged classes and forwarded props.
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
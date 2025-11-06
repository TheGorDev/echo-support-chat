"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Avatar root wrapper that applies consistent avatar styling and forwards remaining props to Radix `Avatar.Root`.
 *
 * @returns A JSX element rendering a Radix `Avatar.Root` with a rounded, fixed-size container, overflow hidden, and merged `className`.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the avatar image slot with a square aspect ratio and full size.
 *
 * @param className - Additional CSS classes to apply to the image element
 * @returns A Radix Avatar.Image element configured with square aspect ratio and full size
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Avatar fallback element displayed when the avatar image is unavailable.
 *
 * @param className - Additional CSS class names appended to the fallback's default classes
 * @returns The React element for the avatar fallback slot
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
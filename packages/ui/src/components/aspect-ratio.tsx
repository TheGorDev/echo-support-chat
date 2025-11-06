"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

/**
 * Renders a Radix `AspectRatio.Root` element with a `data-slot="aspect-ratio"` attribute.
 *
 * @param props - Props forwarded to `AspectRatioPrimitive.Root`.
 * @returns The `AspectRatioPrimitive.Root` element with `data-slot="aspect-ratio"` and the provided props.
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
import { cn } from "@workspace/ui/lib/utils"

/**
 * Render a styled <kbd> element representing a keyboard key.
 *
 * The component applies a default set of keyboard key styles, merges any provided `className`, and forwards all other props to the rendered element.
 *
 * @param className - Additional CSS class names to merge with the component's default styles
 * @returns The rendered `<kbd>` element with composed classes and forwarded props
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a grouped keyboard-key container element for laying out multiple keys.
 *
 * @param className - Additional CSS class names appended to the component's default inline-flex, gap, and items-centered classes
 * @returns A `<kbd>` element with `data-slot="kbd-group"` and an inline-flex layout for grouping keyboard keys
 */
function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
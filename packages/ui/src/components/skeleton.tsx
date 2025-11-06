import { cn } from "@workspace/ui/lib/utils"

/**
 * Render a div styled as a loading skeleton placeholder.
 *
 * The element receives base skeleton styles and exposes a `data-slot="skeleton"` attribute.
 *
 * @param className - Additional CSS classes appended to the base skeleton styles
 * @param props - Additional props forwarded to the underlying div element
 * @returns The rendered skeleton div element
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
import { Loader2Icon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Renders a spinning loader icon.
 *
 * @param className - Additional CSS classes to merge with the default "size-4 animate-spin".
 * @param props - Other SVG attributes forwarded to the underlying icon.
 * @returns The rendered Loader2Icon element with role="status" and aria-label="Loading".
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
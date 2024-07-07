import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@src/lib/utils';


const statusVariants = cva(
  "inline-flex items-center justify-center rounded-md  text-xs capitalize font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300  group font-medium transition-colors relative duration-700 ease-in shadow-mild",
  {
    variants: {
      variant: {
        default: "overflow-hidden bg-blue-main text-white hover:bg-white border border-transparent hover:border-blue-main hover:text-blue-main disabled:opacity-100 disabled:bg-blue-100",
        pending: "bg-warning-400 text-white px-3 py-2",
        active: "bg-success-main",
      },
      size: {
        default: "px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface StatusProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof statusVariants> {
  asChild?: boolean
}

const Tag = React.forwardRef<HTMLButtonElement, StatusProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span"
    return (
      <Comp
        className={cn(statusVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Tag.displayName = "Tag"

export { Tag, statusVariants }

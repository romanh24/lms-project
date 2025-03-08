import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"


import { cn } from "@/lib/utils"
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-sm hover:from-blue-700 hover:to-blue-500 hover:scale-[1.02]",
        primary: "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-sm hover:from-indigo-700 hover:to-blue-600 hover:scale-[1.02]",
        secondary: "bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm hover:from-gray-800 hover:to-gray-700 hover:scale-[1.02]",
        success: "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-sm hover:from-emerald-700 hover:to-teal-600 hover:scale-[1.02]",
        destructive: "bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-sm hover:from-red-700 hover:to-rose-600 hover:scale-[1.02]",
        warning: "bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-sm hover:from-amber-600 hover:to-orange-500 hover:scale-[1.02]",
        outline: "border-transparent bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-foreground shadow-sm hover:from-gray-300 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:scale-[1.02]",
        ghost: "hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

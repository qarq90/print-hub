import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textVariants = cva(
    "text-foreground",
    {
        variants: {
            variant: {
                default: "",
                primary: "text-primary",
                secondary: "text-secondary-foreground",
                accent: "text-accent",
                destructive: "text-destructive",
                muted: "text-muted-foreground",
                success: "text-emerald-600 dark:text-emerald-400",
                warning: "text-amber-600 dark:text-amber-400",
                info: "text-blue-600 dark:text-blue-400",
            },
            size: {
                xs: "text-xs",
                sm: "text-sm",
                base: "text-base",
                lg: "text-lg",
                xl: "text-xl",
                "2xl": "text-2xl",
                "3xl": "text-3xl",
                "4xl": "text-4xl",
                "5xl": "text-5xl",
            },
            weight: {
                light: "font-light",
                normal: "font-normal",
                medium: "font-medium",
                semibold: "font-semibold",
                bold: "font-bold",
                extrabold: "font-extrabold",
            },
            leading: {
                tight: "leading-tight",
                snug: "leading-snug",
                normal: "leading-normal",
                relaxed: "leading-relaxed",
                loose: "leading-loose",
            },
            tracking: {
                tight: "tracking-tight",
                normal: "tracking-normal",
                wide: "tracking-wide",
            },
            decoration: {
                underline: "underline",
                "line-through": "line-through",
                "no-underline": "no-underline",
            },
            transform: {
                uppercase: "uppercase",
                lowercase: "lowercase",
                capitalize: "capitalize",
                normal: "normal-case",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "base",
            weight: "normal",
            leading: "normal",
            tracking: "normal",
        },
    }
)

type TextElement = HTMLParagraphElement | HTMLSpanElement | HTMLDivElement | HTMLHeadingElement | HTMLLabelElement

interface TextProps extends React.HTMLAttributes<TextElement>, VariantProps<typeof textVariants> {
    asChild?: boolean
    as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label"
}

const Text = React.forwardRef<TextElement, TextProps>(
    (
        {
            className,
            variant,
            size,
            weight,
            leading,
            tracking,
            decoration,
            transform,
            asChild = false,
            as: Tag = "p",
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : Tag

        return (
            <Comp
                className={cn(
                    textVariants({
                        variant,
                        size,
                        weight,
                        leading,
                        tracking,
                        decoration,
                        transform,
                        className,
                    })
                )}
                ref={ref as React.Ref<HTMLElement>}
                {...props}
            />
        )
    }
)
Text.displayName = "Text"

export { Text, textVariants }
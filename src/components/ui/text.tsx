import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("text-foreground", {
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
            "5xl": "md:text-5xl text-4xl",
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
});

interface TextProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
    asChild?: boolean;
}

const Text: React.FC<TextProps> = ({
    className,
    variant,
    size,
    weight,
    leading,
    tracking,
    decoration,
    transform,
    ...props
}) => {
    return (
        <span
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
            {...props}
        />
    );
};

Text.displayName = "Text";

export { Text, textVariants };

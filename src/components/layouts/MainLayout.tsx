import { ReactNode } from "react";
import { cn } from "@/lib/utils"

interface MainLayoutProps {
    children: ReactNode;
    className?: string;
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
    return (
        <div className={cn("min-h-[85vh] w-screen md:p-4 p-4 md:w-[65vw] flex flex-col gap-1", className)}>
            {children}
        </div>
    )
}
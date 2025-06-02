import { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
    className?: string;
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
    return (
        <div className="min-h-[85vh] w-screen p-4 md:w-[65vw]">
            {children}
        </div>
    )
}
"use client";
import { NavbarLinks } from "@/data/navbar-data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils"
import { Theme } from "./Theme";

export const PrimaryBar = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-1/2 transform bg-background md:bg-transparent h-fit -translate-x-1/2 md:left-4 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 p-4 backdrop-blur-none rounded-lg flex md:flex-col flex-row md:gap-9 gap-12 text-2xl z-30">
            {NavbarLinks.map(
                (link, index) =>
                    link.isPrimaryLink && (
                        <Link
                            href={link.href.toString()}
                            className={cn(
                                "list-none cursor-pointer overflow-hidden group",
                                pathname === link.href.toString()
                                    ? "text-accent"
                                    : "text-foreground",
                            )}
                            key={index}
                        >
                            <div className="flex items-center gap-2">
                                {<link.icon />}
                                <span className="md:block text-foreground hidden text-sm opacity-0 py-1 px-2 rounded-md group-hover:bg-foreground/10 group-hover:opacity-100 transition-opacity duration-200">
                                    {link.text}
                                </span>
                            </div>
                        </Link>
                    )
            )}
            <div className="md:block hidden">
                <Theme />
            </div>
        </nav>
    );
};
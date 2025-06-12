"use client"

import { NavbarLinks } from "@/data/navbar-data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils"

export const SecondaryBar = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 right-1/2 transform bg-background md:bg-transparent translate-x-1/2 md:right-10 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 py-4 px-0 rounded-lg flex md:flex-col flex-row gap-9 text-2xl z-30 hidden md:flex">
            {
                NavbarLinks.map(
                    (link, index) =>
                        link.isPrimaryLink === false && (
                            <Link
                                href={link.href.toString()}
                                className={cn(
                                    "list-none cursor-pointer overflow-hidden group",
                                    pathname.includes(link.href.toString())
                                        ? "text-accent"
                                        : "text-foreground",
                                )}
                                key={index}
                            >
                                <div className="flex justify-end items-center gap-2">
                                    <span className="text-sm text-foreground opacity-0 py-1 px-2 rounded-md group-hover:bg-foreground/10 group-hover:opacity-100 transition-opacity duration-200">
                                        {link.text}
                                    </span>
                                    {<link.icon />}
                                </div>
                            </Link>
                        )
                )
            }
        </nav >
    );
};
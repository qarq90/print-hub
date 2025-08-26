"use client";;
import { NavbarLinks } from "@/data/navbar-data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const PrimaryBar = () => {
    const pathname = usePathname();


    if (pathname.includes("/sign-in")) {
        return null
    }

    const isActive = (href: string) => {
        if (href.startsWith("/new")) {
            return pathname.startsWith("/new");
        }
        if (href.startsWith("/user")) {
            return pathname.startsWith("/user");
        }
        return pathname === href;
    };


    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 md:bottom-auto md:top-1/2 md:right-auto md:left-4 md:-translate-y-1/2 md:translate-x-0 transform p-4 bg-accent md:text-foreground text-background md:bg-transparent h-fit w-screen md:w-fit flex justify-around flex-row md:flex-col gap-12 md:gap-9 text-2xl z-30">
            {NavbarLinks.map(
                (link, index) =>
                    link.isPrimaryLink && (
                        <Link
                            href={link.href.toString()}
                            className={cn(
                                "list-none cursor-pointer overflow-hidden group",
                                isActive(link.href)
                                    ? "text-foreground md:text-accent"
                                    : "text-background md:text-foreground",
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
        </nav>
    );
};

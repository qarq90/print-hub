"use client";
import { NavbarLinks } from "@/data/navbar-data";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { applyTheme } from "@/functions/theme";
import { LuMoon, LuSun } from "react-icons/lu";

export const PrimaryBar = () => {
    const pathname = usePathname();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const systemPrefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const initialDarkMode = savedTheme
            ? savedTheme === "dark"
            : systemPrefersDark;

        setIsDarkMode(initialDarkMode);
        applyTheme(initialDarkMode);
    }, []);

    const handleThemeToggle = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
        applyTheme(newDarkMode);
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
                                pathname === link.href.toString()
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

            <div
                onClick={handleThemeToggle}
                className={cn(
                    "list-none cursor-pointer overflow-hidden group text-foreground"
                )}
            >
                <div className="flex items-center gap-2">
                    {isDarkMode ? <LuMoon className="text-background md:text-foreground" /> : <LuSun className="text-background md:text-foreground" />}
                    <span className="md:block text-foreground hidden text-sm opacity-0 py-1 px-2 rounded-md group-hover:bg-foreground/10 group-hover:opacity-100 transition-opacity duration-200">
                        Theme
                    </span>
                </div>
            </div>
        </nav>
    );
};

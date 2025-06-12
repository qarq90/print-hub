"use client";

import { useEffect, useState } from "react";
import { applyTheme } from "@/functions/theme";
import { LuMoon, LuSun } from "react-icons/lu";
import { cn } from "@/lib/utils"

export const Theme = () => {
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
        <div
            onClick={handleThemeToggle}
            className={cn(
                "flex flex-row-reverse justify-end text-2xl cursor-pointer group gap-2",
            )}
        >
            <span className="text-sm opacity-0 py-1 px-2 rounded-md group-hover:bg-foreground/10 group-hover:opacity-100 transition-opacity duration-200">
                Toggle Theme
            </span>
            {isDarkMode ? <LuMoon /> : <LuSun />}
        </div>
    );
};


"use client";;
import React from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NewLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname()

    return (
        <MainLayout>
            <section className="flex justify-evenly bg-foreground/10 rounded-xl w-full">
                <Link href="/new/print" className={cn("cursor-pointer transition-colors w-1/2 text-foreground text-center p-1.5 rounded-md", pathname.includes("/new/print") && "bg-accent text-black")}>Upload Files</Link>
                <Link href="/new/order" className={cn("cursor-pointer transition-colors w-1/2 text-foreground text-center p-1.5 rounded-md", pathname.includes("/new/order") && "bg-accent text-black")}>Browse Stationary</Link>
            </section>
            {children}
        </MainLayout>
    )
}
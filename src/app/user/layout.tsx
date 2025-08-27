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
                <Link href="/user/prints" className={cn("cursor-pointer transition-colors w-1/2 text-foreground text-center p-1.5 rounded-md", pathname.includes("/user/prints") && "bg-accent text-black")}>Your Prints</Link>
                <Link href="/user/orders" className={cn("cursor-pointer transition-colors w-1/2 text-foreground text-center p-1.5 rounded-md", pathname.includes("/user/orders") && "bg-accent text-black")}>Your Orders</Link>
            </section>
            {children}
        </MainLayout>
    )
}
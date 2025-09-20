"use client";

import { MainLayout } from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Client() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [pageType, setPageType] = useState(true);

    const loginHandler = () => {
        if (password.length === 0) {
            alert("Empty Password Field");
            return;
        }

        if (pageType && password === "012005") {
            router.push("/users/admin/prints");
        } else if (!pageType && password === "12345678") {
            router.push("/users/shopkeeper/prints");
        } else {
            alert("Invalid Password");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            loginHandler();
        }
    }

    const clearHandler = () => {
        setPassword("");
    };

    return (
        <MainLayout>
            <section className="flex justify-evenly mb-4 bg-foreground/10 rounded-xl w-full">
                <div
                    className={cn(
                        "cursor-pointer transition-colors w-1/2 text-center p-1.5 rounded-md",
                        pageType === true && "bg-accent text-black"
                    )}
                    onClick={() => setPageType(true)}
                >
                    Admin
                </div>
                <div
                    className={cn(
                        "cursor-pointer transition-colors w-1/2 text-center p-1.5 rounded-md",
                        pageType === false && "bg-accent text-black"
                    )}
                    onClick={() => setPageType(false)}
                >
                    Shopkeeper
                </div>
            </section>

            {pageType === true && (
                <section className="py-52 w-full flex items-center justify-center">
                    <div className="flex w-full h-full flex-col gap-8 justify-center items-center">
                        <Text weight="bold" className="text-5xl">
                            Admin Login
                        </Text>
                        <div className="flex w-64 flex-col gap-4 items-center justify-center">
                            <Input
                                onKeyDown={handleKeyDown}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full"
                                placeholder="Enter admin password"
                                type="password"
                            />
                            <div className="flex w-30 justify-center items-center flex-row gap-2">
                                <Button variant="outline" className="w-full" onClick={clearHandler}>
                                    Clear
                                </Button>
                                <Button className="w-full" onClick={loginHandler}>
                                    Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {pageType === false && (
                <section className="py-52 w-full flex items-center justify-center">
                    <div className="flex w-full h-full flex-col gap-8 justify-center items-center">
                        <Text weight="bold" className="text-5xl">
                            Shopkeeper Login
                        </Text>
                        <div className="flex flex-col w-64 gap-4 items-center justify-center">
                            <Input
                                onKeyDown={handleKeyDown}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full"
                                placeholder="Enter shopkeeper password"
                                type="password"
                            />
                            <div className="flex w-30 justify-center items-center flex-row gap-2">
                                <Button variant="outline" className="w-full" onClick={clearHandler}>
                                    Clear
                                </Button>
                                <Button className="w-full" onClick={loginHandler}>
                                    Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}

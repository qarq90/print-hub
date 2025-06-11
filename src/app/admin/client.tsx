"use client";

import { MainLayout } from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Client() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const loginHandler = () => {
        if (password.length === 0) {
            alert("Empty Password Field")
            return
        }
        if (password === "iLoveGymMommies05") {
            router.push("/admin/prints-status")
        } else {
            alert("Invalid Admin Password")
        }
    }
    return (
        <MainLayout>
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="flex max-w-md w-full flex-col gap-8  justify-center items-center my-48">
                    <Text weight="bold" className="text-7xl">Admin Login</Text>
                    <div className="flex w-64 flex-col gap-4 items-center justify-center">
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" placeholder="Enter admin password" type="text" />
                        <Button className="w-full" onClick={loginHandler}>Login</Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
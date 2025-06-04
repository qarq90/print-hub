// import Client from "./client";
import { Metadata } from "next";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Text } from "@/components/ui/text";
import { auth, currentUser } from '@clerk/nextjs/server'
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";

export const metadata: Metadata = {
    title: "Print Hub | User",
    description: "Access your user profile",
};

export default async function Page() {
    const { userId } = await auth()

    if (!userId) {
        return <div>Sign in to view this page</div>
    }

    const user = await currentUser()

    return (
        <MainLayout>
            <div className="flex gap-4 flex-row items-center md:mt-4">
                <Image src={user?.imageUrl ? user?.imageUrl : ""} className="rounded-full" width={100} height={100} alt="pfp" />
                <Text size="5xl" weight="bold">{user?.fullName}</Text>
            </div>
            <SignOutButton />
            {/* <Client /> */}
        </MainLayout>
    );
}


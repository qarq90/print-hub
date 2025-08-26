import Client from "./client";
import { Metadata } from "next";
import { Text } from "@/components/ui/text";
import { auth, currentUser } from '@clerk/nextjs/server'
import { UserProps } from "@/interfaces/User";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";
import { NotLoggedIn } from "@/components/empty/NotLoggedIn";

export const metadata: Metadata = {
    title: "Print Hub | User | Prints",
    description: "View your print history",
};

export default async function Page() {
    const { userId } = await auth()

    const user = await currentUser();

    if (!userId || !user) {
        return <NotLoggedIn />
    }

    const userProps: UserProps = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        emailAddresses: user.emailAddresses.map(email => ({
            emailAddress: email.emailAddress
        })),
        imageUrl: user.imageUrl
    };

    return (
        <>
            <div className="flex gap-4 flex-row justify-between items-center md:mt-4">
                <div className="flex flex-row items-center gap-4">
                    <Image src={user?.imageUrl ? user?.imageUrl : ""} className="rounded-full" width={100} height={100} alt="pfp" />
                    <Text size="5xl" weight="bold">{user.fullName + "'s "}Print History</Text>
                </div>
                <div className="cursor-pointer bg-accent text-black shadow-xs hover:bg-primary/90 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
                    <SignOutButton />
                </div>
            </div>
            <Client user={userProps} />
        </>
    );
}


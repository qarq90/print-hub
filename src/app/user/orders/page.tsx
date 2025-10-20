import Client from "./client";
import { Metadata } from "next";
import { Text } from "@/components/ui/text";
import { auth, currentUser } from '@clerk/nextjs/server'
import { UserProps } from "@/interfaces/User";
import { NotLoggedIn } from "@/components/empty/NotLoggedIn";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { FiLogOut, FiCreditCard } from "react-icons/fi";

export const metadata: Metadata = {
    title: "Print Hub | User | Orders Payment",
    description: "Payment page for orders in Print Hub.",
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
            <div className="flex gap-4 flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-4">
                    <Text size="5xl" weight="bold">Order History</Text>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="cursor-pointer bg-accent text-black shadow-xs hover:bg-primary/90 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:scale-105">
                        <FiLogOut className="rotate-180 mt-0.5" /> <SignOutButton />
                    </div>
                    <Link href={"/user/orders/pay"} className="cursor-pointer bg-accent text-black shadow-xs hover:bg-primary/90 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:scale-105">
                        <FiCreditCard className="mt-0.5" /> Pay Now
                    </Link>
                </div>
            </div>
            <Client user={userProps} />
        </>
    );
}


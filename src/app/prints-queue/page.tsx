import Client from "./client";
import { Metadata } from "next";
import { auth, currentUser } from '@clerk/nextjs/server';
import { UserProps } from "@/interfaces/User";
import { NotLoggedIn } from "@/components/empty/NotLoggedIn";

export const metadata: Metadata = {
    title: "Print Hub | Today's Queue",
    description: "Prints tasked for today",
};

export default async function Page() {
    const { userId } = await auth();

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

    return <Client user={userProps} />;
}

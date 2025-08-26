import Client from "./client";
import { Metadata } from "next";
import { auth, currentUser } from '@clerk/nextjs/server';
import { UserProps } from "@/interfaces/User";

export const metadata: Metadata = {
    title: "Print Hub | Upload Files",
    description: "Submit files to be printed",
};

export default async function Page() {
    const { userId } = await auth();

    if (!userId) {
        return <div>Sign in to view this page</div>;
    }

    const user = await currentUser();

    if (!user) {
        return <div>User not found</div>;
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

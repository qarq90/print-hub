import Client from "./client";
import { auth, currentUser } from '@clerk/nextjs/server';
import { UserProps } from "@/interfaces/User";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Item({ params }: PageProps) {
    const { id } = await params;

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
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        fullName: user.fullName || '',
        emailAddresses: user.emailAddresses.map(email => ({
            emailAddress: email.emailAddress
        })),
        imageUrl: user.imageUrl || ''
    };

    return (
        <>
            <Client id={id} user={userProps} />
        </>
    );
}
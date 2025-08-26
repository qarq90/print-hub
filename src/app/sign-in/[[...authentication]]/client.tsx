"use client";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSignIn, useUser } from "@clerk/nextjs";
import pool from "@/lib/neon/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineGoogle } from "react-icons/ai";

export default function Client() {
    const { signIn, isLoaded: signInLoaded } = useSignIn();
    const { isSignedIn, user, isLoaded: userLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (userLoaded && isSignedIn && user) {
            const syncUserToDB = async () => {
                const client = await pool.connect();
                try {
                    await client.query(`
                        INSERT INTO "users" (
                            "user-id",
                            "user-name",
                            "user-email",
                            "first-name",
                            "last-name",
                            "user-avatar",
                            "phone-number"
                        )
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        ON CONFLICT ("user-id") DO NOTHING
                    `, [
                        user.id,
                        user.username || user.primaryEmailAddress?.emailAddress?.split("@")[0],
                        user.primaryEmailAddress?.emailAddress || null,
                        user.firstName || user.externalAccounts?.[0]?.firstName || "",
                        user.lastName || user.externalAccounts?.[0]?.lastName || "",
                        user.imageUrl || null,
                        user.primaryPhoneNumber?.phoneNumber || null,
                    ]);

                } catch (error) {
                    console.error("Failed to sync user:", error);
                } finally {
                    client.release();
                    router.push("/");
                }
            };

            syncUserToDB();
        }
    }, [userLoaded, isSignedIn, user, router]);

    const handleGoogleSignUp = async () => {
        if (!signInLoaded) return;

        await signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/",
        });
    };

    if (!userLoaded || !signInLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <MainLayout className="custom-signup-container">
            <section className="flex gap-4 flex-col justify-center items-center py-64">
                <Text weight="bold" size="5xl">Join PrintHub</Text>
                <Button
                    onClick={handleGoogleSignUp}
                    className="google-signup-button flex items-center gap-2"
                >
                    <AiOutlineGoogle className="w-5 h-5" />
                    <span>Continue with Google</span>
                </Button>
            </section>
        </MainLayout>
    );
}
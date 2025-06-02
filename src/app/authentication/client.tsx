"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { useSignIn, useSignUp, useSignInWithGoogle, useSignInWithGithub } from "@convex-dev/convex-lucia-auth/react";

type AuthFlow = "signIn" | "signUp";

export default function AuthPage() {
    const [state, setState] = useState<AuthFlow>("signIn");

    return (
        <div className="h-screen flex items-center justify-center">
            {state === "signIn" ? (
                <SignIn setState={setState} />
            ) : (
                <SignUp setState={setState} />
            )}
        </div>
    );
}

interface AuthFormProps {
    setState: (value: AuthFlow) => void;
}

function SignIn({ setState }: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = useSignIn();
    const signInWithGoogle = useSignInWithGoogle();
    const signInWithGithub = useSignInWithGithub();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn({ email, password });
        } catch (error) {
            console.error("Sign in failed:", error);
        }
    };

    return (
        <Card className="p-8 w-full max-w-md">
            <CardHeader>
                <CardTitle>Log In to Continue</CardTitle>
                <CardDescription>
                    Use your email or other services to continue.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Button size="lg" type="submit">
                        Continue
                    </Button>
                </form>
                <Separator className="my-4" />
                <div className="flex flex-col gap-2">
                    <Button
                        variant="outline"
                        onClick={signInWithGoogle}
                        size="lg"
                    >
                        Continue with Google
                    </Button>
                    <Button
                        variant="outline"
                        onClick={signInWithGithub}
                        size="lg"
                    >
                        Continue with Github
                    </Button>
                </div>
                <div className="text-muted-foreground text-sm mt-4">
                    Don't have an account?{" "}
                    <span
                        onClick={() => setState("signUp")}
                        className="underline hover:text-black cursor-pointer"
                    >
                        Sign Up
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

function SignUp({ setState }: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signUp = useSignUp();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signUp({ email, password });
        } catch (error) {
            console.error("Sign up failed:", error);
        }
    };

    return (
        <Card className="p-8 w-full max-w-md">
            <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                    Get started by creating a new account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                        minLength={8}
                    />
                    <Button size="lg" type="submit">
                        Create Account
                    </Button>
                </form>
                <div className="text-muted-foreground text-sm mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => setState("signIn")}
                        className="underline hover:text-black cursor-pointer"
                    >
                        Sign In
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
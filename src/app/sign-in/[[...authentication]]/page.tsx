import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Print Hub | Login",
    description: "Sign in to your Print Hub account to access your orders and print history.",
};

export default function Page() {
    return (
        <Client />
    );
}


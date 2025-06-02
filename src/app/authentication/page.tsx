import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Print Hub | Login",
    description: "Login with your account",
};

export default function Page() {
    return (
        <Client />
    );
}


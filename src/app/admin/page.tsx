import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Print Hub | Admin",
    description: "Verify Admin Login",
};

export default function Page() {
    return (
        <Client />
    );
}


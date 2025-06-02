import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Print Hub | User",
    description: "Access your user profile",
};

export default function Page() {
    return (
        <Client />
    );
}


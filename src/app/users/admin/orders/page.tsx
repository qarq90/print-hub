import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Print Hub | Users | Admin",
    description: "Administrator panel for managing Print Hub users, including account details, permissions, and activity monitoring.",
};

export default async function Page() {
    return <Client />;
}

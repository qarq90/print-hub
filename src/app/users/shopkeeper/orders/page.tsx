import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Print Hub | Users | Shopkeeper",
    description: "View and manage today's assigned items orders for shopkeepers in Print Hub.",
};

export default async function Page() {
    return <Client />;
}

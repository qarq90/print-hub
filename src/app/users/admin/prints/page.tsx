import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Print Hub | Today's Queue",
    description: "Prints tasked for today",
};

export default async function Page() {
    return <Client />;
}

import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Print Hub | Users",
    description: "Login as an Admin or Shopkeeper.",
};

export default function Page() {
    return (
        <Client />
    );
}


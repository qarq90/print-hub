import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Print Hub | Users | Admin | Prints",
    description:
        "Administrator panel for managing users prints, and activity monitoring.",
};
export default async function Page() {
    return <Client />;
}

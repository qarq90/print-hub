import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Print Hub | User | History",
    description: "View your Print History",
};

export default function Page() {
    return (
        <Client />
    );
}


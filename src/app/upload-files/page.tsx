import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Print Hub | ",
    description: "",
};

export default function Page() {
    return (
        <Client />
    );
}


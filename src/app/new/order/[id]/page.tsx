"use client";
import { useParams } from "next/navigation";
import Client from "./client";

export default function Item() {
    const params = useParams();
    const id = params?.id as string;

    return (
        <>
            <Client id={id} />
        </>
    );
}

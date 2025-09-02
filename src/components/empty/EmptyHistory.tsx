import Image from "next/image";
import Link from "next/link";
import { LuUpload } from "react-icons/lu";
import { useState } from "react";
import { EmptyHistoryImages } from "@/data/empty-svgs";

interface EmptyHistoryProps {
    title: string;
    description: string;
}


export const EmptyHistory = ({ title, description }: EmptyHistoryProps) => {
    const [randomImage] = useState(
        () => EmptyHistoryImages[Math.floor(Math.random() * EmptyHistoryImages.length)]
    );

    return (
        <div className="w-full h-[82vh] md:h-[60vh] md:w-full flex justify-center items-center flex-col gap-4 md:mt-0 text-center">
            <Image
                src={randomImage}
                alt="Decorative illustration"
                className="w-72 h-w-72 md:w-80 h-w-80 md:mx-auto"
            />
            <div className="space-y-4 max-w-[275px] md:max-w-[300px]">
                <h2 className="text-2xl font-bold text-foreground">
                    {title}
                </h2>
                <p className="text-muted-foreground">
                    {description}.
                </p>
                <Link
                    href={title.includes("History") ? "/new/print" : "/new/order"}
                    className="flex w-full cursor-pointer bg-accent text-black items-center justify-center rounded-md gap-2 py-2 px-3 shadow-lg transition-all duration-200 hover:opacity-75"
                >
                    <LuUpload className="mt-1" /> Schedule
                </Link>
            </div>
        </div>
    );
};
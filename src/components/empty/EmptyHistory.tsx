import { useState } from "react";
import Alien from "../../../public/img/empty-history/Alien.png";
import Bottle from "../../../public/img/empty-history/Bottle.png";
import Bunny from "../../../public/img/empty-history/Bunny.png";
import Chicken from "../../../public/img/empty-history/Chicken.png";
import Snow from "../../../public/img/empty-history/Snow.png";
import Sun from "../../../public/img/empty-history/Sun.png";
import Image from "next/image";
import Link from "next/link";
import { LuUpload } from "react-icons/lu";

interface EmptyHistoryProps {
    variant?: "history" | "log";
}

export const EmptyHistory = ({ variant = "history" }: EmptyHistoryProps) => {
    const [number] = useState<number>(Math.floor(Math.random() * 6) + 1);

    const getImage = () => {
        switch (number) {
            case 1:
                return Alien;
            case 2:
                return Bottle;
            case 3:
                return Sun;
            case 4:
                return Bunny;
            case 5:
                return Chicken;
            case 6:
                return Snow;
            default:
                return Alien;
        }
    };

    const title = variant === "history" ? "Empty History" : "Empty Print Queue";
    const description = variant === "history"
        ? "You haven't uploaded or scheduled any documents for printouts yet"
        : "No documents have been uploaded or scheduled for printouts yet";

    return (
        <div className="w-full h-[82vh] md:h-[60vh] md:w-full flex justify-center items-center flex-col gap-4 md:mt-0 text-center">
            <Image
                src={getImage()}
                alt="Decorative illustration"
                className="w-72 h-w-72 md:w-80 h-w-80 md:mx-auto"
            />

            <div className="space-y-4 max-w-[275px] md:max-w-[300px]">
                <h2 className="text-2xl font-bold text-foreground">
                    {title}
                </h2>
                <p className="text-muted-foreground">
                    {description}
                </p>
                <Link
                    href="/upload-files"
                    className="flex w-full cursor-pointer bg-accent text-black items-center justify-center rounded-md gap-2 py-2 px-3 shadow-lg transition-all duration-200 hover:opacity-75"
                >
                    <LuUpload /> Upload Documents
                </Link>
            </div>
        </div>
    );
};
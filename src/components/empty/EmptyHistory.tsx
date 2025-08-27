import Image from "next/image";
import Astronaut from "../../../public/img/humans/Astronaut.png";
import Banker from "../../../public/img/humans/Banker.png";
import Baseball from "../../../public/img/humans/Baseball.png";
import Basketball from "../../../public/img/humans/Basketball.png";
import Bikini from "../../../public/img/humans/Bikini.png";
import Diving from "../../../public/img/humans/Diving.png";
import Fitness from "../../../public/img/humans/Fitness.png";
import Relaxing from "../../../public/img/humans/Relaxing.png";
import Surfing from "../../../public/img/humans/Surfing.png";
import Swimming from "../../../public/img/humans/Swimming.png";
import Teacher from "../../../public/img/humans/Teacher.png";
import Tennis from "../../../public/img/humans/Tennis.png";
import Volleyball from "../../../public/img/humans/Volleyball.png";
import Yoga from "../../../public/img/humans/Yoga.png";
import Link from "next/link";
import { LuUpload } from "react-icons/lu";
import { useState } from "react";

interface EmptyHistoryProps {
    title: string;
    description: string;
}

const images = [
    Astronaut,
    Banker,
    Baseball,
    Basketball,
    Bikini,
    Diving,
    Fitness,
    Relaxing,
    Surfing,
    Swimming,
    Teacher,
    Tennis,
    Volleyball,
    Yoga,
];

export const EmptyHistory = ({ title, description }: EmptyHistoryProps) => {
    const [randomImage] = useState(
        () => images[Math.floor(Math.random() * images.length)]
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
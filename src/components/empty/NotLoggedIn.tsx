import { useState } from "react";
import Baseball from "../../../public/img/not-logged-in/Baseball.png";
import Basketball from "../../../public/img/not-logged-in/Basketball.png";
import Diving from "../../../public/img/not-logged-in/Diving.png";
import Fitness from "../../../public/img/not-logged-in/Fitness.png";
import Surfing from "../../../public/img/not-logged-in/Surfing.png";
import Volleyball from "../../../public/img/not-logged-in/Volleyball.png";
import Image from "next/image";
import Link from "next/link";
import { LuUserPlus } from "react-icons/lu";
export const NotLoggedIn = () => {
    const [number] = useState<number>(Math.floor(Math.random() * 6) + 1);

    const getImage = () => {
        switch (number) {
            case 1:
                return Baseball;
            case 2:
                return Basketball;
            case 3:
                return Volleyball;
            case 4:
                return Diving;
            case 5:
                return Fitness;
            case 6:
                return Surfing;
            default:
                return Baseball;
        }
    };

    return (
        <div className="w-full h-[82vh] md:h-[85vh] md:w-full flex justify-center items-center flex-col gap-6 md:mt-0 text-center">
            <Image
                src={getImage()}
                alt="Decorative illustration"
                className="w-72 h-w-72 md:w-80 h-w-80 md:mx-auto"
            />

            <div className="space-y-4 max-w-[275px] md:max-w-[300px]">
                <h2 className="text-2xl font-bold text-foreground">
                    Login required
                </h2>
                <p className="text-muted-foreground">
                    Account required to access this content.
                </p>
                <Link
                    href="/authentication"
                    className="flex w-full cursor-pointer bg-accent text-black items-center justify-center gap-2 rounded-md py-2 px-3 shadow-lg transition-all duration-200 hover:opacity-75"
                >
                    <LuUserPlus /> Log In
                </Link>
            </div>
        </div>
    );
};

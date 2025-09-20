import { NotLoggedInImages } from "@/data/empty-svgs";
import Image from "next/image";
import Link from "next/link";
import { LuUserPlus } from "react-icons/lu";

export const NotLoggedIn = () => {
    const randomImage = NotLoggedInImages[Math.floor(Math.random() * NotLoggedInImages.length)];

    return (
        <div className="w-full h-[82vh] md:h-[85vh] md:w-full flex justify-center items-center flex-col gap-4 md:mt-0 text-center">
            <Image
                src={randomImage}
                alt="Decorative illustration"
                className="w-72 h-w-72 md:w-80 h-w-80 md:mx-auto"
                priority
            />

            <div className="space-y-4 max-w-[275px] md:max-w-[300px]">
                <h2 className="text-2xl font-bold text-foreground">
                    Login required
                </h2>
                <p className="text-muted-foreground">
                    Account required to access this content.
                </p>
                <Link
                    href="/sign-in/google"
                    className="flex w-full cursor-pointer bg-accent text-black items-center justify-center gap-2 rounded-md py-2 px-3 shadow-md transition-all duration-200 hover:opacity-75"
                >
                    <LuUserPlus className="mt-1" /> Log In
                </Link>
            </div>
        </div>
    );
};
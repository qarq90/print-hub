import { useState } from "react";
import ConstructionCrane from "../../../public/img/development/ConstructionCrane.png";
import ConstructionWall from "../../../public/img/development/ConstructionWall.png";
import ConstructionWorker from "../../../public/img/development/ConstructionWorker.png";
import UnderConstruction from "../../../public/img/development/UnderConstructions.png";
import Image from "next/image";
import Link from "next/link";
import { LuHouse } from "react-icons/lu";

const images = [
    ConstructionCrane,
    ConstructionWall,
    UnderConstruction,
    ConstructionWorker,
];

export const UnderConstructions = () => {

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
                    Page Under Development
                </h2>
                <p className="text-muted-foreground">
                    We&apos;re working hard to bring you this feature soon. Please check back
                    later!
                </p>
                <Link
                    href="/"
                    className="flex w-full cursor-pointer bg-accent text-black items-center justify-center gap-2 rounded-md py-2 px-3 shadow-lg transition-all duration-200 hover:opacity-80"
                >
                    <LuHouse /> Back to Home
                </Link>
            </div>
        </div>
    );
};

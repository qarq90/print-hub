import { AuthenticationImages } from "@/data/empty-svgs";
import Image from "next/image";
import { useState } from "react";

export const Authentication = () => {
    const [randomImage] = useState(
        () => AuthenticationImages[Math.floor(Math.random() * AuthenticationImages.length)]
    );

    return (
        <div className="w-full h-[32vh] md:h-[44vh] md:w-full flex justify-center items-center flex-col md:mt-0 text-center">
            <Image
                src={randomImage}
                alt="Decorative illustration"
                className="w-72 h-w-72 md:w-80 h-w-80 md:mx-auto"
            />
        </div>
    );
};

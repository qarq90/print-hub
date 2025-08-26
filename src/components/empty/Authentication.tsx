import Apple from "../../../public/img/authentication/Apple.png";
import Banana from "../../../public/img/authentication/Banana.png";
import Breakfast from "../../../public/img/authentication/Breakfast.png";
import Cake from "../../../public/img/authentication/Cake.png";
import Cocktail from "../../../public/img/authentication/Cocktail.png";
import Dessert from "../../../public/img/authentication/Dessert.png";
import Image from "next/image";
import { useState } from "react";

const images = [
    Apple,
    Banana,
    Breakfast,
    Cake,
    Cocktail,
    Dessert,
];

export const Authentication = () => {
    const [randomImage] = useState(
        () => images[Math.floor(Math.random() * images.length)]
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

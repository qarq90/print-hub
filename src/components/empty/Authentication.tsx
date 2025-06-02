import { useState } from "react";
import Apple from "../../../public/img/authentication/Apple.png";
import Banana from "../../../public/img/authentication/Banana.png";
import Breakfast from "../../../public/img/authentication/Breakfast.png";
import Cake from "../../../public/img/authentication/Cake.png";
import Cocktail from "../../../public/img/authentication/Cocktail.png";
import Dessert from "../../../public/img/authentication/Dessert.png";
import Image from "next/image";

export const Authentication = () => {
    const [number] = useState<number>(Math.floor(Math.random() * 6) + 1);

    const getImage = () => {
        switch (number) {
            case 1:
                return Apple;
            case 2:
                return Banana;
            case 3:
                return Dessert;
            case 4:
                return Breakfast;
            case 5:
                return Cake;
            case 6:
                return Cocktail;
            default:
                return Apple;
        }
    };

    return (
        <div className="w-full h-[32vh] md:h-[44vh] md:w-full flex justify-center items-center flex-col md:mt-0 text-center">
            <Image
                src={getImage()}
                alt="Decorative illustration"
                className="w-72 h-w-72 md:w-80 h-w-80 md:mx-auto"
            />
        </div>
    );
};

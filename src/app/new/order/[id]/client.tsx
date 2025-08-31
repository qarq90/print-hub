"use client";

import Image from "next/image";
import { OrderItems } from "@/data/item-data";
import { Button } from "@/components/ui/button";

type Props = {
    id: string;
};

export default function Client({ id }: Props) {
    const item = OrderItems.find((product) => product.id === id);

    if (!item) {
        return (
            <div className="p-6 text-center text-red-600 font-semibold">
                ❌ Item not found
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
            <div className="flex justify-center items-start">
                <Image
                    src={item.img}
                    alt={item.title}
                    height={400}
                    className="rounded-xl w-full shadow-lg"
                />
            </div>

            <div className="flex flex-col space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">{item.title}</h1>
                </div>

                <div className="space-x-3">
                    <span className="text-2xl font-semibold text-green-700">
                        {item.price}
                    </span>
                    <span className="line-through">{item.mrp}</span>
                    {item.discount && (
                        <span className="text-red-600 font-semibold">
                            {item.discount}% OFF
                        </span>
                    )}
                </div>

                <p
                    className={`font-medium ${item.isAvailable ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {item.isAvailable
                        ? `In Stock (${item.stock} available)`
                        : "Currently Unavailable"}
                </p>

                <p className="text-yellow-500">
                    ⭐ {item.rating.toFixed(1)} / 5
                </p>

                <div className="w-full rounded-md bg-foreground/5 p-4">
                    <h2 className="text-xl font-semibold mb-3">Product Details</h2>
                    <ul className="space-y-2">
                        {item.details.map((detail, index) => (
                            <li key={index} className="flex justify-between">
                                <span className="font-medium">{detail.factor}:</span>
                                <span>{detail.value}</span>
                            </li>
                        ))}
                        {item.weight && (
                            <li className="flex justify-between">
                                <span className="font-medium">Weight:</span>
                                <span>{item.weight}</span>
                            </li>
                        )}
                        {item.dimensions && (
                            <li className="flex justify-between">
                                <span className="font-medium">Dimensions:</span>
                                <span>{item.dimensions}</span>
                            </li>
                        )}
                        {item.warranty && (
                            <li className="flex justify-between">
                                <span className="font-medium">Warranty:</span>
                                <span>{item.warranty}</span>
                            </li>
                        )}
                        {item.origin && (
                            <li className="flex justify-between">
                                <span className="font-medium">Origin:</span>
                                <span>{item.origin}</span>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="space-y-3">
                    <h2 className="text-xl font-semibold">About this item</h2>
                    <ul className="list-disc list-inside space-y-1">
                        {item.about.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>

                {item.tags && (
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <Button>Add to Cart</Button>
            </div>
        </div >
    );
}

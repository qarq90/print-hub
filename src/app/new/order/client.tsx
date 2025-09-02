/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { Text } from "@/components/ui/text";
import { UserProps } from "@/interfaces/User";
import { Items } from "@/data/item-data";
import Image from "next/image";
import Link from "next/link";
import { OrderType } from "@/components/pages/common/OrderType";
import { useState } from "react";
import { images } from "@/data/background-images";

interface ClientProps {
    user: UserProps;
}

export default function Client({ user: _user }: ClientProps) {
    const [orderType, setOrderType] = useState<"Paper" | "Writing" | "Art" | "Accessories" | "all">("all");

    const filteredItems = orderType === "all"
        ? Items || []
        : (Items || []).filter(item => item.category === orderType);

    return (
        <section key="stationary" title="Stationary" className="mb-12">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <Text size="5xl" weight="bold" className="text-foreground">Stationery</Text>
                    <Text size="base" className="text-foreground/60">Last updated: {new Date().toLocaleDateString()}</Text>
                </div>

                <OrderType orderType={orderType} setOrderType={setOrderType} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-8">
                    {filteredItems.map((item) => {
                        const randomImage = images[Math.floor(Math.random() * images.length)];

                        return (
                            <Link
                                href={`/new/order/${item.id}`}
                                key={item.id}
                                className="flex flex-col group transition-all hover:-translate-y-1 rounded-lg border border-foreground/10 overflow-hidden hover:shadow-lg h-full bg-background"
                            >
                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={randomImage}
                                        alt="Background"
                                        fill
                                        className="object-cover"
                                        priority={false}
                                    />
                                    <Image
                                        alt={item.name}
                                        src={item.image}
                                        fill
                                        className="object-contain transition-transform group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        quality={80}
                                        priority={Items.indexOf(item) < 6}
                                    />
                                </div>

                                <div className="p-4 flex flex-col gap-3 flex-grow bg-gray-500/5">
                                    <div className="flex justify-between items-start gap-2">
                                        <Text weight="bold" className="text-lg line-clamp-2">{item.name}</Text>
                                        <Text weight="bold" className="text-primary whitespace-nowrap pl-2">
                                            ₹{item.price}
                                        </Text>
                                    </div>
                                    <Text className="text-foreground/80 line-clamp-3">{item.short_description}</Text>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
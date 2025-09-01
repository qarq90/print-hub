"use client";

import Image from "next/image";
import { Items } from "@/data/item-data";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ItemType } from "@/data/item-data";
import { LuShoppingCart, LuTruck } from "react-icons/lu";

type Props = {
    id: string;
};

export default function Client({ id }: Props) {
    const item = Items.find((product) => product.id === id);

    if (!item) {
        return (
            <div className="p-6 text-center text-red-600 font-semibold">
                ❌ Item not found
            </div>
        );
    }

    return (
        <section className="w-full">
            <div className="mx-auto max-w-5xl py-5">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Image */}
                    <div className="flex flex-col gap-2">
                        <div className="relative md:h-[485px] w-full overflow-hidden rounded-md">
                            <Image
                                src={
                                    item.image
                                        ? item.image
                                        : "/placeholder.svg?height=600&width=800&query=Product Image"
                                }
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 50vw, 100vw"
                                priority
                            />
                        </div>

                        {/* Weight + Dimensions */}
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <div className="rounded-md flex flex-col border border-foreground/10 bg-foreground/5 p-3">
                                <Text className="text-foreground/70">Weight :</Text>
                                <Text weight="semibold">{item.weight || "—"}</Text>
                            </div>
                            <div className="rounded-md flex flex-col border border-foreground/10 bg-foreground/5 p-3">
                                <Text className="text-foreground/70">Dimensions :</Text>
                                <Text weight="semibold">{item.dimensions || "—"}</Text>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Text size="4xl" weight="bold" className="text-balance">
                                {item.name}
                            </Text>
                            <Text className="text-foreground/70">{item.category}</Text>

                            {item.types.length > 0 && (
                                <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {item.types.map((t: ItemType, i: number) => (
                                        <div
                                            key={`${t.factor}-${i}`}
                                            className="flex items-center justify-between rounded-md border border-foreground/10 bg-background/60 px-3 py-2"
                                        >
                                            <span className="text-foreground/70">{t.factor}</span>
                                            <span className="font-medium text-foreground">{t.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {item.short_description && <Text className="text-foreground/80">{item.short_description}</Text>}

                        {item.long_description.length > 0 && (
                            <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-4">
                                <Text size="lg" weight="semibold">
                                    About this item :
                                </Text>
                                <ul className="mt-3 list-disc space-y-2 pl-5">
                                    {item.long_description.map((line: string, i: number) => (
                                        <li key={i} className="text-foreground/80">
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="rounded-lg">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-row items-center gap-2">
                                    <Text size="xl" className="text-foreground/70">Price :</Text>
                                    <Text size="xl" weight="semibold">
                                        {"$"}
                                        {typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                                    </Text>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline"><LuShoppingCart /> Add to Cart</Button>
                                    <Button><LuTruck /> Order Now</Button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile CTA */}
                        <div className="sticky bottom-4 z-10 mt-2 block md:hidden">
                            <div className="rounded-lg border border-foreground/10 bg-background/90 p-3 backdrop-blur">
                                <div className="flex items-center justify-between">
                                    <Text weight="semibold">
                                        {"$"}
                                        {typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                                    </Text>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline"><LuShoppingCart /> Add to Cart</Button>
                                        <Button><LuTruck /> Order Now</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
}

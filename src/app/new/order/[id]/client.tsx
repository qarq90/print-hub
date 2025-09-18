"use client";

import Image from "next/image";
import { Items } from "@/data/item-data";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ItemType } from "@/data/item-data";
import { LuShoppingCart, LuTruck } from "react-icons/lu";
import { images } from "@/data/background-images";
import { useConsistentRandom } from "@/hooks/use-consistent-random";
import { Modal } from "@/components/Modal";
import router from "next/router";
import { useState } from "react";

type Props = {
    id: string;
};

export default function Client({ id }: Props) {
    const item = Items.find((product) => product.id === id);
    const backgroundImage = useConsistentRandom(images, id);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!item) {
        return (
            <div className="p-6 text-center text-red-600 font-semibold">
                ❌ Item not found
            </div>
        );
    }

    const handleAddToCart = () => {
        setIsOpen(true);
    };

    const confirmAddToCart = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsOpen(false);
            // ✅ Here you can actually add to cart logic
            alert(`${item.name} has been added to cart!`);
        }, 2000);
    };

    return (
        <section className="w-full">
            <div className="mx-auto max-w-5xl py-5">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <div className="relative aspect-square overflow-hidden rounded-md">
                            <Image
                                src={backgroundImage}
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

                    {/* Right side */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
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
                                        {"₹"}
                                        {typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                                    </Text>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" onClick={handleAddToCart}>
                                        <LuShoppingCart /> Add to Cart
                                    </Button>
                                    <Button><LuTruck /> Order Now</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onClose={() => !isLoading && setIsOpen(false)}
                    closeOnOutsideClick={!isLoading}
                    closeOnEsc={!isLoading}
                >
                    <div className="p-6 text-center">
                        {!isLoading ? (
                            <>
                                <LuShoppingCart size={48} className="mx-auto text-accent" />
                                <h3 className="mt-2 text-lg font-medium">
                                    Are you sure you want to add this item to cart?
                                </h3>
                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        No
                                    </Button>
                                    <Button onClick={confirmAddToCart}>
                                        Yes
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
                                <p className="text-sm text-foreground/70">Adding to cart...</p>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </section>
    );
}

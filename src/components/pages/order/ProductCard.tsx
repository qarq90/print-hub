"use client";

import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components/ui/text";
import { useConsistentRandom } from "@/hooks/use-consistent-random";
import { images } from "@/data/background-images";
import { Item } from "@/data/item-data";

interface ProductCardProps {
    item: Item;
}

export const ProductCard = ({ item }: ProductCardProps) => {
    const backgroundImage = useConsistentRandom(images, item.id);

    return (
        <Link
            href={`/new/order/${item.id}`}
            className="flex flex-col group transition-all hover:-translate-y-1 rounded-lg border border-foreground/10 overflow-hidden hover:shadow-md h-full bg-background"
        >
            <div className="relative aspect-square overflow-hidden">
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
};
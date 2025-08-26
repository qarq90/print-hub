"use client";;
import { Text } from "@/components/ui/text";
import { MainLayout } from "@/components/layouts/MainLayout";
import { UserProps } from "@/interfaces/User";
import { OrderItems } from "@/data/order-data";
import Image from "next/image";
import Link from "next/link";

interface ClientProps {
    user: UserProps;
}

export default function Client({ user }: ClientProps) {
    return (
        <section key="stationary" title="Stationary" className="mb-12">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <Text size="5xl" weight="bold" className="text-foreground">Stationery</Text>
                    <Text size="base" className="text-foreground/60">Last updated: {new Date().toLocaleDateString()}</Text>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {OrderItems.map((item, index) => (
                        <Link
                            href={`/new/order/${item.id}`}
                            key={`${item.title}-${index}`}
                            className="flex flex-col group transition-all hover:-translate-y-1 rounded-lg border border-foreground/10 overflow-hidden hover:shadow-lg h-full bg-background"
                        >
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    alt={item.title}
                                    src={item.img}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    quality={80}
                                    priority={index < 6}
                                />
                            </div>

                            <div className="p-4 flex flex-col gap-3 flex-grow">
                                <div className="flex justify-between items-start gap-2">
                                    <Text weight="bold" className="text-lg line-clamp-2">{item.title}</Text>
                                    <Text weight="bold" className="text-primary whitespace-nowrap pl-2">
                                        {item.price}
                                    </Text>
                                </div>
                                <Text className="text-foreground/80 line-clamp-3">{item.content}</Text>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
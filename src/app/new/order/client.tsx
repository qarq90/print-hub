/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";;
import { Text } from "@/components/ui/text";
import { UserProps } from "@/interfaces/User";
import { Items } from "@/data/item-data";
import { OrderType } from "@/components/pages/print/OrderType";
import { useState } from "react";
import { ProductCard } from "@/components/pages/order/ProductCard";

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
                <div className="flex flex-col">
                    <Text size="5xl" weight="bold" className="text-foreground">Stationery</Text>
                    <Text size="base" className="text-foreground/60">Last updated: {new Date().toLocaleDateString()}</Text>
                </div>

                <OrderType orderType={orderType} setOrderType={setOrderType} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-8">
                    {filteredItems.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
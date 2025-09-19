"use client";

import Image from "next/image";
import { Items } from "@/data/item-data";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ItemType } from "@/data/item-data";
import { LuMinus, LuPlus, LuShoppingCart, LuTruck } from "react-icons/lu";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { insertOrder } from "@/functions/orders";
import { UserProps } from "@/interfaces/User";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

type Props = {
    id: string;
    user: UserProps;
};

export default function Client({ id, user }: Props) {
    const item = Items.find((product) => product.id === id);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [instructions, setInstructions] = useState("");
    const [actionType, setActionType] = useState<"cart" | "order">("cart"); // Track the action type
    const router = useRouter()

    if (!item) {
        return (
            <div className="p-6 text-center text-red-600 font-semibold">
                ❌ Item not found
            </div>
        );
    }

    const handleAddToCart = () => {
        setActionType("cart");
        setIsOpen(true);
    };

    const handleOrderNow = () => {
        setActionType("order");
        setIsOpen(true);
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const confirmAction = async () => {
        try {
            setIsLoading(true);
            const insertRecord = await insertOrder({
                item_id: item.id,
                item_name: item.name,
                item_category: item.category,
                item_type: "" + item.types.map(t => t.factor).join(", "),
                item_quantity: quantity.toString(),
                item_price: item.price,
                instructions: instructions,
                ordered_at: new Date().toISOString(),
                order_status: actionType === "cart" ? "in-cart" : "pending",
                in_cart: actionType === "cart",
            }, user)

            if (insertRecord.status) {
                router.push(actionType === "cart" ? "/user/orders" : "/user/orders")
            }

        } catch (error) {
            console.error("Error processing order:", error);
        } finally {
            setIsLoading(false);
            setIsOpen(false);
        }
    };

    return (
        <section className="w-full">
            <div className="mx-auto max-w-5xl py-5">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <div className="relative aspect-square overflow-hidden rounded-md">
                            <Image
                                alt={item.name}
                                src={item.image}
                                fill
                                className="object-contain border border-foreground/10 shadow-md transition-transform group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                quality={80}
                                priority={Items.indexOf(item) < 6}
                            />
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-3">
                            {item.types.length > 0 && (
                                <div className="mt-3 col-span-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {item.types.map((t: ItemType, i: number) => (
                                        <div
                                            key={`${t.factor}-${i}`}
                                            className="flex flex-col rounded-md border border-foreground/10 bg-background/60 px-3 py-2"
                                        >
                                            <span className="text-foreground/50">{t.factor}     :</span>
                                            <span className="font-medium text-foreground">{t.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="rounded-md flex flex-col border border-foreground/10 px-3 py-2">
                                <Text className="text-foreground/50">Weight :</Text>
                                <Text weight="semibold">{item.weight || "—"}</Text>
                            </div>
                            <div className="rounded-md flex flex-col border border-foreground/10 px-3 py-2">
                                <Text className="text-foreground/50">Dimensions :</Text>
                                <Text weight="semibold">{item.dimensions || "—"}</Text>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Text size="4xl" weight="bold" className="text-balance">
                                {item.name}
                            </Text>
                            <Text className="text-foreground/70">{item.category}</Text>
                            {item.short_description && <Text className=" text-foreground/80">{item.short_description}</Text>}
                        </div>

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

                        <div className="flex items-center gap-3">
                            <Text className="text-foreground/70">Quantity :</Text>
                            <div className="flex items-center gap-2">
                                <LuMinus
                                    onClick={decrementQuantity}
                                    size={24}
                                    className={cn(
                                        "p-1 bg-foreground/10 hover:bg-accent cursor-pointer hover:text-black rounded-sm",
                                        quantity <= 1 && "opacity-50 cursor-not-allowed"
                                    )}
                                />
                                <span className="text-foreground font-medium w-6 text-center">
                                    {quantity}
                                </span>
                                <LuPlus
                                    size={24}
                                    onClick={incrementQuantity}
                                    className="p-1 bg-foreground/10 cursor-pointer hover:bg-accent hover:text-black rounded-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-3 w-full">
                            <Text className="text-foreground/70 whitespace-nowrap">Instructions :</Text>
                            <div className="flex-1 w-full">
                                <Textarea
                                    onChange={(e) => {
                                        setInstructions(e.target.value);
                                    }}
                                    value={instructions || ""}
                                    placeholder="Specify Instructions..."
                                    className="w-full h-16"
                                    rows={5}
                                />
                            </div>
                        </div>

                        <div className="rounded-lg">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-row items-center gap-2">
                                    <Text size="xl" className="text-foreground/70">Price :</Text>
                                    <Text size="xl" weight="semibold">
                                        {"₹"}
                                        {typeof item.price === "number" ? (item.price * quantity).toFixed(2) : item.price}
                                    </Text>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" onClick={handleAddToCart}>
                                        <LuShoppingCart /> Add to Cart
                                    </Button>
                                    <Button onClick={handleOrderNow}><LuTruck /> Order Now</Button>
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
                                {actionType === "cart" ? (
                                    <LuShoppingCart size={48} className="mx-auto text-accent" />
                                ) : (
                                    <LuTruck size={48} className="mx-auto text-accent" />
                                )}
                                <h3 className="mt-2 text-lg font-medium">
                                    {actionType === "cart"
                                        ? "Are you sure you want to add this item to cart?"
                                        : "Are you sure you want to place this order now?"}
                                </h3>
                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        No
                                    </Button>
                                    <Button onClick={confirmAction}>
                                        Yes
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
                                <p className="text-sm text-foreground/70">
                                    {actionType === "cart" ? "Adding to cart..." : "Placing order..."}
                                </p>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </section>
    );
}
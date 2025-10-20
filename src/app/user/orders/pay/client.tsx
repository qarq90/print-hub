/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";;
import { EmptyHistory } from "@/components/empty/EmptyHistory";
import { Text } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { UserProps } from "@/interfaces/User";
import { HalfLoader } from "@/components/ui/loader";
import { truncateText } from "@/functions/utility";
import { Button } from "@/components/ui/button";
import { SiRazorpay } from "react-icons/si";
import { FaMoneyBill } from "react-icons/fa6";
import Link from "next/link";
import { fetchUserUnpaidOrders } from "@/functions/orders";
import { OrderRecord } from "@/interfaces/Order";

interface ClientProps {
    user: UserProps;
}

export default function Client({ user }: ClientProps) {
    const [orders, setOrders] = useState<OrderRecord[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string>("razorpay");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchUserUnpaidOrders(user);

                if (result.error) {
                    throw result.error;
                }

                setOrders(result.data || []);
            } catch (error) {
                console.error("Error fetching user history:", error);
                setError(error instanceof Error ? error.message : "Failed to fetch history");
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="mb-20">
                <div className="md:mb-4 mb-2 flex flex-col text-left">
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <HalfLoader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <Text color="error">{error}</Text>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="mb-20">
                <div className="mb-16 flex flex-col text-left">
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <EmptyHistory
                    description="All your orders have been paid. There are no unpaid orders at this time."
                    title="All Orders Paid"
                />
            </div>
        );
    }

    const calculateCost = (item: OrderRecord) => {
        return parseInt(item.item_quantity) * item.item_price;
    };

    return (
        <>
            <div className="md:mb-4 mb-2 flex flex-col text-left">
                <Text size="base">
                    Last updated: {new Date().toLocaleDateString()}
                </Text>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
                <div className="grid grid-cols-1 p-2">
                    <div className="grid grid-cols-4 p-1 items-center border-b border-foreground/10">
                        <Text weight="bold" className="col-span-2">Item Name</Text>
                        <Text weight="bold">Quantity </Text>
                        <Text weight="bold">Cost </Text>
                    </div>
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-4 p-1 items-center border-b border-foreground/10"
                        >
                            <Text className="col-span-2">
                                {truncateText(order.item_name, 24)}
                            </Text>
                            <Text> {order.item_quantity}</Text>
                            <Text>₹ {order.item_price}</Text>
                        </div>
                    ))}
                    <div className="grid grid-cols-4 p-1 items-center">
                        <Text weight="bold" className="col-span-2"></Text>
                        <Text weight="bold">Total</Text>
                        <Text weight="bold">₹ {orders.reduce((total, doc) => total + calculateCost(doc), 0)}.00</Text>
                    </div>
                </div>
                <div className="flex flex-col p-2 gap-4">
                    <Text size="3xl">Choose a Payment Mode</Text>
                    <Text size="base" className="text-foreground/70">
                        Complete your payment securely using Razorpay or pay later using Cash on Delivery (COD).
                    </Text>
                    <div className="flex flex-row gap-2 h-fit">
                        <Button className="w-1/2"><SiRazorpay /> Razorpay</Button>
                        <Link href="/user/orders" className="w-1/2 cursor-pointer bg-accent text-black shadow-xs hover:bg-primary/90 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:scale-105">
                            <FaMoneyBill /> COD (Cash on Delivery)
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
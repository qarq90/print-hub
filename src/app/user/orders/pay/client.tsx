/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { EmptyHistory } from "@/components/empty/EmptyHistory";
import { Text } from "@/components/ui/text";
import { HalfLoader } from "@/components/ui/loader";
import { truncateText } from "@/functions/utility";
import { Button } from "@/components/ui/button";
import { SiRazorpay } from "react-icons/si";
import { FaMoneyBill } from "react-icons/fa6";
import Link from "next/link";
import { fetchUserUnpaidOrders } from "@/functions/orders";
import { UserProps } from "@/interfaces/User";
import { OrderRecord } from "@/interfaces/Order";

interface ClientProps {
    user: UserProps;
}

interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function Client({ user }: ClientProps) {
    const [orders, setOrders] = useState<OrderRecord[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isProcess, setIsProcess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchUserUnpaidOrders(user);

                if (result.error) throw result.error;

                setOrders(result.data || []);
            } catch (err) {
                console.error("Error fetching user history:", err);
                setError(err instanceof Error ? err.message : "Failed to fetch history");
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [user]);

    const calculateCost = (item: OrderRecord) => {
        return parseInt(item.item_quantity) * item.item_price;
    };

    const handlePayment = async () => {
        if (!orders || orders.length === 0) return;
        setIsProcess(true);
        try {
            const response = await fetch("/api/create-order", { method: "POST" });
            const data = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orders.reduce((total, doc) => total + calculateCost(doc), 0) * 100,
                currency: "INR",
                name: "Printhub",
                description: "Order Payment",
                order_id: data.order_id,
                handler: function (res: RazorpayPaymentResponse) {
                    console.log("Payment complete", res);
                    // TODO: refresh orders or redirect to success page
                },
                prefill: {
                    name: user.fullName || "Jon Doe",
                    email: user.emailAddresses || "jondoe@example.com",
                },
                theme: { color: "#3399cc" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.log("Payment error:", err);
        } finally {
            setIsProcess(false);
        }
    };

    if (loading)
        return (
            <div className="mb-20">
                <div className="md:mb-4 mb-2 flex flex-col text-left">
                    <Text size="base">Last updated: {new Date().toLocaleDateString()}</Text>
                </div>
                <HalfLoader />
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-64">
                <Text color="error">{error}</Text>
            </div>
        );

    if (!orders || orders.length === 0)
        return (
            <div className="mb-20">
                <div className="mb-16 flex flex-col text-left">
                    <Text size="base">Last updated: {new Date().toLocaleDateString()}</Text>
                </div>
                <EmptyHistory
                    description="All your orders have been paid. There are no unpaid orders at this time."
                    title="All Orders Paid"
                />
            </div>
        );

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="md:mb-4 mb-2 flex flex-col text-left">
                <Text size="base">Last updated: {new Date().toLocaleDateString()}</Text>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
                {/* Order List */}
                <div className="grid grid-cols-1 p-2">
                    <div className="grid grid-cols-4 p-1 items-center border-b border-foreground/10">
                        <Text weight="bold" className="col-span-2">
                            Item Name
                        </Text>
                        <Text weight="bold">Quantity </Text>
                        <Text weight="bold">Cost </Text>
                    </div>

                    {orders.map((order, index) => (
                        <div key={index} className="grid grid-cols-4 p-1 items-center border-b border-foreground/10">
                            <Text className="col-span-2">{truncateText(order.item_name, 24)}</Text>
                            <Text>{order.item_quantity}</Text>
                            <Text>₹ {order.item_price}</Text>
                        </div>
                    ))}

                    <div className="grid grid-cols-4 p-1 items-center">
                        <Text weight="bold" className="col-span-2"></Text>
                        <Text weight="bold">Total</Text>
                        <Text weight="bold">₹ {orders.reduce((total, doc) => total + calculateCost(doc), 0)}.00</Text>
                    </div>
                </div>

                {/* Payment Options */}
                <div className="flex flex-col p-2 gap-4">
                    <Text size="3xl">Choose a Payment Mode</Text>
                    <Text size="base" className="text-foreground/70">
                        Complete your payment securely using Razorpay or pay later using Cash on Delivery.
                    </Text>

                    <div className="flex flex-row gap-2 h-fit">
                        <Button className="w-1/2" onClick={handlePayment} disabled={isProcess}>
                            <SiRazorpay /> {isProcess ? "Processing..." : "Razorpay"}
                        </Button>

                        <Link
                            href="/user/orders"
                            className="w-1/2 cursor-pointer bg-accent text-black shadow-xs hover:bg-primary/90 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:scale-105"
                        >
                            <FaMoneyBill className="mt-0.5" /> Cash on Delivery
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

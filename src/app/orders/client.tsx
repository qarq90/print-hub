"use client";;
import { MainLayout } from "@/components/layouts/MainLayout";
import { Text } from "@/components/ui/text";
import { UserProps } from "@/interfaces/User";
import { EmptyHistory } from "@/components/empty/EmptyHistory";
import { GridView } from "@/components/pages/order/GridView";
import { TableView } from "@/components/pages/order/TableView";
import { ViewType } from "@/components/pages/order/ViewType";
import { HalfLoader } from "@/components/ui/loader";
import { useState, useEffect } from "react";
import { fetchPendingOrders } from "@/functions/orders";
import { OrderRecord } from "@/interfaces/Order";

interface ClientProps {
    user: UserProps;
}

export default function Client({ user: user }: ClientProps) {
    const [viewType, setViewType] = useState(false);
    const [orders, setOrders] = useState<OrderRecord[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchPendingOrders();
                setOrders(result?.data || []);
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
            <MainLayout>
                <div className="md:mb-4 mb-2 flex flex-col text-left">
                    <Text size="5xl" weight="bold">Orders</Text>
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <HalfLoader />
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-64">
                    <Text color="error">{error}</Text>
                </div>
            </MainLayout>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <MainLayout>
                <div className="mb-3 flex flex-col text-left">
                    <Text size="5xl" weight="bold">Orders</Text>
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <EmptyHistory
                    type="orders"
                    title="No Orders"
                    description="No orders have been placed yet to be delivered"
                />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="md:mb-4 mb-2 flex flex-col text-left">
                <Text size="5xl" weight="bold">Orders</Text>
                <Text size="base">
                    Last updated: {new Date().toLocaleDateString()}
                </Text>
            </div>
            <div className="relative md:flex hidden justify-between md:py-0 py-3 flex-row items-center z-40">
                <ViewType setViewType={setViewType} viewType={viewType} />
            </div>
            {viewType ? (
                <TableView orderResult={orders} page_type="order_queue" />
            ) : (
                <GridView orderResult={orders} page_type="order_queue" />
            )}
        </MainLayout>
    );
}
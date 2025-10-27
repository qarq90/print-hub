"use client";;
import { Text } from "@/components/ui/text";
import { OrderRecord } from "@/interfaces/Order";
import { EmptyHistory } from "@/components/empty/EmptyHistory";
import { GridView } from "@/components/pages/order/GridView";
import { StatusType } from "@/components/pages/order/StatusType";
import { TableView } from "@/components/pages/order/TableView";
import { ViewType } from "@/components/pages/order/ViewType";
import { HalfLoader } from "@/components/ui/loader";
import { useState, useEffect } from "react";
import { fetchPendingOrders } from "@/functions/orders";

export default function AdminOrdersClient() {
    const [viewType, setViewType] = useState(false);
    const [statusType, setStatusType] = useState<"all" | "cancelled" | "completed" | "pending" | "in-cart">("all");
    const [orders, setOrders] = useState<OrderRecord[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchPendingOrders();

                if (result.error) {
                    throw result.error;
                }

                setOrders(result.data || []);
            } catch (error) {
                console.error("Error fetching Pending Orders:", error);
                setError(error instanceof Error ? error.message : "Failed to fetch orders");
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredOrders = statusType === "all"
        ? orders || []
        : (orders || []).filter(item => item.order_status === statusType);

    if (loading) {
        return (
            <div className="mb-20">
                <div className="md:mb-4 mb-2 flex flex-col text-left">
                    <Text size="5xl" weight="bold">Pending Orders</Text>
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
                <Text size="base">
                    Last updated: {new Date().toLocaleDateString()}
                </Text>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="mb-20">
                <div className="mb-16 flex flex-col text-left">
                    <Text size="5xl" weight="bold">Pending Orders</Text>
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <EmptyHistory
                    type="orders"
                    description="No orders have been placed yet"
                    title="No Orders"
                />
            </div>
        );
    }

    return (
        <>
            <div className="md:mb-4 mb-2 flex flex-col text-left">
                <Text size="5xl" weight="bold">Pending Orders</Text>
                <Text size="base">
                    Last updated: {new Date().toLocaleDateString()}
                </Text>
            </div>
            <div className="flex justify-between md:py-0 pt-3 flex-row items-center">
                <ViewType setViewType={setViewType} viewType={viewType} />
                <StatusType setStatusType={setStatusType} statusType={statusType} />
            </div>
            {viewType ? (
                <TableView orderResult={filteredOrders} page_type="shopkeeper_page" />
            ) : (
                <GridView orderResult={filteredOrders} page_type="shopkeeper_page" />
            )}
        </>
    );
}
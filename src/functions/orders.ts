import { OrderType, OrderRecord } from "@/interfaces/Order";
import { UserProps } from "@/interfaces/User";

export const fetchPendingOrders = async () => {
    try {
        const response = await fetch("/api/get/neon/orders/pending-orders", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.error || "Failed to fetch pending orders"
            );
        }
        return await response.json();
    } catch (e) {
        console.error("Neon fetchPendingOrders error:", e);
        throw e;
    }
};

export const fetchAllOrders = async () => {
    try {
        const response = await fetch("/api/get/neon/orders/fetch-all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch all orders");
        }
        return await response.json();
    } catch (e) {
        console.error("Neon fetchAllOrders error:", e);
        throw e;
    }
};

export const insertOrder = async (order: OrderType, user: UserProps) => {
    try {
        const response = await fetch("/api/post/neon/orders/insert-record", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order, user }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to insert order");
        }
        return await response.json();
    } catch (e) {
        console.error("Neon insertOrder error:", e);
        throw e;
    }
};

export const fetchUserOrders = async (user: UserProps) => {
    try {
        const response = await fetch("/api/post/neon/orders/user-history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch user orders");
        }

        return await response.json();
    } catch (e) {
        console.error("Neon fetchUserOrders error:", e);
        throw e;
    }
};

export const fetchUserUnpaidOrders = async (user: UserProps) => {
    try {
        const response = await fetch("/api/post/neon/orders/user-unpaid", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch user history");
        }

        return await response.json();
    } catch (e) {
        console.error("Neon fetchUserHistory error:", e);
        throw e;
    }
};

export const updateOrder = async (order: OrderRecord) => {
    try {
        const response = await fetch("/api/put/neon/orders/update-order", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                order_id: order.order_id,
                item_quantity: order.item_quantity,
                instructions: order.instructions,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update order status");
        }
        return await response.json();
    } catch (e) {
        console.error("Neon updateOrderStatus error:", e);
        throw e;
    }
};

export const cancelOrder = async (order: OrderRecord) => {
    try {
        const response = await fetch("/api/patch/neon/orders/cancel-order", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: order.order_id }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to cancel order");
        }
        return await response.json();
    } catch (e) {
        console.error("Neon cancelOrder error:", e);
        throw e;
    }
};

export const paidOrder = async (order: OrderRecord) => {
    try {
        const response = await fetch("/api/patch/neon/orders/paid-order", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: order.order_id }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to cancel document");
        }

        return await response.json();
    } catch (e) {
        console.error("Neon cancelDocument error:", e);
        throw e;
    }
};

export const completeOrder = async (order: OrderRecord) => {
    try {
        const response = await fetch("/api/patch/neon/orders/complete-order", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: order.order_id }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to complete order");
        }
        return await response.json();
    } catch (e) {
        console.error("Neon completeOrder error:", e);
        throw e;
    }
};

export const checkoutOrder = async (order: OrderRecord) => {
    try {
        const response = await fetch("/api/patch/neon/orders/checkout-order", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: order.order_id }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to cancel order");
        }
        return await response.json();
    } catch (e) {
        console.error("Neon cancelOrder error:", e);
        throw e;
    }
};

export const getEmptyStateConfig = (page_type: string, statusType: string) => {
    if (page_type === "order_queue" || page_type === "shopkeeper_page") {
        switch (statusType) {
            case "completed":
                return {
                    title: "No Completed Orders",
                    description: "There are no completed orders in the queue",
                };
            case "cancelled":
                return {
                    title: "No Cancelled Orders",
                    description: "There are no cancelled orders in the queue",
                };
            case "pending":
                return {
                    title: "No Pending Orders",
                    description: "The order queue is currently empty",
                };
            case "all":
            default:
                return {
                    title: "Empty Order Queue",
                    description: "No orders in the queue",
                };
        }
    }

    if (page_type === "user_history") {
        switch (statusType) {
            case "completed":
                return {
                    title: "No Completed Orders",
                    description: "You haven't completed any orders yet",
                };
            case "cancelled":
                return {
                    title: "No Cancelled Orders",
                    description: "You haven't cancelled any orders",
                };
            case "pending":
                return {
                    title: "No Pending Orders",
                    description: "You don't have any pending orders",
                };
            case "all":
            default:
                return {
                    title: "No Orders",
                    description: "You haven't placed any orders yet",
                };
        }
    }

    if (page_type === "admin_page") {
        switch (statusType) {
            case "completed":
                return {
                    title: "No Completed Orders",
                    description: "No users have completed any orders yet",
                };
            case "cancelled":
                return {
                    title: "No Cancelled Orders",
                    description: "No users have cancelled any orders",
                };
            case "pending":
                return {
                    title: "No Pending Orders",
                    description: "There are no pending orders at the moment",
                };
            case "all":
            default:
                return {
                    title: "No Order Records",
                    description: "No order records found in the system",
                };
        }
    }

    return {
        title: "No Orders",
        description: "No orders found for the current selection",
    };
};

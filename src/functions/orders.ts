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

export const updateOrder = async (order: OrderRecord) => {
    try {
        const response = await fetch("/api/put/neon/orders/update-order", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                order_id: order["order-id"],
                item_quantity: order["item-quantity"],
                instructions: order["instructions"],
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
            body: JSON.stringify({ order_id: order["order-id"] }),
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

export const completeOrder = async (order: OrderRecord) => {
    try {
        const response = await fetch("/api/patch/neon/orders/complete-order", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: order["order-id"] }),
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

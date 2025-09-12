// import { OrderType, OrderRecord } from "@/interfaces/Order";
// import { UserProps } from "@/interfaces/User";

// export const fetchAllOrders = async (): Promise<OrderRecord[]> => {
//     try {
//         const response = await fetch("/api/get/neon/orders/fetch-all", {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.error || "Failed to fetch all orders");
//         }
//         return await response.json();
//     } catch (e) {
//         console.error("Neon fetchAllOrders error:", e);
//         throw e;
//     }
// };

// export const insertOrder = async (
//     order: OrderType,
//     user: UserProps
// ): Promise<OrderRecord> => {
//     try {
//         const response = await fetch("/api/post/neon/orders/insert-record", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ order, user }),
//         });
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.error || "Failed to insert order");
//         }
//         return await response.json();
//     } catch (e) {
//         console.error("Neon insertOrder error:", e);
//         throw e;
//     }
// };

// export const fetchUserOrders = async (
//     user: UserProps
// ): Promise<OrderRecord[]> => {
//     try {
//         const response = await fetch("/api/post/neon/orders/user-orders", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ user }),
//         });
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.error || "Failed to fetch user orders");
//         }
//         return await response.json();
//     } catch (e) {
//         console.error("Neon fetchUserOrders error:", e);
//         throw e;
//     }
// };

// export const fetchPendingOrders = async (): Promise<OrderRecord[]> => {
//     try {
//         const response = await fetch("/api/get/neon/orders/pending-orders", {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         });
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(
//                 errorData.error || "Failed to fetch pending orders"
//             );
//         }
//         return await response.json();
//     } catch (e) {
//         console.error("Neon fetchPendingOrders error:", e);
//         throw e;
//     }
// };

// export const updateOrder = async (
//     orderId: number,
//     newStatus: OrderType,
//     user: UserProps
// ): Promise<OrderRecord> => {
//     try {
//         const response = await fetch("/api/put/neon/orders/update-order", {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ orderId, newStatus, user }),
//         });
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.error || "Failed to update order status");
//         }
//         return await response.json();
//     } catch (e) {
//         console.error("Neon updateOrderStatus error:", e);
//         throw e;
//     }
// };

// export const cancelOrder = async (
//     orderId: number,
//     user: UserProps
// ): Promise<OrderRecord> => {
//     try {
//         const response = await fetch("/api/delete/neon/orders/cancel-order", {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ orderId, user }),
//         });
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.error || "Failed to cancel order");
//         }
//         return await response.json();
//     } catch (e) {
//         console.error("Neon cancelOrder error:", e);
//         throw e;
//     }
// };

// export const completeOrder = async (
//     orderId: number,
//     user: UserProps
// ): Promise<OrderRecord> => {
//     try {
//         const response = await fetch("/api/put/neon/orders/complete-order", {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ orderId, user }),
//         });
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.error || "Failed to complete order");
//         }
//         return await response.json();
//     } catch (e) {
//         console.error("Neon completeOrder error:", e);
//         throw e;
//     }
// };

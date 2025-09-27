export interface OrderType {
    item_id: string;
    user_id?: string;
    user_name?: string;
    item_name: string;
    item_category: string;
    item_type: string;
    item_quantity: string;
    item_price: number;
    instructions: string;
    ordered_at: string;
    order_status: "pending" | "completed" | "cancelled" | "in-cart";
    in_cart: boolean;
}

export interface OrderRecord {
    order_id: string;
    item_id: string;
    user_id: string;
    user_name: string;
    item_name: string;
    item_category: string;
    item_type: string;
    item_quantity: string;
    item_price: number;
    instructions: string;
    ordered_at: string;
    order_status: "pending" | "completed" | "cancelled" | "in-cart";
    in_cart: boolean;
}

export interface OrderType {
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
    order_status: "pending" | "completed" | "cancelled";
    in_cart: boolean;
}

export interface OrderRecord {
    "item-id": string;
    "user-id": string;
    "user-name": string;
    "item-name": string;
    "item-category": string;
    "item-type": string;
    "item-quantity": string;
    "item-price": number;
    instructions: string;
    "ordered-at": string;
    "order-status": "pending" | "completed" | "cancelled";
    "in-cart": boolean;
}

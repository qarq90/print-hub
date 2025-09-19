import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { order_id, item_quantity, instructions } = body;

        if (!order_id) {
            return NextResponse.json(
                { error: "Order ID is required for update", status: false },
                { status: 400 }
            );
        }

        const query = `
            UPDATE "orders" 
            SET 
                "item-quantity" = $1,
                "instructions" = $2
            WHERE "order-id" = $3
            RETURNING *;
        `;

        const values = [item_quantity, instructions, order_id];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: "Order not found", status: false },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: result.rows[0], status: true });
    } catch (error) {
        console.error("Error updating:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}

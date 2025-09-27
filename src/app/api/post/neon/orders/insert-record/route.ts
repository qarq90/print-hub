import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";
import { getFormatDate } from "@/functions/utility";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { order, user } = body;

        const query = `
      INSERT INTO "orders" (
        item_id,
        user_id,
        user_name,
        item_name,
        item_category,
        item_type,
        item_quantity,
        item_price,
        instructions,
        ordered_at,
        order_status,
        in_cart
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;

        const values = [
            order.item_id,
            user.id,
            user.fullName,
            order.item_name,
            order.item_category,
            order.item_type,
            order.item_quantity,
            order.item_price,
            order.instructions,
            getFormatDate(new Date()),
            order.order_status,
            order.in_cart,
        ];

        const result = await pool.query(query, values);
        return NextResponse.json({ data: result.rows, status: true });
    } catch (error) {
        console.error("Error inserting:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}

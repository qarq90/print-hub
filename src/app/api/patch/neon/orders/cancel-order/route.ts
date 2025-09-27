import pool from "@/lib/neon/config";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { order_id } = body;

        if (!order_id) {
            return NextResponse.json(
                {
                    error: "Order ID is required to cancel order",
                    status: false,
                },
                { status: 400 }
            );
        }

        const query = `
            UPDATE "orders" 
            SET 
                order_status = 'cancelled'
            WHERE order_id = $1
            RETURNING *;
        `;

        const values = [order_id];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: "Order not found", status: false },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: result.rows[0],
            message: "Order cancelled successfully",
            status: true,
        });
    } catch (error) {
        console.error("Error cancelling order:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}

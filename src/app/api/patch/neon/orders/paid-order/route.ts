import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";

export async function PATCH(req: Request) {
    try {
        const { order_id } = await req.json();

        if (!order_id) {
            return NextResponse.json(
                { error: "Print ID is required", status: false },
                { status: 400 }
            );
        }

        const query = `
            UPDATE "orders"
            SET payment_status = 'paid'
            WHERE order_id = $1
            RETURNING *;
        `;

        const values = [order_id];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: "Print not found", status: false },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: result.rows[0],
            message: "Print Payment successfully",
            status: true,
        });
    } catch (error) {
        console.error("Error cancelling:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}

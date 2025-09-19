import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";

export async function GET() {
    try {
        const query = `
            SELECT * FROM "orders" 
            WHERE "in-cart" = true
            ORDER BY "ordered-at" DESC;
        `;

        const result = await pool.query(query);

        return NextResponse.json({ 
            data: result.rows, 
            status: true 
        });
    } catch (error) {
        console.error("Error fetching cart orders:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}
import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";

export async function GET() {
    try {
        const result = await pool.query(
            `SELECT * FROM "prints" ORDER BY uploaded_at ASC;`
        );
        return NextResponse.json({ data: result.rows, status: true });
    } catch (error) {
        console.error("Error fetching all prints:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}

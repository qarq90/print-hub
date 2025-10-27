import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";

export async function POST(req: Request) {
    try {
        const { user } = await req.json();

        const query = `
      SELECT * FROM "prints"
      WHERE payment_status = 'unpaid'
      AND user_id = $1
      AND print_status IN ('completed', 'pending')
      ORDER BY uploaded_at ASC;
    `;

        const result = await pool.query(query, [user.id]);
        return NextResponse.json({ data: result.rows, status: true });
    } catch (error) {
        console.error("Error fetching user history:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}

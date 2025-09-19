import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";

export async function POST(req: Request) {
    try {
        const { user } = await req.json();

        console.log(user.id);

        const query = `
      SELECT * FROM "orders"
      WHERE "user-id" = $1
      ORDER BY "ordered-at" ASC;
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

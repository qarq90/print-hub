import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";
import { PrintRecord } from "@/interfaces/Print";

export async function GET() {
    try {
        const query = `
      SELECT * FROM "prints"
      WHERE "print-status" = $1
      ORDER BY "uploaded-at" DESC;
    `;
        const result = await pool.query<PrintRecord>(query, ["pending"]);
        return NextResponse.json({ data: result.rows, status: true });
    } catch (error) {
        console.error("Error fetching queue:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}

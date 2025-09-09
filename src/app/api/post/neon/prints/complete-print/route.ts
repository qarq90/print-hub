import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";

export async function PUT(req: Request) {
    try {
        const { printId } = await req.json();

        const query = `
      UPDATE "prints"
      SET "print-status" = $1
      WHERE "print-id" = $2
      RETURNING *;
    `;

        const result = await pool.query(query, ["completed", printId]);
        return NextResponse.json({ data: result.rows[0], status: true });
    } catch (error) {
        console.error("Error completing:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}

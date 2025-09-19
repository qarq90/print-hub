import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";

export async function PUT(req: Request) {
    try {
        const document = await req.json();

        const query = `
      UPDATE "prints"
      SET 
        "page-count" = $1,
        "print-count" = $2,
        "print-type" = $3,
        "print-color" = $4,
        "binding-type" = $5,
        "instructions" = $6
      WHERE "print-id" = $7
      RETURNING *;
    `;

        const values = [
            document["page-count"],
            document["print-count"],
            document["print-type"],
            document["print-color"],
            document["binding-type"],
            document["instructions"],
            document["print-id"],
        ];

        const result = await pool.query(query, values);
        return NextResponse.json({ data: result.rows[0], status: true });
    } catch (error) {
        console.error("Error updating:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}

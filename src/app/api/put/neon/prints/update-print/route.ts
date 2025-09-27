import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";

export async function PUT(req: Request) {
    try {
        const { document } = await req.json();

        const query = `
      UPDATE "prints"
      SET 
        page_count = $1,
        print_count = $2,
        print_type = $3,
        print_color = $4,
        binding_type = $5,
        instructions = $6
      WHERE print_id = $7
      RETURNING *;
    `;

        const values = [
            document.page_count,
            document.print_count,
            document.print_type,
            document.print_color,
            document.binding_type,
            document.instructions,
            document.print_id,
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

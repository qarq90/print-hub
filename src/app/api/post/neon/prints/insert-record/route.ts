import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";
import { getFormatDate } from "@/functions/utility";
import { generatePrintId } from "@/functions/prints";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { pinataResult, file, user } = body;

        const query = `
      INSERT INTO "prints" (
        print_id,
        user_id,
        user_name,
        file_name,
        file_type,
        ipfs_id,
        ipfs_link,
        hashed_content,
        print_count,
        page_count,
        print_type,
        print_color,
        binding_type,
        instructions,
        print_status,
        uploaded_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *;
    `;

        const values = [
            generatePrintId(),
            user.id,
            user.fullName,
            file.file_name,
            file.file_type,
            pinataResult.ipfs_id,
            pinataResult.ipfs_url,
            file.hashed_content,
            file.print_count,
            file.page_count,
            file.print_type,
            file.print_color,
            file.binding_type,
            file.instructions || "",
            "pending",
            getFormatDate(new Date()),
        ];

        const result = await pool.query(query, values);
        return NextResponse.json({ data: result.rows, status: true });
    } catch (error) {
        console.error("Error inserting:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}

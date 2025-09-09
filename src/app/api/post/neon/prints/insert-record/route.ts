import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";
import { getFormatDate } from "@/functions/file";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { pinataResult, file, user } = body;

        const pageCount =
            file.print_type === "double_side"
                ? file.page_count
                : file.page_count * 2;

        const query = `
      INSERT INTO "prints" (
        "print-id",
        "page-count",
        "print-type",
        "print-color",
        "print-count",
        "print-status",
        "ipfs-link",
        "file-name",
        "file-type",
        "user-name",
        "user-id",
        "uploaded-at",
        "binding-type",
        "instructions"
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *;
    `;

        const values = [
            pinataResult.id,
            pageCount,
            file.print_type,
            file.print_color,
            file.print_count,
            "pending",
            pinataResult.ipfs_url,
            file.file_name.substring(4),
            file.file_type,
            user.fullName,
            user.id,
            getFormatDate(new Date()),
            file.binding_type,
            file.instructions,
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

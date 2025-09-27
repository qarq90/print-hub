import { NextResponse } from "next/server";
import pool from "@/lib/neon/config";

export async function POST(req: Request) {
    try {
        const { hashed_content } = await req.json();

        const query = `
      SELECT * FROM "prints"
      WHERE hashed_content = $1
    `;

        const result = await pool.query(query, [hashed_content]);

        if (result.rows.length > 0) {
            console.log(result);
            return NextResponse.json({
                fileExists: true,
                status: true,
                numberOfRows: result.rows.length,
                existsResult: {
                    hashed_content: result.rows[0].hashed_content,
                    ipfs_id: result.rows[0].ipfs_id,
                    ipfs_url: result.rows[0].ipfs_link,
                },
            });
        }

        return NextResponse.json({
            fileExists: false,
            numberOfRows: result.rows.length,
            status: true,
        });
    } catch (error) {
        console.error("Error fetching user history:", error);
        return NextResponse.json(
            { error: String(error), status: false },
            { status: 500 }
        );
    }
}

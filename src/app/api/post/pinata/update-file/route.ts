import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/pinata/config";

export async function POST(request: NextRequest) {
    try {
        const { id, file_name } = await request.json();

        if (!id || !file_name) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const result = await pinata.files.public.update({
            id: id,
            name: file_name,
        });

        return NextResponse.json(
            {
                id: result.id,
                name: result.name,
                ipfs_cid: result.cid,
            },
            { status: 200 }
        );
    } catch (e) {
        console.error("Pinata upload error:", e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

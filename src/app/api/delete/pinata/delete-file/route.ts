import { NextResponse } from "next/server";
import { pinata } from "@/lib/pinata/config";

export async function DELETE(request: Request) {
    try {
        const { ipfs_id } = await request.json();

        if (!ipfs_id) {
            return NextResponse.json(
                { error: "File ID is required" },
                { status: 400 }
            );
        }

        const deletedFiles = await pinata.files.public.delete([ipfs_id]);

        return NextResponse.json(deletedFiles, { status: 200 });
    } catch (e) {
        console.error("Server error:", e);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

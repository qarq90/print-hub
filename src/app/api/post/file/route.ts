import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/pinata/config";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const { cid } = await pinata.upload.public.file(file);

        const url = await pinata.gateways.public.convert(cid);

        return NextResponse.json(
            {
                ipfs_hash: cid,
                ipfs_url: url,
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

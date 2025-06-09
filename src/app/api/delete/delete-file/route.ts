import { NextResponse } from "next/server";
import { PinataSDK } from "pinata";

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        console.log(id);

        if (!id) {
            return NextResponse.json(
                { error: "File ID is required" },
                { status: 400 }
            );
        }
        const pinata = new PinataSDK({
            pinataJwt: process.env.PINATA_JWT_TOKEN!,
            pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY_DOMAIN,
        });

        const deletedFiles = await pinata.files.public.delete([id]);

        console.log(deletedFiles);

        return NextResponse.json(deletedFiles, { status: 200 });
    } catch (e) {
        console.error("Server error:", e);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

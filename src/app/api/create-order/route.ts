import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST() {
    try {
        const order = await razorpay.orders.create({
            amount: 100 * 100,
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        });

        return NextResponse.json({ orderId: order.id }, { status: 300 });
    } catch (error) {
        console.error("Error processing order:", error);
        return NextResponse.json(
            { error: "Error processing Order" },
            { status: 500 }
        );
    }
}

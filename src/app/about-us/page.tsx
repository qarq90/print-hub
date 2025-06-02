import { MainLayout } from "@/components/layouts/MainLayout";
import { Metadata } from "next";
import Client from "./client";
import { Text } from "@/components/ui/text";
import { Hero } from "@/components/pages/about-us/Hero";
import { Problems } from "@/components/pages/about-us/Problems";
import { Features } from "@/components/pages/about-us/Features";

export const metadata: Metadata = {
    title: "Print Hub | About Us",
    description: "Modern document printing solutions powered by technology",
};

export default function Page() {
    return (
        <MainLayout>
            <div className="mb-8 text-left">
                <Text size="5xl" weight="bold">About Us</Text>
                <Text size="base">
                    Revolutionizing document workflows through technology
                </Text>
            </div>

            <div className="flex flex-col gap-12">
                <Hero />
                <Problems />
                <Features />
            </div >
            <Client />
        </MainLayout >
    );
}


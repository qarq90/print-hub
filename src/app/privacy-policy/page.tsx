import { MainLayout } from "@/components/layouts/MainLayout";
import { Metadata } from "next";
import Client from "./client";
import { Text } from "@/components/ui/text";
import { Sections } from "@/components/pages/privacy-policy/PrivacyPolicySections";
import { Footer } from "@/components/pages/privacy-policy/PrivacyPolicyFooter";

export const metadata: Metadata = {
    title: "Print Hub | Privacy Policy",
    description: "Our Privacy Policy",
};

export default function Page() {
    return (
        <MainLayout>
            <div className="mb-8 flex flex-col gap-2 text-left">
                <Text size="5xl" weight="bold">Privacy Policy</Text>
                <Text size="base">
                    Last updated: 30/05/2025
                </Text>
            </div>

            <Sections />
            <Footer />
            <Client />
        </MainLayout>
    );
}
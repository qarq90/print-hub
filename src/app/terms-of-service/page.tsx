import { MainLayout } from "@/components/layouts/MainLayout";
import { Metadata } from "next";
import Client from "./client";
import { Text } from "@/components/ui/text";
import { Sections } from "@/components/pages/terms-of-service/TermsOfServiceSections";
import { Footer } from "@/components/pages/terms-of-service/TermsOfServiceFooter";

export const metadata: Metadata = {
    title: "Print Hub | Terms of Service",
    description: "Our terms and conditions",
};

export default function Page() {
    return (
        <MainLayout>
            <div className="mb-4 flex flex-col gap-2 text-left">
                <Text size="5xl" weight="bold">Terms of Service</Text>
                <Text size="base">
                    Last updated: 30/05/2025
                </Text>
            </div>

            <Sections />
            <Footer />
            <Client />
        </MainLayout >
    );
}
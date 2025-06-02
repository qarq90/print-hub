import { MainLayout } from "@/components/layouts/MainLayout";
import { Metadata } from "next";
import Client from "./client";
import { Text } from "@/components/ui/text";
import { FAQSection } from "@/components/pages/contact-us/FAQs";
import { Mail } from "@/components/pages/contact-us/Mail";

export const metadata: Metadata = {
    title: "Print Hub | Contact Us",
    description: "Get in touch with Print Hub",
};

export default function Page() {
    return (
        <MainLayout>
            <div className="mb-8 text-left">
                <Text size="5xl" weight="bold">Contact Us</Text>
                <Text>
                    We&apos;d love to hear from you!
                </Text>
            </div>

            <FAQSection />
            <Mail />
            <Client />
        </MainLayout>
    );
}

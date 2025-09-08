import Client from "./client";
import { Text } from "@/components/ui/text";
import { TermsOfServiceSections } from "@/components/pages/terms-of-service/TermsOfServiceSections";
import { TermsOfServiceFooter } from "@/components/pages/terms-of-service/TermsOfServiceFooter";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Metadata } from "next";
import { PrivacyPolicySections } from "@/components/pages/privacy-policy/PrivacyPolicySections";
import { PrivacyPolicyFooter } from "@/components/pages/privacy-policy/PrivacyPolicyFooter";

export const metadata: Metadata = {
    title: "Print Hub | Terms of Service",
    description: "Official terms and conditions for using Print Hub.",
};

export default function Page() {
    return (
        <MainLayout>
            <>
                <div className="-mb-4 flex flex-col text-left">
                    <Text size="5xl" weight="bold">Privacy Policy</Text>
                    <Text size="base">
                        Last updated: 30/05/2025
                    </Text>
                </div>

                <PrivacyPolicySections />
                <PrivacyPolicyFooter />
                <Client />
            </>

            <>
                <div className="-mb-4 mt-8 flex flex-col text-left">
                    <Text size="5xl" weight="bold">Terms of Service</Text>
                    <Text size="base">
                        Last updated: 30/05/2025
                    </Text>
                </div>

                <TermsOfServiceSections />
                <TermsOfServiceFooter />
                <Client />
            </>
        </MainLayout>
    );
}
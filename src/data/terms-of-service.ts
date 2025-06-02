import { StaticImageData } from "next/image";
import AcceptanceofTerms from "../../public/img/terms-of-service/AcceptanceofTerms.png";
import UserResponsibilities from "../../public/img/terms-of-service/UserResponsibilities.png";
import ContentOwnership from "../../public/img/terms-of-service/ContentOwnership.png";
import ChangesToTerms from "../../public/img/terms-of-service/ChangesToTerms.png";

type TermsSection = {
    title: string;
    content: string;
    img: StaticImageData;
};

export const TermsSections: TermsSection[] = [
    {
        title: "Acceptance of Terms",
        content:
            "By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.",
        img: AcceptanceofTerms,
    },
    {
        title: "User Responsibilities",
        content:
            "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device.",
        img: UserResponsibilities,
    },
    {
        title: "Content Ownership",
        content:
            "All content provided on our platform is owned by or licensed to us. You may not reproduce, distribute, or create derivative works without permission.",
        img: ContentOwnership,
    },
    {
        title: "Changes to Terms",
        content:
            "We reserve the right to modify these terms at any time. Your continued use of the service constitutes acceptance of the modified terms.",
        img: ChangesToTerms,
    },
];

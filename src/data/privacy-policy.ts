import { StaticImageData } from "next/image";
import Collect from "../../public/img/privacy-policy/Collect.png";
import Information from "../../public/img/privacy-policy/Information.png";
import PersonalData from "../../public/img/privacy-policy/PersonalData.png";
import Police from "../../public/img/privacy-policy/Police.png";
import Searching from "../../public/img/privacy-policy/Searching.png";
import Share from "../../public/img/privacy-policy/Share.png";

type PrivacySection = {
    title: string;
    content: string;
    img: StaticImageData;
};

export const PrivacySections: PrivacySection[] = [
    {
        title: "Information We Collect",
        content:
            "We collect personal information you provide directly, including name, email address, and usage data when you interact with our services. This may include information submitted when creating an account or making a purchase.",
        img: Information,
    },
    {
        title: "How We Use Information",
        content:
            "We use the collected information to provide and improve our services, process transactions, communicate with you about orders and services, and for security and compliance purposes. Your data helps us personalize your experience and develop new features.",
        img: Collect,
    },
    {
        title: "Data Sharing",
        content:
            "We do not sell your personal information. We may share data with trusted service providers who assist us in operations (payment processors, shipping carriers) under strict confidentiality agreements. Data may also be shared when required by law.",
        img: Share,
    },
    {
        title: "Security Measures",
        content:
            "We implement industry-standard security measures including encryption, secure servers, and access controls to protect your data. However, no method of electronic transmission or storage is 100% secure.",
        img: Police,
    },
    {
        title: "Your Rights",
        content:
            "You may request access, correction, or deletion of your personal data by contacting us. Some data may be retained for legal or operational needs. You can opt-out of marketing communications at any time.",
        img: PersonalData,
    },
    {
        title: "Cookies and Tracking",
        content:
            "We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage cookie preferences through your browser settings, though this may affect functionality.",
        img: Searching,
    },
];

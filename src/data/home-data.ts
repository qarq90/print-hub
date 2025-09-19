import {
    LuCloudLightning,
    LuShieldEllipsis,
    LuList,
    LuFileText,
    LuWorkflow,
    LuRefreshCw,
    LuCloud,
    LuSmartphone,
    LuCheckCheck,
} from "react-icons/lu";
import { IconType } from "react-icons";

type featuresType = {
    icon: IconType;
    text: string;
    header: string;
};

type testimonialType = {
    name: string;
    feedback: string;
};

export const printHubFeatures: featuresType[] = [
    {
        icon: LuSmartphone,
        header: "Mobile Ready",
        text: "Request and approve jobs from any device.",
    },
    {
        icon: LuShieldEllipsis,
        header: "Secure & Private",
        text: "Encrypted documents with automatic deletion after printing.",
    },
    {
        icon: LuFileText,
        header: "Smart Request System",
        text: "Intuitive forms with auto-fill for common document types.",
    },
    {
        icon: LuWorkflow,
        header: "Automated Workflows",
        text: "Documents routed instantly to the right approvers.",
    },
    {
        icon: LuRefreshCw,
        header: "Task Tracking",
        text: "Monitor status from submission to order to pickup.",
    },
    {
        icon: LuCloud,
        header: "Cloud Storage",
        text: "Secure storage with version history for all documents.",
    },
    {
        icon: LuCloudLightning,
        header: "Lightning Fast",
        text: "Get your academic materials and prints within 24 hours.",
    },
    {
        icon: LuList,
        header: "Track Everything",
        text: "Monitor all jobs in real-time via dashboard.",
    },
    {
        icon: LuCheckCheck,
        header: "Fast Turnaround",
        text: "College materials printed and ready within 24 hours.",
    },
];

export const printhubTestimonials: testimonialType[] = [
    {
        name: "Siddique Arquam",
        feedback:
            "PrintHub made my project submission stress-free. Super quick and affordable!",
    },
    {
        name: "Sofiya Patwekar",
        feedback:
            "I loved the scheduling feature. My prints were ready exactly when I needed them.",
    },
    {
        name: "Haadiya Sayed",
        feedback:
            "Quality prints every single time. The colors are sharp and delivery is on point.",
    },
    {
        name: "Tuba Chaudhary",
        feedback:
            "As a student, PrintHub saved me countless hours. Highly recommend it!",
    },
    {
        name: "Tabish Javed",
        feedback:
            "The website is clean and easy to use. I uploaded my files and got them printed in minutes.",
    },
    {
        name: "Anas Nathani",
        feedback:
            "Excellent customer service and reliable printing. Won’t go anywhere else.",
    },
];

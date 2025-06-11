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

export const printHubFeatures: featuresType[] = [
    {
        icon: LuSmartphone,
        header: "Mobile Ready",
        text: "Request and approve documents from any device.",
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
        header: "Print Tracking",
        text: "Monitor status from submission to printing to pickup.",
    },
    {
        icon: LuCloud,
        header: "Cloud Storage",
        text: "Secure storage with version history for all documents.",
    },
    {
        icon: LuCloudLightning,
        header: "Lightning Fast",
        text: "Get your academic materials printed within 24 hours.",
    },
    {
        icon: LuList,
        header: "Track Everything",
        text: "Monitor all print jobs in real-time via dashboard.",
    },
    {
        icon: LuCheckCheck,
        header: "Fast Turnaround",
        text: "College materials printed and ready within 24 hours.",
    },
];

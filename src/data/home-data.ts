import {
    LuCloudLightning,
    LuUsers,
    LuShieldEllipsis,
    LuList,
    LuCheck,
    LuClock,
    LuFileText,
    LuWorkflow,
    LuRefreshCw,
    LuCloud,
    LuSmartphone,
} from "react-icons/lu";
import { IconType } from "react-icons";

type featuresType = {
    icon: IconType;
    text: string;
    header: string;
    columns: Number;
};

export const printHubFeatures: featuresType[] = [
    {
        icon: LuSmartphone,
        header: "Mobile Ready",
        text: "Request and approve documents from any device.",
        columns: 1,
    },
    {
        icon: LuShieldEllipsis,
        header: "Secure & Private",
        text: "Your documents are encrypted and automatically deleted after printing. Complete privacy for sensitive materials.",
        columns: 2,
    },
    {
        icon: LuFileText,
        header: "Smart Request System",
        text: "Intuitive forms with auto-fill and templates for common document types.",
        columns: 1,
    },
    {
        icon: LuWorkflow,
        header: "Automated Workflows",
        text: "Routing logic that ensures documents reach the right approvers instantly.",
        columns: 1,
    },
    {
        icon: LuRefreshCw,
        header: "Real-Time Tracking",
        text: "Live status updates from submission to printing to pickup.",
        columns: 1,
    },
    {
        icon: LuCloud,
        header: "Secure Cloud Storage",
        text: "All documents securely stored with version history.",
        columns: 1,
    },
    {
        icon: LuSmartphone,
        header: "Analytics Dashboard",
        text: "Insights into printing volumes and process bottlenecks.",
        columns: 1,
    },
    {
        icon: LuCloudLightning,
        header: "Lightning Fast",
        text: "Get your college materials printed within 24 hours. Fast, convenient academic printing.",
        columns: 1,
    },
    {
        icon: LuUsers,
        header: "Team Friendly",
        text: "Built for campus life. Track your academic prints, share with classmates, and manage group project printing easily.",
        columns: 1,
    },
    {
        icon: LuList,
        header: "Track Everything",
        text: "Monitor all your print jobs in real-time with our intuitive dashboard.",
        columns: 1,
    },
    {
        icon: LuCheck,
        header: "Fast Turnaround",
        text: "Get your college materials printed within 24 hours.",
        columns: 1,
    },
    {
        icon: LuClock,
        header: "Team Friendly",
        text: "Built for campus life. Share with classmates and manage group projects easily.",
        columns: 1,
    },
];

import { StaticImageData } from "next/image";

import MobilePhone from "../../public/img/about-us/MobilePhone.png";
import Post from "../../public/img/about-us/Post.png";
import DataVisualization from "../../public/img/about-us/DataVisualization.png";
import UserProfile from "../../public/img/about-us/UserProfile.png";
import OnlineShopping from "../../public/img/about-us/OnlineShopping.png";
import DataCloud from "../../public/img/about-us/DataCloud.png";

type AboutUsFeature = {
    title: string;
    description: string;
    image: StaticImageData;
};

type AboutUsFAQ = {
    question: string;
    answer: string;
};

export const AboutUsFAQs: AboutUsFAQ[] = [
    {
        question: "What file types can I print through the system?",
        answer: "We support all common file formats including PNG, JPG, PDF. For specialty formats, please contact our support team.",
    },
    {
        question: "How much does printing cost per page?",
        answer: "Our standard printing rate is 2 RP (Rupees) per page for black and white. Color printing and specialty papers are available at different rates shown in our pricing calculator.",
    },
    {
        question: "What is the cost for black & white printing?",
        answer: "Black and white prints are charged at ₹2.5 per page.",
    },
    {
        question: "What is the cost for color printing?",
        answer: "Color prints are charged at ₹10 per page. Please note that color printing is available for single-sided pages only.",
    },
    {
        question: "Is there an option for double-sided color printing?",
        answer: "No, color printing is limited to single-sided only.",
    },
    {
        question: "What is the cost of binding?",
        answer: "Binding is charged at ₹35 per binding.",
    },
    {
        question: "How do I log in to the system?",
        answer: "You can authenticate using your Google account for single sign-on convenience, or create a dedicated account with your work email for additional security options.",
    },
    {
        question: "Can I check my past print history?",
        answer: "Yes, your dashboard maintains a complete history of all your print requests including dates, document types, quantities, and costs for easy reference and reimbursement.",
    },
    {
        question: "Is there a limit to file size I can upload?",
        answer: "You can upload files up to 100MB. For larger documents, we recommend sending the files to us on whatsapp at +91 8879662240.",
    },
    {
        question: "How quickly can I get my documents after submitting?",
        answer: "Standard requests are processed within 1 business day. Rush printing (50% surcharge) is available for 2-hour turnaround during business hours.",
    },
    {
        question: "How secure is my document storage?",
        answer: "All documents are stored in secure cloud storage with version history, ensuring your sensitive information is protected while remaining accessible when you need it.",
    },
    {
        question: "Is the system mobile-friendly?",
        answer: "Absolutely. Our platform is fully responsive, allowing you to request and approve documents from any device, whether you're in the office or on the go.",
    },
];

export const AboutUsFeatures: AboutUsFeature[] = [
    {
        title: "Smart Request System",
        description: "Intuitive forms with auto-fill and templates.",
        image: Post,
    },
    {
        title: "Product Catalog",
        description: "Explore our complete range of items.",
        image: OnlineShopping,
    },
    {
        title: "Mobile Ready",
        description: "Request and approve from any device.",
        image: MobilePhone,
    },
    {
        title: "Role-Based Access Control",
        description: "Granular permissions for document access.",
        image: UserProfile,
    },
    {
        title: "Secure Cloud Storage",
        description: "Encrypted storage with version history.",
        image: DataCloud,
    },
    {
        title: "Session Management",
        description: "Auto-timeout with activity monitoring.",
        image: DataVisualization,
    },
];

import { IconType } from "react-icons";
import {
    LuHouse,
    LuCalendarRange,
    LuPlus,
    LuUser,
    LuHistory,
    LuFileText,
    LuShield,
    LuMail,
    LuSettings,
} from "react-icons/lu";
import { RiInformationLine } from "react-icons/ri";

type NavbarLink = {
    text: string;
    icon: IconType;
    href: string;
    isPrimaryLink?: boolean;
};

export const NavbarLinks: NavbarLink[] = [
    {
        text: "Home",
        icon: LuHouse,
        href: "/",
        isPrimaryLink: true,
    },
    {
        text: "Prints Queue",
        icon: LuCalendarRange,
        href: "/prints-queue",
        isPrimaryLink: true,
    },
    {
        text: "Upload Files",
        icon: LuPlus,
        href: "/upload-files",
        isPrimaryLink: true,
    },
    {
        text: "History",
        icon: LuHistory,
        href: "/user/history",
        isPrimaryLink: true,
    },
    {
        text: "Profile",
        icon: LuUser,
        href: "/user",
        isPrimaryLink: true,
    },
    {
        text: "About Us",
        icon: RiInformationLine,
        href: "/about-us",
        isPrimaryLink: false,
    },
    {
        text: "Contact Us",
        icon: LuMail,
        href: "/contact-us",
        isPrimaryLink: false,
    },
    {
        text: "Terms Of Service",
        icon: LuFileText,
        href: "/terms-of-service",
        isPrimaryLink: false,
    },
    {
        text: "Privacy Policy",
        icon: LuShield,
        href: "/privacy-policy",
        isPrimaryLink: false,
    },
    {
        text: "Admin",
        icon: LuSettings,
        href: "/admin",
        isPrimaryLink: false,
    },
    // {
    //     text: "Login",
    //     icon: LuLogIn,
    //     href: "/authentication",
    //     isPrimaryLink: true,
    // },
];

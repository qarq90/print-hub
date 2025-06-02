import { IconType } from "react-icons";
import {
    LuHouse,
    LuCalendarRange,
    LuPlus,
    LuUser,
    LuHistory,
    LuMail,
    LuLogIn,
} from "react-icons/lu";
import {
    RiTerminalBoxLine,
    RiShieldKeyholeLine,
    RiInformationLine,
} from "react-icons/ri";
import { BiCog } from "react-icons/bi";

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
        text: "Today's Queue",
        icon: LuCalendarRange,
        href: "/todays-queue",
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
        icon: RiTerminalBoxLine,
        href: "/terms-of-service",
        isPrimaryLink: false,
    },
    {
        text: "Privacy Policy",
        icon: RiShieldKeyholeLine,
        href: "/privacy-policy",
        isPrimaryLink: false,
    },
    {
        text: "Admin",
        icon: BiCog,
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

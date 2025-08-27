import { IconType } from "react-icons";
import { FiPackage } from "react-icons/fi";
import {
    LuHouse,
    LuFileText,
    LuMail,
    LuPlus,
    LuCalendarDays,
    LuUserCog,
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
        icon: LuCalendarDays,
        href: "/prints-queue",
        isPrimaryLink: true,
    },
    {
        text: "Orders",
        icon: FiPackage,
        href: "/orders",
        isPrimaryLink: true,
    },
    {
        text: "New",
        icon: LuPlus,
        href: "/new/print",
        isPrimaryLink: true,
    },
    // {
    //     text: "Profile",
    //     icon: LuUser,
    //     href: "/user/prints",
    //     isPrimaryLink: true,
    // },
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
        text: "Policies",
        icon: LuFileText,
        href: "/policies",
        isPrimaryLink: false,
    },
    {
        text: "Users",
        icon: LuUserCog,
        href: "/users",
        isPrimaryLink: false,
    },
];

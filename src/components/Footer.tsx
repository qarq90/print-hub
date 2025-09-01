"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
    const pathname = usePathname();
    const isAuthPage = pathname.endsWith("/authentication");

    return (
        <footer className="w-full h-fit text-center pb-20 md:pb-4 px-6 md:px-0 text-base">
            {isAuthPage ? (
                <>
                    By continuing, you agree to our{" "}
                    <Link href="/terms-of-service" className="text-accent">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-accent">
                        Privacy Policy
                    </Link>
                    .<br />© {new Date().getFullYear()} Print Hub. All rights
                    reserved.
                </>
            ) : (
                <>
                    Read our{" "}
                    <Link href="/terms-of-service" className="text-accent">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-accent">
                        Privacy Policy
                    </Link>
                    <br /> Need help?{" "}
                    <Link href="/contact-us" className="text-accent">
                        Contact support
                    </Link>{" "}
                    |{" "}
                    <Link href="/about-us" className="text-accent">
                        About us
                    </Link>
                    <br />© {new Date().getFullYear()} Print Hub. All rights
                    reserved.
                </>
            )}
        </footer>
    );
};

import Link from "next/link";
import { Text } from "@/components/ui/text";

export const Footer = () => {
    return (
        <>
            <div className="my-6 pt-6 border-t border-foreground/25">
                <Text size="base">
                    If you have any questions about these Terms, please{" "}
                    <Link href="/contact" className="text-accent">
                        contact us
                    </Link>
                    .
                </Text>
            </div>
        </>
    )
}
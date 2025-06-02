import Image from "next/image";
import { AboutUsFeatures } from "@/data/about-us";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils"

export const Features = () => {
    return (
        <>
            <section className="flex flex-col justify-center items-center gap-4">
                <Text size="3xl" weight="bold">
                    Our Technology Solution
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-0">
                    {AboutUsFeatures.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={cn(
                                "flex justify-center items-center gap-4 p-2 rounded-md",
                                index % 2 === 0
                                    ? "flex-row md:gap-10"
                                    : "flex-row-reverse"
                            )}
                        >
                            <div className="relative h-48 w-48 mb-3">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    className="object-contain"
                                    fill
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Text size="xl" weight="bold">
                                    {feature.title}
                                </Text>
                                <Text size="base">
                                    {feature.description}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
import { PrivacySections } from "@/data/privacy-policy";
import { Text } from "@/components/ui/text";

export const PrivacyPolicySections = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-10">
                {PrivacySections.map((section, index) => (
                    <section key={index} className="text-left flex flex-col gap-2 ">
                        <Text weight="bold">{section.title}</Text>
                        <Text size="base" className="text-justify">{section.content}</Text>
                    </section>
                ))}
            </div>
        </>
    )
}
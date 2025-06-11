import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Text } from "@/components/ui/text";
import { AboutUsFAQs } from "@/data/about-us";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const FAQSection = () => {
    return (
        <>
            <Text size="3xl" weight="bold">FAQs</Text>
            <div className="grid grid-cols-1 gap-4 mt-2 mb-12">
                {AboutUsFAQs.map((faq, index) => (
                    <div key={index}>
                        <Accordion
                            key={index}
                            className="rounded-md md:px-0 px-4"
                            type="single"
                            collapsible
                        >
                            <AccordionItem value={`item-${index}`} className="cursor-pointer">
                                <AccordionTrigger className="hover:no-underline cursor-pointer">
                                    <Text size="base" className="cursor-pointer">
                                        {faq.question}
                                    </Text>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        {
                            index < AboutUsFAQs.length - 1 && (
                                <Separator className="my-4" key={index + 1} />
                            )
                        }
                    </div>
                ))}
            </div>
        </>
    );
};
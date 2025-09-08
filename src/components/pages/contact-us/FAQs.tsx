import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Text } from "@/components/ui/text";
import { AboutUsFAQs } from "@/data/about-us";
import React from "react";

export const FAQSection = () => {
    return (
        <>
            <Text size="3xl" weight="bold">FAQs</Text>
            <div className="flex flex-row gap-4 w-full">
                <Accordion
                    type="single"
                    collapsible
                    className="rounded-md md:px-0 px-4 mt-2 mb-12 w-1/2"
                >
                    {AboutUsFAQs.map((faq, index) => (
                        index % 2 == 1 && (
                            <React.Fragment key={index}>
                                <AccordionItem value={`item-${index}`} className="rounded-md cursor-pointer mb-3" background={true}>
                                    <AccordionTrigger className="hover:no-underline cursor-pointer">
                                        <Text size="base" className="cursor-pointer">
                                            {faq.question}
                                        </Text>
                                    </AccordionTrigger>
                                    <AccordionContent padding={true}>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </React.Fragment>
                        )
                    ))}
                </Accordion>
                <Accordion
                    type="single"
                    collapsible
                    className="rounded-md md:px-0 px-4 mt-2 mb-12 w-1/2"
                >
                    {AboutUsFAQs.map((faq, index) => (
                        index % 2 == 0 && (
                            <React.Fragment key={index}>
                                <AccordionItem value={`item-${index}`} className="rounded-md cursor-pointer mb-3" background={true}>
                                    <AccordionTrigger className="hover:no-underline cursor-pointer">
                                        <Text size="base" className="cursor-pointer">
                                            {faq.question}
                                        </Text>
                                    </AccordionTrigger>
                                    <AccordionContent padding={true}>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </React.Fragment>
                        )
                    ))}
                </Accordion>
            </div>
        </>
    );
};

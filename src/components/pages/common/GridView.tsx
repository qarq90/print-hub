import React, { useState } from 'react';
import { Details } from './Details';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { LuUser, LuCalendarDays } from "react-icons/lu";
import { DocumentType } from "@/interfaces/Document";

interface GridViewProps {
    documentResult: DocumentType[];
    page_type: "user_history" | "todays_queue";
}

export const GridView: React.FC<GridViewProps> = ({ documentResult, page_type }) => {
    const [selectedDoc, setSelectedDoc] = useState<DocumentType | null>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-lime-500';
            case 'cancelled':
                return 'bg-red-500';
            case 'pending':
                return 'bg-yellow-300';
            default:
                return 'bg-gray-300';
        }
    };

    const handleRowClick = (doc: DocumentType) => {
        setSelectedDoc(doc);
    };

    const handleCloseDetails = () => {
        setSelectedDoc(null);
    };

    const groupedDocuments = documentResult.reduce((acc, doc) => {
        const groupKey = page_type === "todays_queue" ? (doc.user_name ? doc.user_name : "") : (doc.uploaded_at ? doc.uploaded_at : "");
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(doc);
        return acc;
    }, {} as Record<string, DocumentType[]>);

    const groupEntries = Object.entries(groupedDocuments);

    return (
        <div className="mb-10 transition-colors">
            {groupEntries.map(([groupKey, docs], index) => (
                <div className="flex flex-col gap-4" key={groupKey}>
                    <Accordion type="single" className="md:px-0 px-2" collapsible>
                        <AccordionItem value="groupKey">
                            <AccordionTrigger className="font-bold cursor-pointer text-lg transition-colors text-foreground sticky top-0 backdrop-blur-sm z-10">
                                <div className="flex gap-2 items-center">
                                    <span>
                                        {page_type === "user_history" ? (
                                            <LuCalendarDays size={24} />
                                        ) : (
                                            <LuUser size={24} />
                                        )}
                                    </span>
                                    {groupKey}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-4">
                                {docs.map((item, itemIndex) => (
                                    <div
                                        key={`${groupKey}-${itemIndex}`}
                                        className="hover:bg-foreground/10 cursor-pointer transition-colors rounded-lg border border-foreground/10 shadow-sm overflow-hidden hover:shadow-md"
                                        onClick={() => handleRowClick(item)}
                                    >
                                        <div className="p-4">
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="truncate">
                                                    <h3 className="text-lg font-medium text-foreground truncate">
                                                        {item.file_name}
                                                    </h3>
                                                    <p className="text-sm text-foreground/70">
                                                        {item.file_type}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`h-3 w-3 mt-2 rounded-full flex-shrink-0 ${getStatusColor(item.print_status)}`}
                                                    aria-label={item.print_status}
                                                />
                                            </div>

                                            <div className="mt-4 space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">User :</span>
                                                    <span className="text-foreground font-medium">{item.user_name}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Pages :</span>
                                                    <span className="text-foreground font-medium">{item.page_count}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Copies :</span>
                                                    <span className="text-foreground font-medium">{item.print_count}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    {index < groupEntries.length - 1 && (
                        <Separator className="mb-4" />
                    )}
                </div>
            ))}

            {selectedDoc && (
                <Details
                    doc={selectedDoc}
                    onClose={handleCloseDetails}
                />
            )}
        </div>
    );
};
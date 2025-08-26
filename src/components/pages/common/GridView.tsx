import React, { useState } from 'react';
import { Details } from './Details';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { LuUser, LuCalendarDays, LuIndianRupee } from "react-icons/lu";
import { PrintRecord } from "@/interfaces/Document";
import { cn } from '@/lib/utils';

interface GridViewProps {
    documentResult: PrintRecord[];
    page_type: "user_history" | "prints_queue" | "admin_page";
}

export const GridView: React.FC<GridViewProps> = ({ documentResult, page_type }) => {
    const [selectedDoc, setSelectedDoc] = useState<PrintRecord | null>(null);

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

    const handleRowClick = (doc: PrintRecord) => {
        setSelectedDoc(doc);
    };

    const handleCloseDetails = () => {
        setSelectedDoc(null);
    };

    const groupedDocuments = documentResult.reduce((acc, doc) => {
        const groupKey = page_type === "prints_queue" ? (doc['user-name'] ? doc['user-name'] : "") : (doc['uploaded-at'] ? doc['uploaded-at'] : "");
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(doc);
        return acc;
    }, {} as Record<string, PrintRecord[]>);

    const groupEntries = Object.entries(groupedDocuments);

    const calculateCost = (doc: PrintRecord) => {
        const costPerPage = doc['print-color'] === "colored" ? 10 : 2;
        return costPerPage * doc['page-count'] * doc['print-count'];
    };

    return (
        <div className="mb-10 transition-colors">
            {groupEntries.map(([groupKey, docs], index) => (
                <div className="flex flex-col gap-4" key={groupKey}>
                    <Accordion type="single" className="md:px-0 px-2" collapsible>
                        <AccordionItem value="groupKey">
                            <AccordionTrigger className="font-bold cursor-pointer text-lg transition-colors text-foreground sticky top-0 backdrop-blur-sm z-10">
                                <div className="flex gap-2 items-center">
                                    <span>
                                        {
                                            page_type === "user_history" ? (
                                                <LuCalendarDays size={24} />
                                            ) : (
                                                <LuUser size={24} />
                                            )
                                        }
                                    </span>
                                    {groupKey}
                                    {
                                        page_type !== "prints_queue" && (
                                            <span className="md:ml-72 flex items-center gap-1">
                                                <div className="block md:hidden">
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                </div>
                                                Total : {docs.reduce((sum, doc) => sum + calculateCost(doc), 0)} <LuIndianRupee />
                                            </span>
                                        )
                                    }
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-4">
                                {docs.map((item, itemIndex) => (
                                    <div
                                        key={`${groupKey}-${itemIndex}`}
                                        className={cn("hover:bg-foreground/5 transition-colors rounded-lg border border-foreground/10 shadow-sm overflow-hidden hover:shadow-md", page_type !== "prints_queue" && "cursor-pointer")}
                                        onClick={() => handleRowClick(item)}
                                    >
                                        <div className="p-4">
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="truncate">
                                                    <h3 className="text-lg font-medium text-foreground truncate">
                                                        {item['file-name']}
                                                    </h3>
                                                    <p className="text-sm text-foreground/70">
                                                        {item['file-type']}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`h-3 w-3 mt-2 rounded-full flex-shrink-0 ${getStatusColor(item['print-status'])}`}
                                                    aria-label={item['print-status']}
                                                />
                                            </div>

                                            <div className="mt-2 space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Pages :</span>
                                                    <span className="text-foreground font-medium">{item['page-count']}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Copies :</span>
                                                    <span className="text-foreground font-medium">{item['print-count']}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Color :</span>
                                                    <span className="text-foreground font-medium">{item['print-color'] === "b/w" ? "Black & White" : "Colored"}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Sided :</span>
                                                    <span className="text-foreground font-medium">{item['print-type'] === "double_side" ? "Double Side" : "Single Side"}</span>
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
                    page_type={page_type}
                />
            )}
        </div>
    );
};
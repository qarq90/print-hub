import React, { useState } from 'react';
import { Details } from './Details';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LuUser, LuCalendarDays, LuIndianRupee } from "react-icons/lu";
import { PrintRecord } from "@/interfaces/Print";
import { cn } from '@/lib/utils';
import { EmptyHistory } from '@/components/empty/EmptyHistory';
import { getEmptyStateConfig } from '@/functions/orders';
import { truncateText } from '@/functions/utility';

interface GridViewProps {
    statusType?: "all" | "cancelled" | "completed" | "pending";
    documentResult: PrintRecord[];
    page_type: "user_history" | "prints_queue" | "admin_page" | "shopkeeper_page";
}

export const GridView: React.FC<GridViewProps> = ({ statusType, documentResult, page_type }) => {
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
        const groupKey = (page_type === "prints_queue" || page_type === "shopkeeper_page") ? (doc.user_name ? doc.user_name : "") : (doc.uploaded_at ? doc.uploaded_at : "");
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(doc);
        return acc;
    }, {} as Record<string, PrintRecord[]>);

    let groupEntries = Object.entries(groupedDocuments);

    if (page_type !== "prints_queue") {
        groupEntries = groupEntries.sort(([a], [b]) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateB.getTime() - dateA.getTime();
        });
    }

    const calculateCost = (doc: PrintRecord) => {
        let costPerPage = doc.print_color === "colored" ? 10 : 2.5;
        if (doc.binding_type === "bind") costPerPage += 30;
        return costPerPage * doc.page_count * doc.print_count;
    };

    if (documentResult.length === 0) {
        const { title, description } = getEmptyStateConfig(page_type, statusType || "all");

        return (
            <div className="my-8 flex flex-col text-left">
                <EmptyHistory description={description} title={title} />
            </div>
        );
    }

    return (
        <div className="mb-10 transition-colors flex flex-col">
            {groupEntries.map(([groupKey, docs]) => (
                <div className="flex flex-col" key={groupKey}>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="groupKey">
                            <AccordionTrigger className="border bg-gray-500/5 border-foreground/10 shadow-md rounded-md font-bold cursor-pointer text-lg transition-colors text-foreground sticky top-0 backdrop-blur-sm z-10">
                                <div className="md:grid md:grid-cols-4 items-center w-full">
                                    <div className="flex flex-row gap-2 col-span-2 items-center">
                                        <span>
                                            {page_type === "user_history" ? (
                                                <LuCalendarDays size={24} />
                                            ) : (
                                                <LuUser size={24} />
                                            )}
                                        </span>
                                        {truncateText(groupKey)}
                                    </div>
                                    {(page_type !== "prints_queue" && page_type !== "shopkeeper_page") && (
                                        <div className="md:flex hidden justify-center items-center gap-1">
                                            Total: {docs.reduce((sum, doc) => sum + calculateCost(doc), 0)} <LuIndianRupee />
                                        </div>
                                    )}
                                    <div></div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                {docs.map((item, itemIndex) => (
                                    <div
                                        key={`${groupKey}-${itemIndex}`}
                                        className={cn("hover:bg-foreground/5 shadow-md transition-colors rounded-lg border border-foreground/10 overflow-hidden hover:shadow-md", page_type !== "prints_queue" && "cursor-pointer")}
                                        onClick={() => handleRowClick(item)}
                                    >
                                        <div className="p-4">
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="truncate">
                                                    <h3 className="text-lg font-medium text-foreground truncate">
                                                        {truncateText(item.file_name.split(".")[0], 18)}
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

                                            <div className="mt-2 space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Pages :</span>
                                                    <span className="text-foreground font-medium">{item.page_count}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Copies :</span>
                                                    <span className="text-foreground font-medium">{item.print_count}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Color :</span>
                                                    <span className="text-foreground font-medium">{item.print_color === "b/w" ? "Black & White" : "Colored"}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Sided :</span>
                                                    <span className="text-foreground font-medium">{item.print_type === "double_side" ? "Double Side" : "Single Side"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
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
import React, { useState } from 'react';
import { LuEllipsisVertical, LuUser, LuCalendarDays, LuIndianRupee } from "react-icons/lu";
import { Details } from './Details';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PrintRecord } from "@/interfaces/Print";
import { cn } from '@/lib/utils';
import { EmptyHistory } from '@/components/empty/EmptyHistory';
import { getEmptyStateConfig } from '@/functions/orders';
import { truncateText } from '@/functions/utility';

interface TableViewProps {
    statusType?: "all" | "cancelled" | "completed" | "pending";
    documentResult: PrintRecord[];
    page_type: "user_history" | "prints_queue" | "admin_page" | "shopkeeper_page"
}

export const TableView: React.FC<TableViewProps> = ({ statusType, documentResult, page_type }) => {
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
        const costPerPage = doc.print_color === "colored" ? 10 : 2.5;
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
                        <AccordionItem value={groupKey}>
                            <AccordionTrigger className="border bg-gray-500/5 border-foreground/10 shadow-md rounded-md font-bold cursor-pointer text-lg transition-colors text-foreground sticky top-0 backdrop-blur-sm z-10">
                                <div className="grid grid-cols-4 items-center w-full">
                                    <div className="flex gap-2 col-span-2 items-center">
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
                            <AccordionContent className="rounded-md border border-foreground/10 mb-4">
                                <table className="w-full caption-bottom text-sm shadow-md">
                                    <thead className="[&_tr]:border-b [&_tr]:border-foreground/10 transition-colors">
                                        <tr className="hover:bg-background">
                                            {page_type === "user_history" && (
                                                <th className="h-12 px-4 text-left align-middle text-foreground font-bold">
                                                    User
                                                </th>
                                            )}
                                            <th className="h-12 px-4 text-left align-middle text-foreground font-bold">
                                                File Name
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                Type
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                Pages
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                Copies
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                Status
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                Color
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                Sided
                                            </th>
                                            {
                                                page_type !== "prints_queue" && (
                                                    <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                    </th>
                                                )
                                            }
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0 [&_tr:last-child]:rounded-b-md">
                                        {docs.map((item, index) => (
                                            <tr
                                                key={index}
                                                className={cn("border-b border-foreground/10 transition-colors hover:bg-foreground/10", page_type !== "prints_queue" && "cursor-pointer")}
                                                onClick={() => handleRowClick(item)}
                                            >
                                                {page_type === "user_history" && (
                                                    <td className="p-4 align-middle">
                                                        <div className="flex flex-col">
                                                            <div className="font-medium text-foreground">{item.user_name}</div>
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="p-4 align-middle text-foreground">
                                                    {item.file_name}
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    <span className="rounded-full px-2 py-1">
                                                        {item.file_type}
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    {item.page_count}
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    {item.print_count}
                                                </td>
                                                <td className="p-4 align-middle text-center">
                                                    <div className={`inline-block h-3 w-3 rounded-full ${getStatusColor(item.print_status)}`} />
                                                </td>
                                                <td className="p-4 align-middle text-center">
                                                    {item.print_color === "b/w" ? "B/W" : "Colored"}
                                                </td>
                                                <td className="p-4 align-middle text-center">
                                                    {item.print_type === "double_side" ? "Double" : "Single"}
                                                </td>
                                                {
                                                    page_type !== "prints_queue" && (
                                                        <td className="p-4 align-middle text-foreground cursor-pointer">
                                                            <LuEllipsisVertical />
                                                        </td>
                                                    )
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
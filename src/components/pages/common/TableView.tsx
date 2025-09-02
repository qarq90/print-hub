import React, { useState } from 'react';
import { LuEllipsisVertical, LuUser, LuCalendarDays, LuIndianRupee } from "react-icons/lu";
import { Details } from './Details';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { PrintRecord } from "@/interfaces/Print";
import { cn } from '@/lib/utils';

interface TableViewProps {
    documentResult: PrintRecord[];
    page_type: "user_history" | "prints_queue" | "admin_page" | "shopkeeper_page"
}

export const TableView: React.FC<TableViewProps> = ({ documentResult, page_type }) => {
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
        const groupKey = (page_type === "prints_queue" || page_type === "shopkeeper_page") ? (doc['user-name'] ? doc['user-name'] : "") : (doc['uploaded-at'] ? doc['uploaded-at'] : "");
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(doc);
        return acc;
    }, {} as Record<string, PrintRecord[]>);

    let groupEntries = Object.entries(groupedDocuments);

    if (page_type === "user_history" || page_type === "admin_page") {
        groupEntries = groupEntries.sort(([a], [b]) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateB.getTime() - dateA.getTime();
        });
    }

    const calculateCost = (doc: PrintRecord) => {
        const costPerPage = doc['print-color'] === "colored" ? 10 : 2;
        return costPerPage * doc['page-count'] * doc['print-count'];
    };

    return (
        <div className="mb-10 transition-colors">
            {groupEntries.map(([groupKey, docs], index) => (
                <div className="flex flex-col gap-4" key={groupKey}>
                    <Accordion type="single" collapsible>
                        <AccordionItem value={groupKey}>
                            <AccordionTrigger className="font-bold cursor-pointer text-lg transition-colors text-foreground sticky top-0 backdrop-blur-sm z-10">
                                <div className="flex gap-2 items-center">
                                    <span>
                                        {page_type === "user_history" ? <LuCalendarDays size="24" /> : <LuUser size="24" />}
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
                            <AccordionContent className="rounded-md border border-foreground/10 mb-6 mt-4">
                                <table className="w-full caption-bottom text-sm">
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
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {docs.map((item, index) => (
                                            <tr
                                                key={index}
                                                className={cn("border-b border-foreground/10 transition-colors hover:bg-foreground/10", page_type !== "prints_queue" && "cursor-pointer")}
                                                onClick={() => handleRowClick(item)}
                                            >
                                                {page_type === "user_history" && (
                                                    <td className="p-4 align-middle">
                                                        <div className="flex flex-col">
                                                            <div className="font-medium text-foreground">{item['user-name']}</div>
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="p-4 align-middle text-foreground">
                                                    {item['file-name']}
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    <span className="rounded-full px-2 py-1">
                                                        {item['file-type']}
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    {item['page-count']}
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    {item['print-count']}
                                                </td>
                                                <td className="p-4 align-middle text-center">
                                                    <div className={`inline-block h-3 w-3 rounded-full ${getStatusColor(item['print-status'])}`} />
                                                </td>
                                                <td className="p-4 align-middle text-center">
                                                    {item['print-color'] === "b/w" ? "B/W" : "Colored"}
                                                </td>
                                                <td className="p-4 align-middle text-center">
                                                    {item['print-type'] === "double_side" ? "Double" : "Single"}
                                                </td>
                                                <td className="p-4 align-middle text-foreground cursor-pointer">
                                                    <LuEllipsisVertical />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
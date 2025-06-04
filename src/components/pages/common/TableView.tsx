import React, { useState } from 'react';
import { LuEllipsisVertical, LuUser, LuCalendarDays } from "react-icons/lu";
import { Details } from './Details';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { DocumentType } from "@/interfaces/Document";

interface TableViewProps {
    documentResult: DocumentType[];
    page_type: "user_history" | "todays_queue"
}

export const TableView: React.FC<TableViewProps> = ({ documentResult, page_type }) => {
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
                    <Accordion type="single" collapsible>
                        <AccordionItem value={groupKey}>
                            <AccordionTrigger className="font-bold cursor-pointer text-lg transition-colors text-foreground sticky top-0 backdrop-blur-sm z-10">
                                <div className="flex gap-2 items-center">
                                    <span>
                                        {page_type === "user_history" ? <LuCalendarDays size="24" /> : <LuUser size="24" />}
                                    </span>
                                    {groupKey}
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
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {docs.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-foreground/10 transition-colors cursor-pointer hover:bg-foreground/10"
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
                />
            )}
        </div>
    );
};
import React, { useState } from 'react';
import { LuEllipsisVertical, LuUser, LuCalendarDays } from "react-icons/lu";
import { Details } from './Details';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { OrderRecord } from '@/interfaces/Order';
import { EmptyHistory } from '@/components/empty/EmptyHistory';
import { getEmptyStateConfig } from '@/functions/orders';
import { truncateText } from '@/functions/utility';

interface TableViewProps {
    statusType?: "all" | "cancelled" | "completed" | "pending" | "in-cart";
    orderResult: OrderRecord[];
    page_type: "user_history" | "order_queue" | "admin_page" | "shopkeeper_page"
}

export const TableView: React.FC<TableViewProps> = ({ statusType, orderResult, page_type }) => {
    const [selectedItem, setSelectedItem] = useState<OrderRecord | null>(null);

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

    const handleRowClick = (doc: OrderRecord) => {
        setSelectedItem(doc);
    };

    const handleCloseDetails = () => {
        setSelectedItem(null);
    };

    const calculateItemCost = (item: OrderRecord) => {
        const quantity = parseInt(item.item_quantity || '0');
        const price = item.item_price || 0;
        return quantity * price;
    };

    const groupedDocuments = orderResult.reduce((acc, doc) => {
        const groupKey = (page_type === "order_queue" || page_type === "shopkeeper_page") ?
            (doc.user_name ? doc.user_name : "") :
            (doc.ordered_at ? doc.ordered_at : "");
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(doc);
        return acc;
    }, {} as Record<string, OrderRecord[]>);

    let groupEntries = Object.entries(groupedDocuments);

    if (page_type !== "order_queue") {
        groupEntries = groupEntries.sort(([a], [b]) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateB.getTime() - dateA.getTime();
        });
    }

    if (orderResult.length === 0) {
        const { title, description } = getEmptyStateConfig(page_type, statusType || "all");

        return (
            <div className="my-8 flex flex-col text-left">
                <EmptyHistory type="orders" description={description} title={title} />
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
                                    <div></div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="rounded-md border border-foreground/10 mb-4">
                                <table className="w-full caption-bottom text-sm shadow-md">
                                    <thead className="[&_tr]:border-b [&_tr]:border-foreground/10 transition-colors">
                                        <tr className="hover:bg-background">
                                            {page_type !== "order_queue" && (
                                                <th className="h-12 px-4 text-left align-middle text-foreground font-bold">
                                                    User
                                                </th>
                                            )}
                                            <th className="h-12 px-4 text-left align-middle text-foreground font-bold">
                                                Item Name
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                Category
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                Quantity
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                Price
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                Status
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                In Cart
                                            </th>
                                            <th className="h-12 px-4 align-middle text-center text-foreground font-bold">
                                                Subtotal
                                            </th>
                                            {
                                                page_type !== "order_queue" && (
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
                                                className={cn("border-b border-foreground/10 transition-colors hover:bg-foreground/10", page_type !== "order_queue" && "cursor-pointer")}
                                                onClick={() => handleRowClick(item)}
                                            >
                                                {page_type !== "order_queue" && (
                                                    <td className="p-4 align-middle">
                                                        <div className="flex flex-col">
                                                            <div className="font-medium text-foreground">{item.user_name}</div>
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="p-4 align-middle text-foreground">
                                                    {item.item_name}
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    <span className="rounded-full px-2 py-1">
                                                        {item.item_category}
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    {item.item_quantity}
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    ₹{item.item_price}
                                                </td>
                                                <td className="p-4 align-middle text-center">
                                                    <div className={`inline-block h-3 w-3 rounded-full ${getStatusColor(item.order_status)}`} />
                                                </td>
                                                <td className="p-4 align-middle text-center">
                                                    {item.in_cart ? "Yes" : "No"}
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground font-medium">
                                                    ₹{calculateItemCost(item).toFixed(2)}
                                                </td>
                                                {
                                                    page_type !== "order_queue" && (
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

            {selectedItem && (
                <Details
                    item={selectedItem}
                    onClose={handleCloseDetails}
                    page_type={page_type}
                />
            )}
        </div>
    );
};
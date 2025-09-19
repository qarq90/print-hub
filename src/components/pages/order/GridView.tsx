import React, { useState } from 'react';
import { Details } from './Details';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LuUser, LuCalendarDays, LuIndianRupee } from "react-icons/lu";
import { cn } from '@/lib/utils';
import { OrderRecord } from '@/interfaces/Order';

interface GridViewProps {
    orderResult: OrderRecord[];
    page_type: "user_history" | "order_queue" | "admin_page" | "shopkeeper_page";
}

export const GridView: React.FC<GridViewProps> = ({ orderResult, page_type }) => {
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

    const handleRowClick = (item: OrderRecord) => {
        setSelectedItem(item);
    };

    const handleCloseDetails = () => {
        setSelectedItem(null);
    };

    const groupedDocuments = orderResult.reduce((acc, item) => {
        const groupKey = (page_type === "order_queue" || page_type === "shopkeeper_page") ? (item['user-name'] ? item['user-name'] : "") : (item['ordered-at'] ? item['ordered-at'] : "");
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(item);
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

    const truncateText = (text: string) => {
        return text.length > 18 ? `${text.substring(0, 18)}...` : text;
    };

    return (
        <div className="mb-10 transition-colors flex flex-col gap-2">
            {groupEntries.map(([groupKey, items]) => (
                <div className="flex flex-col" key={groupKey}>
                    <Accordion type="single" className="md:px-0 px-2" collapsible>
                        <AccordionItem value="groupKey">
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
                                    {(page_type !== "order_queue" && page_type !== "shopkeeper_page") && (
                                        <div className="flex justify-center items-center gap-1">
                                            Total: {items.reduce((sum, item) => sum + parseInt(item['item-quantity'] || '0'), 0)} <LuIndianRupee />
                                        </div>
                                    )}
                                    <div></div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                {items.map((item, itemIndex) => (
                                    <div
                                        key={`${groupKey}-${itemIndex}`}
                                        className={cn("hover:bg-foreground/5 shadow-md transition-colors rounded-lg border border-foreground/10 overflow-hidden hover:shadow-md", page_type !== "order_queue" && "cursor-pointer")}
                                        onClick={() => handleRowClick(item)}
                                    >
                                        <div className="p-4">
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="truncate">
                                                    <h3 className="text-lg font-medium text-foreground truncate">
                                                        {item['item-name']}
                                                    </h3>
                                                </div>
                                                <span
                                                    className={`h-3 w-3 mt-2 rounded-full flex-shrink-0 ${getStatusColor(item['order-status'])}`}
                                                    aria-label={item['order-status']}
                                                />
                                            </div>

                                            <div className="mt-2 space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Category :</span>
                                                    <span className="text-foreground font-medium">{item['item-category']}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Pages :</span>
                                                    <span className="text-foreground font-medium">{item['item-quantity']}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Quantity :</span>
                                                    <span className="text-foreground font-medium">{item['item-quantity']}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Price :</span>
                                                    <span className="text-foreground font-medium">₹ {item['item-price']}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-foreground/70">Cart :</span>
                                                    <span className="text-foreground font-medium">{item['in-cart'] === true ? "Yes" : "No"}</span>
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
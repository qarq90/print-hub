import React, { useState } from 'react';
import { LuEllipsisVertical, LuUser, LuCalendarDays } from "react-icons/lu";
import { Details } from './Details';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { OrderRecord } from '@/interfaces/Order';
import { EmptyHistory } from '@/components/empty/EmptyHistory';

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
        const quantity = parseInt(item['item-quantity'] || '0');
        const price = item['item-price'] || 0;
        return quantity * price;
    };

    const groupedDocuments = orderResult.reduce((acc, doc) => {
        const groupKey = (page_type === "order_queue" || page_type === "shopkeeper_page") ?
            (doc['user-name'] ? doc['user-name'] : "") :
            (doc['ordered-at'] ? doc['ordered-at'] : "");
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

    const truncateText = (text: string) => {
        return text.length > 18 ? `${text.substring(0, 18)}...` : text;
    };

    const getEmptyStateConfig = () => {
        if (page_type === "order_queue" || page_type === "shopkeeper_page") {
            switch (statusType) {
                case "completed":
                    return {
                        title: "No Completed Orders",
                        description: "There are no completed orders in the queue"
                    };
                case "cancelled":
                    return {
                        title: "No Cancelled Orders",
                        description: "There are no cancelled orders in the queue"
                    };
                case "pending":
                    return {
                        title: "No Pending Orders",
                        description: "The order queue is currently empty"
                    };
                case "all":
                default:
                    return {
                        title: "Empty Order Queue",
                        description: "No orders in the queue"
                    };
            }
        }

        if (page_type === "user_history") {
            switch (statusType) {
                case "completed":
                    return {
                        title: "No Completed Orders",
                        description: "You haven't completed any orders yet"
                    };
                case "cancelled":
                    return {
                        title: "No Cancelled Orders",
                        description: "You haven't cancelled any orders"
                    };
                case "pending":
                    return {
                        title: "No Pending Orders",
                        description: "You don't have any pending orders"
                    };
                case "all":
                default:
                    return {
                        title: "No Orders",
                        description: "You haven't placed any orders yet"
                    };
            }
        }

        if (page_type === "admin_page") {
            switch (statusType) {
                case "completed":
                    return {
                        title: "No Completed Orders",
                        description: "No users have completed any orders yet"
                    };
                case "cancelled":
                    return {
                        title: "No Cancelled Orders",
                        description: "No users have cancelled any orders"
                    };
                case "pending":
                    return {
                        title: "No Pending Orders",
                        description: "There are no pending orders at the moment"
                    };
                case "all":
                default:
                    return {
                        title: "No Order Records",
                        description: "No order records found in the system"
                    };
            }
        }

        return {
            title: "No Orders",
            description: "No orders found for the current selection"
        };
    };


    if (orderResult.length === 0) {
        const { title, description } = getEmptyStateConfig();

        return (
            <div className="my-8 flex flex-col text-left">
                <EmptyHistory description={description} title={title} />
            </div>
        );
    }

    return (
        <div className="mb-10 transition-colors flex flex-col gap-2">
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
                                    {/* {(page_type !== "order_queue" && page_type !== "shopkeeper_page") && (
                                        <div className="md:flex hidden justify-center items-center gap-1">
                                            Total: ₹{calculateGroupTotal(docs).toFixed(2)} <LuIndianRupee />
                                        </div>
                                    )} */}
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
                                                            <div className="font-medium text-foreground">{item['user-name']}</div>
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="p-4 align-middle text-foreground">
                                                    {item['item-name']}
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    <span className="rounded-full px-2 py-1">
                                                        {item['item-category']}
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    {item['item-quantity']}
                                                </td>
                                                <td className="p-4 align-middle text-center text-foreground">
                                                    ₹{item['item-price']}
                                                </td>
                                                <td className="p-4 align-middle text-center">
                                                    <div className={`inline-block h-3 w-3 rounded-full ${getStatusColor(item['order-status'])}`} />
                                                </td>
                                                <td className="p-4 align-middle text-center">
                                                    {item['in-cart'] ? "Yes" : "No"}
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
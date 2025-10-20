import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    LuX,
    LuUser,
    LuCalendar,
    LuClipboardList,
    LuBadgeIndianRupee,
    LuCheck,
    LuClock,
    LuTag,
    LuList,
    LuPackage,
    LuMinus,
    LuPlus,
    LuShoppingCart
} from "react-icons/lu";
import { OrderRecord } from "@/interfaces/Order";
import { cn } from "@/lib/utils"
import { FullLoader } from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { cancelOrder, checkoutOrder, completeOrder, updateOrder } from "@/functions/orders";

interface OrderDetailsProps {
    item: OrderRecord;
    onClose: () => void;
    page_type: "user_history" | "order_queue" | "admin_page" | "shopkeeper_page";
}

const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed':
            return {
                icon: <LuCheck />,
                text: "text-green-500"
            };
        case 'cancelled':
            return {
                icon: <LuX />,
                text: "text-red-500"
            };
        default:
            return {
                icon: <LuClock />,
                text: "text-yellow-500"
            };
    }
};

export const Details = ({ item, onClose, page_type }: OrderDetailsProps) => {
    const [currentOrder, setCurrentOrder] = useState(item);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const statusStyles = getStatusStyles(currentOrder.order_status);

    const calculateCost = (order: OrderRecord) => {
        const quantity = parseInt(order.item_quantity || '0');
        const price = order.item_price || 0;
        return quantity * price;
    };

    const incrementQuantity = () => {
        if (page_type === "user_history" && currentOrder.order_status === "in-cart") {
            setCurrentOrder(prev => ({
                ...prev,
                item_quantity: (parseInt(prev.item_quantity || '0') + 1).toString(),
            }));
        }
    };

    const decrementQuantity = () => {
        if (page_type === "user_history" && currentOrder.order_status === "in-cart") {
            setCurrentOrder(prev => ({
                ...prev,
                item_quantity: Math.max(1, parseInt(prev.item_quantity || '1') - 1).toString(),
            }));
        }
    };

    const updateHandler = async () => {
        setLoading(true);
        try {
            await updateOrder(currentOrder);
            router.refresh();
        } catch (error) {
            console.error("Error updating order:", error);
        } finally {
            setLoading(false);
        }
    };

    const cancelHandler = async () => {
        setLoading(true);
        try {
            await cancelOrder(currentOrder);
            router.refresh();
            onClose();
        } catch (error) {
            console.error("Error cancelling order:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkoutHandler = async () => {
        setLoading(true);
        try {
            await checkoutOrder(currentOrder);
            router.refresh();
            onClose();
        } catch (error) {
            console.error("Error placing order:", error);
        } finally {
            setLoading(false);
        }
    };

    const completeHandler = async () => {
        setLoading(true);
        try {
            await completeOrder(currentOrder);
            router.refresh();
            onClose();
        } catch (error) {
            console.error("Error completing order:", error);
        } finally {
            setLoading(false);
        }
    };

    const truncateText = (text: string) => {
        return text.length > 18 ? `${text.substring(0, 18)}...` : text;
    };

    return (
        <>
            <div
                className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-sm z-40"
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg shadow-xl z-50 w-full md:max-w-[625px] max-h-[90vh] overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 id="modal-title" className="text-lg font-semibold flex items-center gap-2">
                        <LuShoppingCart className="h-5 w-5" />
                        Order Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-foreground cursor-pointer hover:text-background transition-colors p-1 rounded-full hover:bg-foreground"
                        aria-label="Close details"
                    >
                        <LuX className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-3">
                    {
                        page_type !== "user_history" && (
                            <div className="flex justify-center items-center gap-3 my-3.5">
                                <span className="text-foreground flex-shrink-0 mt-1">
                                    <LuUser />
                                </span>
                                <div className="flex-1 flex justify-between">
                                    <span className="text-foreground">Customer:</span>
                                    <span className="font-medium text-right">
                                        {truncateText(currentOrder.user_name || "N/A")}
                                    </span>
                                </div>
                            </div>
                        )
                    }

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuTag />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Item Name:</span>
                            <span className="font-medium text-right">
                                {currentOrder.item_name}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuList />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Category:</span>
                            <span className="font-medium text-right">
                                {currentOrder.item_category}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuPackage />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Quantity:</span>
                            <span className="font-medium text-right flex gap-4 items-center justify-center">
                                {page_type === "user_history" && currentOrder.order_status === "in-cart" && (
                                    <LuMinus
                                        className={cn(
                                            "mt-1 p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm",
                                            parseInt(currentOrder.item_quantity || '0') <= 1 && "cursor-not-allowed pointer-events-none"
                                        )}
                                        size="24"
                                        onClick={decrementQuantity}
                                    />
                                )}
                                <span>{currentOrder.item_quantity}</span>
                                {page_type === "user_history" && currentOrder.order_status === "in-cart" && (
                                    <LuPlus
                                        className="mt-1 p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm"
                                        size="24"
                                        onClick={incrementQuantity}
                                    />
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuBadgeIndianRupee />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Price per Item:</span>
                            <span className="font-medium text-right">
                                ₹{currentOrder.item_price}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            {statusStyles.icon}
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Status:</span>
                            <span className={`font-medium text-right ${statusStyles.text}`}>
                                {currentOrder.order_status}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuCalendar />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Ordered At:</span>
                            <span className="font-medium text-right">
                                {currentOrder.ordered_at}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-3 my-3.5">
                        <LuClipboardList />
                        <span className="text-foreground mb-2 w-48">Instructions:</span>
                        <Textarea
                            onChange={(e) => {
                                if (
                                    page_type === "user_history" &&
                                    currentOrder.order_status === "in-cart"
                                ) {
                                    const newValue = e.target.value;
                                    setCurrentOrder(prev => ({
                                        ...prev,
                                        instructions: newValue,
                                    }));
                                }
                            }}
                            disabled={
                                page_type !== "user_history" ||
                                currentOrder.order_status !== "in-cart"
                            }
                            value={currentOrder.instructions || ""}
                            placeholder="Specific instructions for this order..."
                            className="flex-1"
                        />
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuBadgeIndianRupee />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Total Cost:</span>
                            <span className="font-medium text-right">
                                ₹ {calculateCost(currentOrder).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-row w-full gap-2 pt-3">
                        {page_type === "user_history" && currentOrder.order_status === "in-cart" && currentOrder.in_cart === true && (
                            <Button
                                variant="accent"
                                onClick={checkoutHandler}
                                className="grow"
                            >
                                Checkout
                            </Button>
                        )}

                        {(page_type === "user_history" || page_type === "admin_page") && currentOrder.order_status === "pending" && currentOrder.in_cart === false && (
                            <Button
                                variant="destructive"
                                onClick={cancelHandler}
                                className="grow"
                            >
                                Cancel
                            </Button>
                        )}

                        {page_type === "user_history" && (currentOrder.order_status === "pending" || currentOrder.order_status === "in-cart") && currentOrder.in_cart === true && (
                            <Button
                                variant="foreground"
                                onClick={updateHandler}
                                disabled={JSON.stringify(currentOrder) === JSON.stringify(item)}
                                className="grow"
                            >
                                Update
                            </Button>
                        )}

                        {page_type === "admin_page" && currentOrder.order_status === "pending" && currentOrder.in_cart === false && (
                            <Button
                                variant="foreground"
                                onClick={completeHandler}
                                className="grow"
                            >
                                Complete
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {loading && <FullLoader />}
        </>
    );
};
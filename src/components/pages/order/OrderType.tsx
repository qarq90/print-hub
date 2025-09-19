import { Text } from "@/components/ui/text";
import { LuList, LuFileText, LuPalette, LuPencil, LuScissors } from "react-icons/lu";
import { cn } from "@/lib/utils";

type Order = "Paper" | "Writing" | "Art" | "Accessories" | "all";

interface OrderTypeProps {
    orderType: Order;
    setOrderType: React.Dispatch<React.SetStateAction<Order>>;
}

export const OrderType = ({ orderType, setOrderType }: OrderTypeProps) => {
    return (
        <div className="md:mb-10 flex flex-row justify-around md:gap-4 w-full md:w-fit items-center">
            <div
                className={cn(
                    "flex flex-row items-center cursor-pointer rounded-lg transition-colors",
                    orderType === "all" && "bg-blue-500/10"
                )}
                onClick={() => setOrderType("all")}
            >
                <LuList
                    size="36"
                    className={cn(
                        "py-1.5 pl-1.5 rounded-sm",
                        orderType === "all" && "text-blue-500"
                    )}
                />
                <Text className={cn(
                    "text-sm pr-3 pl-1 rounded-md hidden md:block",
                    orderType === "all" && "text-blue-500 font-medium"
                )}>
                    All
                </Text>
            </div>

            <div
                className={cn(
                    "flex flex-row items-center cursor-pointer rounded-lg transition-colors",
                    orderType === "Paper" && "bg-red-500/10"
                )}
                onClick={() => setOrderType("Paper")}
            >
                <LuFileText
                    size="36"
                    className={cn(
                        "py-1.5 pl-1.5 rounded-sm",
                        orderType === "Paper" && "text-red-500"
                    )}
                />
                <Text className={cn(
                    "text-sm pr-3 pl-1 rounded-md hidden md:block",
                    orderType === "Paper" && "text-red-500 font-medium"
                )}>
                    Paper
                </Text>
            </div>

            <div
                className={cn(
                    "flex flex-row items-center cursor-pointer rounded-lg transition-colors",
                    orderType === "Art" && "bg-green-500/10"
                )}
                onClick={() => setOrderType("Art")}
            >
                <LuPalette
                    size="36"
                    className={cn(
                        "py-1.5 pl-1.5 rounded-sm",
                        orderType === "Art" && "text-green-500"
                    )}
                />
                <Text className={cn(
                    "text-sm pr-3 pl-1 rounded-md hidden md:block",
                    orderType === "Art" && "text-green-500 font-medium"
                )}>
                    Art
                </Text>
            </div>

            <div
                className={cn(
                    "flex flex-row items-center cursor-pointer rounded-lg transition-colors",
                    orderType === "Writing" && "bg-yellow-500/10"
                )}
                onClick={() => setOrderType("Writing")}
            >
                <LuPencil
                    size="36"
                    className={cn(
                        "py-1.5 pl-1.5 rounded-sm",
                        orderType === "Writing" && "text-yellow-500"
                    )}
                />
                <Text className={cn(
                    "text-sm pr-3 pl-1 rounded-md hidden md:block",
                    orderType === "Writing" && "text-yellow-500 font-medium"
                )}>
                    Writing
                </Text>
            </div>

            <div
                className={cn(
                    "flex flex-row items-center cursor-pointer rounded-lg transition-colors",
                    orderType === "Accessories" && "bg-purple-500/10"
                )}
                onClick={() => setOrderType("Accessories")}
            >
                <LuScissors
                    size="36"
                    className={cn(
                        "py-1.5 pl-1.5 rounded-sm",
                        orderType === "Accessories" && "text-purple-500"
                    )}
                />
                <Text className={cn(
                    "text-sm pr-3 pl-1 rounded-md hidden md:block",
                    orderType === "Accessories" && "text-purple-500 font-medium"
                )}>
                    Accessories
                </Text>
            </div>
        </div>
    );
};
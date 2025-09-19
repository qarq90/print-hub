import { Text } from "@/components/ui/text";
import { LuX, LuCheck, LuClock, LuList } from "react-icons/lu";
import { cn } from "@/lib/utils";

type Status = "all" | "cancelled" | "completed" | "pending" | "in-cart";

interface StatusTypeProps {
    statusType: Status;
    setStatusType: React.Dispatch<React.SetStateAction<Status>>;
}

export const StatusType = ({ statusType, setStatusType }: StatusTypeProps) => {
    return (
        <div className="md:mb-4 md:flex hidden flex-row justify-around md:gap-4 w-full md:w-fit items-center">
            <div
                className={cn(
                    "flex flex-row items-center cursor-pointer rounded-lg transition-colors",
                    statusType === "all" && "bg-blue-500/10"
                )}
                onClick={() => setStatusType("all")}
            >
                <LuList
                    size="36"
                    className={cn(
                        "py-1.5 pl-1.5 rounded-sm",
                        statusType === "all" && "text-blue-500"
                    )}
                />
                <Text className={cn(
                    "text-sm pr-3 pl-1 rounded-md hidden md:block",
                    statusType === "all" && "text-blue-500 font-medium"
                )}>
                    All
                </Text>
            </div>

            <div
                className={cn(
                    "flex flex-row items-center cursor-pointer rounded-lg transition-colors",
                    statusType === "cancelled" && "bg-red-500/10"
                )}
                onClick={() => setStatusType("cancelled")}
            >
                <LuX
                    size="36"
                    className={cn(
                        "py-1.5 pl-1.5 rounded-sm",
                        statusType === "cancelled" && "text-red-500"
                    )}
                />
                <Text className={cn(
                    "text-sm pr-3 pl-1 rounded-md hidden md:block",
                    statusType === "cancelled" && "text-red-500 font-medium"
                )}>
                    Cancelled
                </Text>
            </div>

            <div
                className={cn(
                    "flex flex-row items-center cursor-pointer rounded-lg transition-colors",
                    statusType === "completed" && "bg-green-500/10"
                )}
                onClick={() => setStatusType("completed")}
            >
                <LuCheck
                    size="36"
                    className={cn(
                        "py-1.5 pl-1.5 rounded-sm",
                        statusType === "completed" && "text-green-500"
                    )}
                />
                <Text className={cn(
                    "text-sm pr-3 pl-1 rounded-md hidden md:block",
                    statusType === "completed" && "text-green-500 font-medium"
                )}>
                    Completed
                </Text>
            </div>

            <div
                className={cn(
                    "flex flex-row items-center cursor-pointer rounded-lg transition-colors",
                    statusType === "pending" && "bg-yellow-500/10"
                )}
                onClick={() => setStatusType("pending")}
            >
                <LuClock
                    size="36"
                    className={cn(
                        "py-1.5 pl-1.5 rounded-sm",
                        statusType === "pending" && "text-yellow-500"
                    )}
                />
                <Text className={cn(
                    "text-sm pr-3 pl-1 rounded-md hidden md:block",
                    statusType === "pending" && "text-yellow-500 font-medium"
                )}>
                    Pending
                </Text>
            </div>
        </div>
    );
};
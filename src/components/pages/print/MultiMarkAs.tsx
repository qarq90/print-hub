import { Text } from "@/components/ui/text";
import { LuX, LuCheck, LuIndianRupee } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { PrintRecord } from "@/interfaces/Print";
import { useState } from "react";
import { deleteFromPinata } from "@/functions/pinata";
import { cancelDocument, checkExistingHash, completeDocument, paidDocument } from "@/functions/prints";
import { useRouter } from "next/navigation";
import { FullLoader } from "@/components/ui/loader";

interface MultiMarkAsProps {
    selectedPrints: PrintRecord[]
    setSelectedPrints: React.Dispatch<React.SetStateAction<PrintRecord[]>>;
    isAdminPage?: boolean;
}

export const MultiMarkAs = ({ selectedPrints, setSelectedPrints, isAdminPage }: MultiMarkAsProps) => {

    const [processing, setProcessing] = useState<boolean>(false);

    const router = useRouter();

    const handleMarkAsComplete = async () => {
        if (selectedPrints.length === 0) return;

        setProcessing(true);
        try {
            await Promise.all(selectedPrints.map(async (print) => {
                await completeDocument(print);
                await deleteFromPinata(print);
            }));
        } catch (error) {
            console.error("Error marking as complete:", error);
        } finally {
            setProcessing(false);
            setSelectedPrints([]);
            router.refresh();
        }
    }

    const handleMarkAsCancelled = async () => {
        if (selectedPrints.length === 0) return;

        setProcessing(true);
        try {
            await Promise.all(selectedPrints.map(async (print) => {
                const result = await checkExistingHash(print);
                if (result.numberOfRows === 1) {
                    await deleteFromPinata(print);
                }
                await cancelDocument(print);
            }));
        } catch (error) {
            console.error("Error marking as cancelled:", error);
        } finally {
            setProcessing(false);
            setSelectedPrints([]);
            router.refresh();
        }
    }

    const handleMarkAsPaid = async () => {
        if (selectedPrints.length === 0) return;

        setProcessing(true);
        try {
            await Promise.all(selectedPrints.map(async (print) => {
                await paidDocument(print);
            }));
        } catch (error) {
            console.error("Error marking as paid:", error);
        } finally {
            setProcessing(false);
            setSelectedPrints([]);
            router.refresh();
        }
    }

    return (
        <>
            <div className="flex flex-row justify-around md:gap-4 w-full md:w-fit items-center">
                <Text weight="bold" className="tracking-wide">Mark as :</Text>

                {
                    isAdminPage && (
                        <div
                            className={cn(
                                "group flex flex-row items-center cursor-pointer rounded-lg transition-colors hover:bg-green-500/20",
                                selectedPrints.length === 0 && "opacity-50 cursor-not-allowed"
                            )}
                            onClick={selectedPrints.length > 0 ? handleMarkAsComplete : undefined}
                        >
                            <LuCheck
                                size="36"
                                className={cn(
                                    "py-1.5 px-1.5 rounded-sm group-hover:text-green-600",
                                )}
                            />
                            <Text className={cn(
                                "text-sm pr-3 rounded-md hidden md:block group-hover:text-green-600",
                            )}>
                                Complete
                            </Text>
                        </div>
                    )
                }

                <div
                    className={cn(
                        "group flex flex-row items-center cursor-pointer rounded-lg transition-colors hover:bg-red-500/20",
                        selectedPrints.length === 0 && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={selectedPrints.length > 0 ? handleMarkAsCancelled : undefined}
                >
                    <LuX
                        size="36"
                        className={cn(
                            "py-1.5 px-1.5 rounded-sm group-hover:text-red-600",
                        )}
                    />
                    <Text className={cn(
                        "text-sm pr-3 rounded-md hidden md:block group-hover:text-red-600",
                    )}>
                        Cancel
                    </Text>
                </div>

                {
                    isAdminPage && (
                        <div
                            className={cn(
                                "group flex flex-row items-center cursor-pointer rounded-lg transition-colors hover:bg-blue-500/20",
                                selectedPrints.length === 0 && "opacity-50 cursor-not-allowed"
                            )}
                            onClick={selectedPrints.length > 0 ? handleMarkAsPaid : undefined}
                        >
                            <LuIndianRupee
                                size="36"
                                className={cn(
                                    "py-1.5 px-1.5 rounded-sm group-hover:text-blue-600",
                                )}
                            />
                            <Text className={cn(
                                "text-sm pr-3 rounded-md hidden md:block group-hover:text-blue-600",
                            )}>
                                Paid
                            </Text>
                        </div>
                    )
                }
            </div>
            {processing && <FullLoader />}
        </>
    );
};
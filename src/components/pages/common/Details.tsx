import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    LuX, LuFileText, LuCheck, LuUser, LuFile,
    LuFileImage, LuFileArchive, LuBadgeIndianRupee,
    LuFileInput, LuCalendar, LuCopy, LuClock,
    LuMinus,
    LuPlus,
    LuPaintbrush,
    LuBookOpen
} from "react-icons/lu";
import { PrintRecord } from "@/interfaces/Print";
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation";
import { deleteFromPinata, updateFromPinata } from "@/functions/pinata";
import { FullLoader } from "@/components/ui/loader";
import { cancelDocument, completeDocument, updateDocument } from "@/functions/neon";

interface DetailsProps {
    doc: PrintRecord;
    onClose: () => void;
    page_type: "user_history" | "prints_queue" | "admin_page" | "shopkeeper_page";
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

const getFileTypeIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
        case 'image':
            return <LuFileImage />;
        case 'pdf':
            return <LuFileText />;
        case 'word':
            return <LuFileInput />;
        case 'archive':
            return <LuFileArchive />;
        default:
            return <LuFile />;
    }
};

const formatFileType = (fileType: string) => {
    return fileType.charAt(0).toUpperCase() + fileType.slice(1).toLowerCase();
};

export const Details = ({ doc, onClose, page_type }: DetailsProps) => {
    const [currentDoc, setCurrentDoc] = useState(doc);
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const pathname = usePathname()

    const statusStyles = getStatusStyles(currentDoc["print-status"]);

    const calculateCost = (doc: PrintRecord) => {
        const costPerPage = doc["print-color"] === "colored" ? 10 : 2;
        return costPerPage * doc["page-count"] * doc["print-count"];
    };

    const incrementPrintCount = () => {
        setCurrentDoc(prev => ({
            ...prev,
            "print-count": Number(prev["print-count"]) + 1,
        }));
    };

    const decrementPrintCount = () => {
        setCurrentDoc(prev => ({
            ...prev,
            "print-count": Math.max(1, prev["print-count"] - 1)
        }));
    };

    const togglePrintType = () => {
        if (page_type === "prints_queue" || page_type === "admin_page") {
            return;
        } else {
            setCurrentDoc(prev => {
                const newPrintType = prev["print-type"] === "single_side" ? "double_side" : "single_side";
                return {
                    ...prev,
                    "print-type": newPrintType,
                };
            });
        }
    };

    const togglePrintColor = () => {
        if (page_type === "prints_queue" || page_type === "admin_page") {
            return;
        } else {
            setCurrentDoc(prev => {
                const newPrintColor = prev["print-color"] === "b/w" ? "colored" : "b/w";
                return {
                    ...prev,
                    "print-color": newPrintColor,
                };
            });
        }
    };

    const cancelHandler = async () => {
        setLoading(true)
        await cancelDocument(currentDoc)
        await deleteFromPinata(currentDoc)
        router.refresh()
        onClose();
        setLoading(false)
    };

    const updateHandler = async () => {
        setLoading(true)
        await updateFromPinata(currentDoc)
        await updateDocument(currentDoc)
        router.refresh()
        onClose();
        setLoading(false)
    };

    const viewHandler = async () => {
        setLoading(true)
        const openLink = currentDoc["ipfs-link"]?.toString();
        window.open(openLink);
        setLoading(false)
    }

    const completeHandler = async () => {
        setLoading(true)
        await completeDocument(currentDoc)
        await deleteFromPinata(currentDoc)
        router.refresh()
        onClose();
        setLoading(false)
    }

    if (pathname.includes("/prints-queue")) {
        return null
    }

    return (
        <>
            <div
                className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-sm z-40"
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg shadow-xl z-50 w-full max-w-md"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 id="modal-title" className="text-lg font-semibold flex items-center gap-2">
                        <LuFileText className="h-5 w-5" />
                        File Details
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
                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuUser />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Owner:</span>
                            <span
                                className="font-medium text-right"
                                title={currentDoc["user-name"] ?? ""}
                            >
                                {(currentDoc["user-name"] ?? "").length > 30
                                    ? `${(currentDoc["user-name"] ?? "").slice(0, 30)}...`
                                    : (currentDoc["user-name"] ?? "")}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            {getFileTypeIcon(currentDoc["file-type"])}
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">File Name:</span>
                            <span className="font-medium text-right truncate">
                                {(() => {
                                    const fileName = currentDoc["file-name"] ?? "";
                                    const nameWithoutExt = fileName.includes(".")
                                        ? fileName.substring(0, fileName.lastIndexOf("."))
                                        : fileName;

                                    return nameWithoutExt.length > 30
                                        ? `${nameWithoutExt.slice(0, 30)}...`
                                        : nameWithoutExt;
                                })()}

                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuFile />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">File Type:</span>
                            <span className="font-medium text-right">
                                {formatFileType(currentDoc["file-type"])}
                            </span>
                        </div>
                    </div>

                    {
                        currentDoc["file-type"] === ".pdf" && (
                            <div className="flex justify-center items-center gap-3 my-3.5">
                                <span className="text-foreground flex-shrink-0 mt-1">
                                    <LuBookOpen />
                                </span>
                                <div className="flex-1 flex justify-between">
                                    <span className="text-foreground">Sided:</span>
                                    <div className="flex flex-row gap-2">
                                        <span
                                            className={cn(
                                                "rounded-md transition-colors text-right px-2 py-0.5",
                                                currentDoc["print-type"] === "double_side"
                                                    ? "bg-foreground/10"
                                                    : "text-foreground",
                                                page_type === "user_history" && "cursor-pointer hover:bg-foreground hover:text-background"
                                            )}
                                            onClick={togglePrintType}
                                        >
                                            Double Side
                                        </span>
                                        <span
                                            className={cn(
                                                "rounded-md transition-colors px-2 py-0.5 text-right",
                                                currentDoc["print-type"] === "single_side"
                                                    ? "bg-foreground/10"
                                                    : "text-foreground",
                                                page_type === "user_history" && "cursor-pointer hover:bg-foreground hover:text-background"
                                            )}
                                            onClick={togglePrintType}
                                        >
                                            Single Side
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <div className="flex justify-center items-center gap-3">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuPaintbrush />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Color:</span>
                            <div className="flex flex-row gap-2">
                                <span
                                    className={cn(
                                        "rounded-md transition-colors text-right px-2 py-0.5",
                                        currentDoc["print-color"] !== "b/w"
                                            ? "text-foreground"
                                            : "bg-foreground/10",
                                        page_type === "user_history" && "cursor-pointer hover:bg-foreground hover:text-background"
                                    )}
                                    onClick={togglePrintColor}
                                >
                                    Black and White
                                </span>
                                <span
                                    className={cn(
                                        "rounded-md transition-colors text-right px-2 py-0.5",
                                        currentDoc["print-color"] !== "colored"
                                            ? "text-foreground"
                                            : "bg-foreground/10",
                                        page_type === "user_history" && "cursor-pointer hover:bg-foreground hover:text-background"
                                    )}
                                    onClick={togglePrintColor}
                                >
                                    Colored
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuCopy />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Pages:</span>
                            <span className="font-medium text-right">
                                {currentDoc["page-count"]}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuCopy />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Copies:</span>
                            <span className="font-medium text-right flex gap-4 items-center justify-center">
                                {
                                    page_type === "user_history" && (
                                        <LuMinus
                                            className={cn("mt-1 p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm", currentDoc["print-count"] <= 1 && "cursor-not-allowed pointer-events-none")}
                                            size="24"
                                            onClick={decrementPrintCount}
                                        />
                                    )
                                }
                                <span>
                                    {currentDoc["print-count"]}
                                </span>
                                {
                                    page_type === "user_history" && (
                                        <LuPlus
                                            className="mt-1 p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm"
                                            size="24"
                                            onClick={incrementPrintCount}
                                        />
                                    )
                                }
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
                                {currentDoc["print-status"]}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuCalendar />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Uploaded:</span>
                            <span className="font-medium text-right">
                                {currentDoc["uploaded-at"]}
                            </span>
                        </div>
                    </div>

                    {
                        page_type !== "prints_queue" && (<div className="flex justify-center items-center gap-3 my-3.5">
                            <span className="text-foreground flex-shrink-0 mt-1">
                                <LuBadgeIndianRupee />
                            </span>
                            <div className="flex-1 flex justify-between">
                                <span className="text-foreground">Cost:</span>
                                <span className="font-medium text-right">
                                    ₹ {calculateCost(currentDoc)}.00
                                </span>
                            </div>
                        </div>
                        )
                    }

                    <div className="flex flex-row w-full gap-2 pt-3">
                        {
                            (page_type !== "prints_queue" && page_type !== "shopkeeper_page") && (
                                <Button
                                    variant={
                                        currentDoc["print-status"] === "pending"
                                            ? "destructive"
                                            : (currentDoc["print-status"] === "completed" || currentDoc["print-status"] === "cancelled")
                                                ? "ghost"
                                                : "default"
                                    }
                                    onClick={cancelHandler}
                                    disabled={
                                        currentDoc["print-status"] === "completed" ||
                                        currentDoc["print-status"] === "cancelled"
                                    }
                                    className="grow"
                                >
                                    Cancel
                                </Button>
                            )
                        }
                        {
                            (page_type !== "admin_page" && (page_type === "user_history" || page_type === "prints_queue" || page_type === "shopkeeper_page")) && (
                                <Button variant="outline" className="grow" onClick={onClose}>Close</Button>
                            )
                        }
                        {
                            (page_type !== "prints_queue" && page_type !== "shopkeeper_page") && (
                                <Button
                                    variant={
                                        currentDoc["print-status"] === "pending"
                                            ? (
                                                JSON.stringify(currentDoc) === JSON.stringify(doc) ? "ghost" : "default"
                                            )
                                            : (currentDoc["print-status"] === "completed" || currentDoc["print-status"] === "cancelled")
                                                ? "ghost"
                                                : "default"
                                    }
                                    onClick={updateHandler}
                                    disabled={
                                        JSON.stringify(currentDoc) === JSON.stringify(doc) ||
                                        currentDoc["print-status"] === "completed" ||
                                        currentDoc["print-status"] === "cancelled"
                                    }
                                    className="grow"
                                >
                                    Update
                                </Button>
                            )
                        }
                        <Button
                            variant={
                                currentDoc["print-status"] === "pending"
                                    ? "default"
                                    : (currentDoc["print-status"] === "completed" || currentDoc["print-status"] === "cancelled")
                                        ? "ghost"
                                        : "default"
                            }
                            disabled={
                                currentDoc["print-status"] === "completed" ||
                                currentDoc["print-status"] === "cancelled"
                            }
                            className="grow"
                            onClick={viewHandler}
                        >
                            View
                        </Button>
                        {page_type === "admin_page" && (
                            <Button
                                className="grow"
                                variant={
                                    currentDoc["print-status"] === "pending"
                                        ? "default"
                                        : (currentDoc["print-status"] === "completed" || currentDoc["print-status"] === "cancelled")
                                            ? "ghost"
                                            : "default"
                                }
                                disabled={
                                    currentDoc["print-status"] === "completed" || currentDoc["print-status"] === "cancelled"
                                } onClick={completeHandler}
                            >
                                Completed
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {loading && <FullLoader />}
        </>
    );
};
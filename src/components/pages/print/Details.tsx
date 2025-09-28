import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    LuX,
    LuFileText,
    LuCheck,
    LuUser,
    LuFile,
    LuFileImage,
    LuFileArchive,
    LuBadgeIndianRupee,
    LuFileInput,
    LuCalendar,
    LuCopy,
    LuClock,
    LuMinus,
    LuPlus,
    LuPaintbrush,
    LuBookOpen,
    LuNotebook,
    LuClipboardList,
} from "react-icons/lu";
import { PrintRecord } from "@/interfaces/Print";
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation";
import { deleteFromPinata } from "@/functions/pinata";
import { FullLoader } from "@/components/ui/loader";
import { cancelDocument, checkExistingHash, completeDocument, updateDocument } from "@/functions/prints";
import { Textarea } from "@/components/ui/textarea";

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

    const statusStyles = getStatusStyles(currentDoc.print_status);

    const calculateCost = (doc: PrintRecord) => {
        const costPerPage = doc.print_color === "colored" ? 10 : 2.5;
        let total = costPerPage * doc.page_count * doc.print_count;

        if (doc.binding_type && doc.binding_type === "bind") {
            total += 35;
        }

        return total;
    };

    const incrementPrintCount = () => {
        if (page_type === "user_history" && currentDoc.print_status === "pending") {
            setCurrentDoc(prev => ({
                ...prev,
                print_count: Number(prev.print_count) + 1,
            }));
        }
    };

    const decrementPrintCount = () => {
        if (page_type === "user_history" && currentDoc.print_status === "pending") {
            setCurrentDoc(prev => ({
                ...prev,
                print_count: Math.max(1, prev.print_count - 1)
            }));
        }
    };

    const togglePrintType = () => {
        if (page_type === "user_history" && currentDoc.print_status === "pending") {
            setCurrentDoc(prev => {
                const newPrintType =
                    prev.print_type === "single_side" ? "double_side" : "single_side";
                return { ...prev, print_type: newPrintType };
            });
        }
    };

    const togglePrintColor = () => {
        if (page_type === "user_history" && currentDoc.print_status === "pending") {
            setCurrentDoc(prev => {
                const newPrintColor =
                    prev.print_color === "b/w" ? "colored" : "b/w";
                return { ...prev, print_color: newPrintColor };
            });
        }
    };

    const toggleBinding = () => {
        if (page_type === "user_history" && currentDoc.print_status === "pending") {
            setCurrentDoc(prev => {
                const newBindType =
                    prev.binding_type === "no" ? "bind" : "no";
                return { ...prev, binding_type: newBindType };
            });
        }
    };

    const cancelHandler = async () => {
        setLoading(true)
        const result = await checkExistingHash(currentDoc)
        if (result.numberOfRows === 1) {
            await deleteFromPinata(currentDoc)
        }
        await cancelDocument(currentDoc)
        router.refresh()
        onClose();
        setLoading(false)
    };

    const updateHandler = async () => {
        setLoading(true)
        await updateDocument(currentDoc)
        onClose();
        router.refresh()
        setLoading(false)
    };

    const viewHandler = async () => {
        setLoading(true)
        const openLink = currentDoc.ipfs_link?.toString();
        window.open(openLink);
        setLoading(false)
    }

    const completeHandler = async () => {
        setLoading(true)
        await completeDocument(currentDoc)
        await deleteFromPinata(currentDoc)
        onClose();
        router.refresh()
        setLoading(false)
    }

    const truncateText = (text: string) => {
        return text.length > 18 ? `${text.substring(0, 18)}...` : text;
    };

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
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg shadow-xl z-50 w-full md:max-w-[625px]"
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
                                title={currentDoc.user_name ?? ""}
                            >
                                {truncateText(currentDoc.user_name || "N/A")}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            {getFileTypeIcon(currentDoc.file_type)}
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">File Name:</span>
                            <span className="font-medium text-right truncate">
                                {(() => {
                                    const fileName = currentDoc.file_name ?? "";
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
                                {formatFileType(currentDoc.file_type)}
                            </span>
                        </div>
                    </div>

                    {
                        currentDoc.file_type === ".pdf" && (
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
                                                currentDoc.print_type === "double_side"
                                                    ? "bg-accent text-black"
                                                    : "text-foreground",
                                                page_type === "user_history" && currentDoc.print_status === "pending" &&
                                                "cursor-pointer hover:bg-foreground hover:text-background"
                                            )}
                                            onClick={togglePrintType}
                                        >
                                            Double Side
                                        </span>
                                        <span
                                            className={cn(
                                                "rounded-md transition-colors text-right px-2 py-0.5",
                                                currentDoc.print_type === "single_side"
                                                    ? "bg-accent text-black"
                                                    : "text-foreground",
                                                page_type === "user_history" && currentDoc.print_status === "pending" &&
                                                "cursor-pointer hover:bg-foreground hover:text-background"
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
                                        currentDoc.print_color === "b/w"
                                            ? "bg-accent text-black"
                                            : "text-foreground",
                                        page_type === "user_history" && currentDoc.print_status === "pending" &&
                                        "cursor-pointer hover:bg-foreground hover:text-background"
                                    )}
                                    onClick={togglePrintColor}
                                >
                                    B/W
                                </span>
                                <span
                                    className={cn(
                                        "rounded-md transition-colors text-right px-2 py-0.5",
                                        currentDoc.print_color === "colored"
                                            ? "bg-accent text-black"
                                            : "text-foreground",
                                        page_type === "user_history" && currentDoc.print_status === "pending" &&
                                        "cursor-pointer hover:bg-foreground hover:text-background"
                                    )}
                                    onClick={togglePrintColor}
                                >
                                    Color
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuNotebook />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Binding:</span>
                            <div className="flex flex-row gap-2">
                                <span
                                    className={cn(
                                        "rounded-md transition-colors text-right px-2 py-0.5",
                                        currentDoc.binding_type === "no"
                                            ? "bg-accent text-black"
                                            : "text-foreground",
                                        page_type === "user_history" && currentDoc.print_status === "pending" &&
                                        "cursor-pointer hover:bg-foreground hover:text-background"
                                    )}
                                    onClick={toggleBinding}
                                >
                                    No
                                </span>
                                <span
                                    className={cn(
                                        "rounded-md transition-colors text-right px-2 py-0.5",
                                        currentDoc.binding_type === "bind"
                                            ? "bg-accent text-black"
                                            : "text-foreground",
                                        page_type === "user_history" && currentDoc.print_status === "pending" &&
                                        "cursor-pointer hover:bg-foreground hover:text-background"
                                    )}
                                    onClick={toggleBinding}
                                >
                                    Bind
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
                                {currentDoc.page_count}
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
                                    page_type === "user_history" && currentDoc.print_status === "pending" && (
                                        <LuMinus
                                            className={cn(
                                                "mt-1 p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm",
                                                currentDoc.print_count <= 1 && "cursor-not-allowed pointer-events-none"
                                            )}
                                            size="24"
                                            onClick={decrementPrintCount}
                                        />
                                    )
                                }
                                <span>{currentDoc.print_count}</span>
                                {
                                    page_type === "user_history" && currentDoc.print_status === "pending" && (
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
                                {currentDoc.print_status}
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
                                {currentDoc.uploaded_at}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 my-3.5">
                        <span className="text-foreground/70"><LuClipboardList /> </span>
                        <span className="text-foreground">Instructions:</span>
                        <div className="flex justify-end gap-2 items-center w-full ml-32">
                            <Textarea
                                onChange={(e) => {
                                    if (
                                        page_type === "user_history" &&
                                        currentDoc.print_status === "pending"
                                    ) {
                                        const newValue = e.target.value;
                                        setCurrentDoc((prev) => ({
                                            ...prev,
                                            instructions: newValue,
                                        }));
                                    }
                                }}
                                disabled={
                                    page_type !== "user_history" ||
                                    currentDoc.print_status !== "pending"
                                }
                                value={currentDoc.instructions || ""}
                                placeholder="Specifics..."
                            />
                        </div>
                    </div>

                    {
                        (page_type !== "prints_queue" && page_type !== "shopkeeper_page") && (
                            <div className="flex justify-center items-center gap-3 my-3.5">
                                <span className="text-foreground flex-shrink-0 mt-1">
                                    <LuBadgeIndianRupee />
                                </span>
                                <div className="flex-1 flex justify-between">
                                    <span className="text-foreground">Cost:</span>
                                    <span className="font-medium text-right">
                                        ₹ {calculateCost(currentDoc)}
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
                                        currentDoc.print_status === "pending"
                                            ? "destructive"
                                            : (currentDoc.print_status === "completed" || currentDoc.print_status === "cancelled")
                                                ? "ghost"
                                                : "foreground"
                                    }
                                    onClick={cancelHandler}
                                    disabled={
                                        currentDoc.print_status === "completed" ||
                                        currentDoc.print_status === "cancelled"
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
                            (page_type === "user_history") && (
                                <Button
                                    variant={
                                        currentDoc.print_status === "pending"
                                            ? (
                                                JSON.stringify(currentDoc) === JSON.stringify(doc) ? "ghost" : "foreground"
                                            )
                                            : (currentDoc.print_status === "completed" || currentDoc.print_status === "cancelled")
                                                ? "ghost"
                                                : "foreground"
                                    }
                                    onClick={updateHandler}
                                    disabled={
                                        JSON.stringify(currentDoc) === JSON.stringify(doc) ||
                                        currentDoc.print_status === "completed" ||
                                        currentDoc.print_status === "cancelled"
                                    }
                                    className="grow"
                                >
                                    Update
                                </Button>
                            )
                        }
                        <Button
                            variant={
                                currentDoc.print_status === "pending"
                                    ? "foreground"
                                    : (currentDoc.print_status === "completed" || currentDoc.print_status === "cancelled")
                                        ? "ghost"
                                        : "foreground"
                            }
                            disabled={
                                currentDoc.print_status === "completed" ||
                                currentDoc.print_status === "cancelled"
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
                                    currentDoc.print_status === "pending"
                                        ? "foreground"
                                        : (currentDoc.print_status === "completed" || currentDoc.print_status === "cancelled")
                                            ? "ghost"
                                            : "foreground"
                                }
                                disabled={
                                    currentDoc.print_status === "completed" || currentDoc.print_status === "cancelled"
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
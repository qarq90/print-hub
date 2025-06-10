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
import { DocumentType } from "@/interfaces/Document";
import { cn } from "@/lib/utils"
import { deleteDocument, updateDocument } from "@/functions/supabase";
import { useRouter } from "next/navigation";
import { deleteFromPinata, downloadFile } from "@/functions/pinata";
import { FullLoader } from "@/components/ui/loader";

interface DetailsProps {
    doc: DocumentType;
    onClose: () => void;
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

export const Details = ({ doc, onClose }: DetailsProps) => {
    const [currentDoc, setCurrentDoc] = useState(doc);
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const statusStyles = getStatusStyles(currentDoc.print_status);
    const cost = (currentDoc.page_count * currentDoc.print_count) * (currentDoc.print_color === "colored" ? 10 : 2);

    const incrementPrintCount = () => {
        setCurrentDoc(prev => ({
            ...prev,
            print_count: prev.print_count + 1,
        }));
    };

    const decrementPrintCount = () => {
        setCurrentDoc(prev => ({
            ...prev,
            print_count: Math.max(1, prev.print_count - 1)
        }));
    };

    const togglePrintType = () => {
        setCurrentDoc(prev => ({
            ...prev,
            print_type: prev.print_type === "single_side" ? "double_side" : "single_side"
        }));
    };

    const togglePrintColor = () => {
        setCurrentDoc(prev => ({
            ...prev,
            print_color: prev.print_color === "b/w" ? "colored" : "b/w"
        }));
    };

    const deleteHandler = async () => {
        setLoading(true)
        await deleteDocument(currentDoc)
        await deleteFromPinata(currentDoc)
        router.refresh()
        onClose();
        setLoading(false)
    };

    const updateHandler = async () => {
        setLoading(true)
        await updateDocument(currentDoc)
        router.refresh()
        onClose();
        setLoading(false)
    };

    const downloadHandler = async () => {
        setLoading(true)
        const generatedLink = await downloadFile(currentDoc)
        console.log(generatedLink)
        onClose();
        setLoading(false)
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
                    <div className="flex justify-center items-center gap-3">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuUser />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Owner:</span>
                            <span className="font-medium text-right">
                                {currentDoc.user_name}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            {getFileTypeIcon(currentDoc.file_type)}
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">File Name:</span>
                            <span className="font-medium text-right truncate">
                                {currentDoc.file_name}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3">
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

                    <div className="flex justify-center items-center gap-3">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuBookOpen />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Sided:</span>
                            <span
                                className={cn(
                                    "cursor-pointer rounded-md transition-colors text-right",
                                    currentDoc.print_type !== "single_side"
                                        ? "text-foreground"
                                        : "bg-foreground/10 px-2 py-0.5 hover:bg-foreground hover:text-background"
                                )}
                                onClick={togglePrintType}
                            >
                                {currentDoc.print_type === "double_side" ? "Double Side" : "Single Side"}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuPaintbrush />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Color:</span>
                            <span
                                className={cn(
                                    "cursor-pointer rounded-md transition-colors text-right",
                                    currentDoc.print_color !== "colored"
                                        ? "text-foreground"
                                        : "bg-foreground/10 px-2 py-0.5 hover:bg-foreground hover:text-background"
                                )}
                                onClick={togglePrintColor}
                            >
                                {currentDoc.print_color === "b/w" ? "Black & White" : "Colored"}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3">
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

                    <div className="flex justify-center items-center gap-3">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuCopy />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Copies:</span>
                            <span className="font-medium text-right flex gap-4 items-center justify-center">
                                <LuMinus
                                    className={cn("mt-1 p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm", currentDoc.print_count <= 1 && "cursor-not-allowed pointer-events-none")}
                                    size="24"
                                    onClick={decrementPrintCount}
                                />
                                <span>
                                    {currentDoc.print_count}
                                </span>
                                <LuPlus
                                    className="mt-1 p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm"
                                    size="24"
                                    onClick={incrementPrintCount}
                                />
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3">
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

                    <div className="flex justify-center items-center gap-3">
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

                    <div className="flex justify-center items-center gap-3">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            <LuBadgeIndianRupee />
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">Cost:</span>
                            <span className="font-medium text-right">
                                ₹ {cost}.00
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 pt-3">
                        <Button variant="destructive" className="w-auto" onClick={deleteHandler}>Delete</Button>
                        <Button variant="outline" className="w-auto" onClick={onClose}>Close</Button>
                        <Button
                            variant={JSON.stringify(currentDoc) === JSON.stringify(doc) ? "ghost" : "default"}
                            onClick={updateHandler}
                            disabled={JSON.stringify(currentDoc) === JSON.stringify(doc)}
                            className="w-auto"
                        >
                            Update
                        </Button>
                        <Button className="w-auto" onClick={downloadHandler}>Download</Button>
                    </div>
                </div>
            </div>
            {loading && <FullLoader />}
        </>
    );
};
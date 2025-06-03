import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    LuX, LuFileText, LuCheck, LuUser, LuFile,
    LuFileImage, LuFileArchive, LuBadgeIndianRupee,
    LuFileInput, LuCalendar, LuCopy, LuClock,
    LuMinus,
    LuPlus
} from "react-icons/lu";
import { DocumentType } from "@/interfaces/Document";
import { cn } from "@/lib/utils"

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
    const statusStyles = getStatusStyles(doc.print_status);
    const cost = (doc.page_count * doc.print_count) * 2;

    const [numberOfCopies, setNumberOfCopies] = useState(doc.print_count)

    const copiesHandler = (type: string) => {
        if (type === "inc") {
            setNumberOfCopies(numberOfCopies + 1);
            return;
        } else {
            if (numberOfCopies === 1) {
                return
            } else {
                setNumberOfCopies(numberOfCopies - 1);
            }
        }
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
                                {doc.user_name}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3">
                        <span className="text-foreground flex-shrink-0 mt-1">
                            {getFileTypeIcon(doc.file_type)}
                        </span>
                        <div className="flex-1 flex justify-between">
                            <span className="text-foreground">File Name:</span>
                            <span className="font-medium text-right">
                                {doc.file_name}
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
                                {formatFileType(doc.file_type)}
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
                                {doc.page_count}
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
                                    className={cn("mt-1 p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm", numberOfCopies === 1 && "cursor-not-allowed pointer-events-none")}
                                    size="24"
                                    onClick={() => copiesHandler("dec")}
                                />
                                <span>
                                    {numberOfCopies}
                                </span>
                                <LuPlus
                                    className="mt-1 p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm"
                                    size="24"
                                    onClick={() => copiesHandler("inc")}
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
                                {doc.print_status}
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
                                {doc.uploaded_at}
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

                    <div className="grid grid-cols-3 gap-2 pt-3">
                        <Button variant="destructive" className="w-auto">Delete</Button>
                        <Button variant="outline" className="w-auto" onClick={onClose}>Close</Button>
                        <Button variant={numberOfCopies === doc.print_count ? "ghost" : "default"} disabled={numberOfCopies === doc.print_count} className="w-auto">Update</Button>
                    </div>
                </div>
            </div>
        </>
    );
};
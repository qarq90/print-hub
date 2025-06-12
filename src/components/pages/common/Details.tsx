import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuX, LuFileText } from "react-icons/lu";
import { cancelDocument, completeDocument, updateDocument } from "@/functions/supabase";
import { deleteFromPinata, viewFile } from "@/functions/pinata";
import { FullLoader } from "@/components/ui/loader";
import { DocumentFields } from "@/components/pages/common/details/DocumentFields";
import { DocumentActions } from "@/components/pages/common/details/DocumentActions";
import { DocumentModal } from "@/components/pages/common/details/DocumentModal";
import { DocumentType } from "@/interfaces/Document";

export interface DetailsProps {
    doc: DocumentType;
    onClose: () => void;
    page_type: "user_history" | "todays_queue" | "admin_page";
}

export const Details = ({ doc, onClose, page_type }: DetailsProps) => {
    const [currentDoc, setCurrentDoc] = useState(doc);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

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
        if (page_type === "todays_queue") return;
        setCurrentDoc(prev => ({
            ...prev,
            print_type: prev.print_type === "single_side" ? "double_side" : "single_side"
        }));
    };

    const togglePrintColor = () => {
        if (page_type === "todays_queue") return;
        setCurrentDoc(prev => ({
            ...prev,
            print_color: prev.print_color === "b/w" ? "colored" : "b/w"
        }));
    };

    const cancelHandler = async () => {
        setLoading(true);
        await cancelDocument(currentDoc);
        await deleteFromPinata(currentDoc);
        router.refresh();
        onClose();
        setLoading(false);
    };

    const viewHandler = async () => {
        setLoading(true);
        await viewFile(currentDoc);
        setLoading(false);
    };

    const updateHandler = async () => {
        setLoading(true);
        const success = await updateDocument(currentDoc);
        if (success) {
            setLoading(false);
            setIsOpen(true);
        }
    };

    const completeHandler = async () => {
        setLoading(true);
        const success = await completeDocument(currentDoc);
        if (success) {
            setIsOpen(true);
            await deleteFromPinata(currentDoc);
            router.refresh();
        }
        setLoading(false);
    };

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

                <DocumentFields
                    doc={currentDoc}
                    page_type={page_type}
                    onIncrement={incrementPrintCount}
                    onDecrement={decrementPrintCount}
                    onToggleType={togglePrintType}
                    onToggleColor={togglePrintColor}
                />

                <DocumentActions
                    doc={currentDoc}
                    page_type={page_type}
                    originalDoc={doc}
                    onCancel={cancelHandler}
                    onView={viewHandler}
                    onUpdate={updateHandler}
                    onComplete={completeHandler}
                    onClose={onClose}
                />
            </div>

            {loading && <FullLoader />}

            <DocumentModal
                isOpen={isOpen}
                onClose={() => router.refresh()}
                onViewChanges={() => {
                    setIsOpen(false);
                    router.refresh();
                }}
                onFinalClose={() => {
                    setIsOpen(false);
                    router.refresh();
                }}
            />
        </>
    );
};
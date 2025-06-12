import { Button } from "@/components/ui/button";
import { DocumentType } from "@/interfaces/Document";

interface DocumentActionsProps {
    doc: DocumentType;
    page_type: "user_history" | "todays_queue" | "admin_page";
    originalDoc: DocumentType;
    onCancel: () => void;
    onView: () => void;
    onUpdate: () => void;
    onComplete: () => void;
    onClose: () => void;
}

export const DocumentActions = ({
    doc,
    page_type,
    originalDoc,
    onCancel,
    onView,
    onUpdate,
    onComplete,
    onClose,
}: DocumentActionsProps) => {
    const isUnchanged = JSON.stringify(doc) === JSON.stringify(originalDoc);
    const isFinalStatus =
        doc.print_status === "completed" || doc.print_status === "cancelled";

    return (
        <div className="flex flex-row w-full gap-2 pt-3">
            {page_type !== "todays_queue" && (
                <Button
                    variant={
                        doc.print_status === "pending"
                            ? "destructive"
                            : isFinalStatus
                                ? "ghost"
                                : "default"
                    }
                    onClick={onCancel}
                    disabled={isFinalStatus}
                    className="grow"
                >
                    Cancel
                </Button>
            )}

            {page_type !== "admin_page" &&
                (page_type === "user_history" ||
                    page_type === "todays_queue") && (
                    <Button
                        variant="outline"
                        className="grow"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                )}

            {page_type !== "todays_queue" && (
                <Button
                    variant={
                        doc.print_status === "pending"
                            ? isUnchanged
                                ? "ghost"
                                : "default"
                            : isFinalStatus
                                ? "ghost"
                                : "default"
                    }
                    onClick={onUpdate}
                    disabled={isUnchanged || isFinalStatus}
                    className="grow"
                >
                    Update
                </Button>
            )}

            <Button
                variant={
                    doc.print_status === "pending"
                        ? "default"
                        : isFinalStatus
                            ? "ghost"
                            : "default"
                }
                disabled={isFinalStatus}
                className="grow"
                onClick={onView}
            >
                View
            </Button>

            {page_type === "admin_page" && (
                <Button
                    className="grow"
                    variant={
                        doc.print_status === "pending"
                            ? "default"
                            : isFinalStatus
                                ? "ghost"
                                : "default"
                    }
                    disabled={doc.print_status === "completed"}
                    onClick={onComplete}
                >
                    Completed
                </Button>
            )}
        </div>
    );
};

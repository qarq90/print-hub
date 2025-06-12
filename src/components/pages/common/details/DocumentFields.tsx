import { getFileTypeIcon, formatFileType } from "@/functions/file";
import { LuBookOpen, LuPaintbrush, LuMinus, LuPlus, LuUser, LuFile, LuCopy, LuClock, LuCalendar, LuIndianRupee } from "react-icons/lu";
import { cn } from "@/lib/utils"
import { DocumentType } from "@/interfaces/Document";
import { getFormatDate, calculateCost } from "@/functions/file"

interface DocumentFieldProps {
    doc: DocumentType;
    page_type: "user_history" | "todays_queue" | "admin_page";
    onIncrement: () => void;
    onDecrement: () => void;
    onToggleType: () => void;
    onToggleColor: () => void;
}

export const DocumentFields = ({
    doc,
    page_type,
    onIncrement,
    onDecrement,
    onToggleType,
    onToggleColor
}: DocumentFieldProps) => {
    return (
        <div className="space-y-3">
            <DocumentField
                label="Owner"
                icon={<LuUser />}
                value={doc.user_name}
            />
            <DocumentField
                label="File Name"
                icon={getFileTypeIcon(doc.file_type)}
                value={doc.file_name} truncate
            />
            <DocumentField
                label="File Type"
                icon={<LuFile />}
                value={formatFileType(doc.file_type)}
            />

            <div className="flex justify-center items-center gap-3">
                <span className="text-foreground flex-shrink-0 mt-1">
                    <LuBookOpen />
                </span>
                <div className="flex-1 flex justify-between">
                    <span className="text-foreground">Sided:</span>
                    <div className="flex flex-row gap-2">
                        <ToggleOption
                            active={doc.print_type !== "single_side"}
                            label="Double Side"
                            onClick={onToggleType}
                            disabled={page_type === "todays_queue"}
                        />
                        <ToggleOption
                            active={doc.print_type !== "double_side"}
                            label="Single Side"
                            onClick={onToggleType}
                            disabled={page_type === "todays_queue"}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center gap-3">
                <span className="text-foreground flex-shrink-0 mt-1">
                    <LuPaintbrush />
                </span>
                <div className="flex-1 flex justify-between">
                    <span className="text-foreground">Color:</span>
                    <div className="flex flex-row gap-2">
                        <ToggleOption
                            active={doc.print_color !== "b/w"}
                            label="Black and White"
                            onClick={onToggleColor}
                            disabled={page_type === "todays_queue"}
                        />
                        <ToggleOption
                            active={doc.print_color !== "colored"}
                            label="Colored"
                            onClick={onToggleColor}
                            disabled={page_type === "todays_queue"}
                        />
                    </div>
                </div>
            </div>

            <DocumentField
                label="Pages"
                icon={<LuCopy />}
                value={doc.page_count.toString()}
            />

            <div className="flex justify-center items-center gap-3">
                <span className="text-foreground flex-shrink-0 mt-1">
                    <LuCopy />
                </span>
                <div className="flex-1 flex justify-between">
                    <span className="text-foreground">Copies:</span>
                    <span className="font-medium text-right flex gap-4 items-center justify-center">
                        {page_type === "user_history" && (
                            <LuMinus
                                className={cn(
                                    "mt-1 p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm",
                                    doc.print_count <= 1 && "cursor-not-allowed pointer-events-none"
                                )}
                                size="24"
                                onClick={onDecrement}
                            />
                        )}
                        <span>{doc.print_count}</span>
                        {page_type === "user_history" && (
                            <LuPlus
                                className="mt-1 p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm"
                                size="24"
                                onClick={onIncrement}
                            />
                        )}
                    </span>
                </div>
            </div>

            <DocumentField
                label="Status"
                icon={<LuClock />}
                value={doc.print_status}
            />
            <DocumentField
                label="Uploaded"
                icon={<LuCalendar />}
                value={getFormatDate(new Date(doc.uploaded_at))}
            />
            <DocumentField
                label="Cost"
                icon={<LuIndianRupee />}
                value={`₹ ${calculateCost(doc).toFixed(2)}`}
            />
        </div>
    );
};

const DocumentField = ({ label, icon, value, truncate = false }: {
    label: string;
    icon: React.ReactNode;
    value?: string;
    truncate?: boolean;
}) => (
    <div className="flex justify-center items-center gap-3">
        <span className="text-foreground flex-shrink-0 mt-1">{icon}</span>
        <div className="flex-1 flex justify-between">
            <span className="text-foreground">{label}:</span>
            <span className={`font-medium text-right ${truncate ? 'truncate' : ''}`}>
                {value}
            </span>
        </div>
    </div>
);

const ToggleOption = ({ active, label, onClick, disabled }: {
    active: boolean;
    label: string;
    onClick: () => void;
    disabled: boolean;
}) => (
    <span
        className={cn(
            "rounded-md transition-colors px-2 py-0.5 text-right",
            active ? "text-foreground" : "bg-foreground/10",
            !disabled && "cursor-pointer hover:bg-foreground hover:text-background"
        )}
        onClick={!disabled ? onClick : undefined}
    >
        {label}
    </span>
);
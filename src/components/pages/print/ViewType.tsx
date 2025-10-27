import { LuGrid3X3, LuTable2 } from "react-icons/lu";
import { cn } from "@/lib/utils";

interface ViewTypeProps {
    setViewType: React.Dispatch<React.SetStateAction<boolean>>;
    viewType: boolean;
}

export const ViewType = ({ setViewType, viewType }: ViewTypeProps) => {
    return (
        <div className="md:mb-2 md:flex hidden flex-row gap-4 items-center z-40">
            <div
                className="relative flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => setViewType(false)}
            >
                <LuGrid3X3
                    size="36"
                    className={cn(!viewType && "bg-foreground/10", "p-1.5 rounded-sm")}
                />
            </div>
            <div
                className="relative flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => setViewType(true)}
            >
                <LuTable2
                    size="36"
                    className={cn(viewType && "bg-foreground/10", "p-1.5 rounded-sm")}
                />
            </div>
        </div>
    );
};
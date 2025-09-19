import { Text } from "@/components/ui/text";
// import { LuCalendar, LuGrid3X3, LuTable2, LuUsers } from "react-icons/lu";
import { LuGrid3X3, LuTable2 } from "react-icons/lu";
import { cn } from "@/lib/utils";

interface ViewTypeProps {
    setViewType: React.Dispatch<React.SetStateAction<boolean>>;
    viewType: boolean;
}

export const ViewType = ({ setViewType, viewType }: ViewTypeProps) => {
    return (
        <div className="md:mb-4 flex flex-row gap-4 items-center z-40">
            {/* <Text size="xl">Display</Text> */}
            <div
                className="relative flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => setViewType(false)}
            >
                <LuGrid3X3
                    size="36"
                    className={cn(!viewType && "bg-foreground/10", "p-1.5 rounded-sm")}
                />
                <Text className="absolute w-19.5 top-11 text-sm opacity-0 group-hover:opacity-100 py-1 px-2 rounded-md group-hover:bg-foreground/10 transition-opacity duration-200">
                    Grid View
                </Text>
            </div>
            <div
                className="relative flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => setViewType(true)}
            >
                <LuTable2
                    size="36"
                    className={cn(viewType && "bg-foreground/10", "p-1.5 rounded-sm")}
                />
                <Text className="absolute w-20.5 top-11 text-sm opacity-0 group-hover:opacity-100 py-1 px-2 rounded-md group-hover:bg-foreground/10 transition-opacity duration-200">
                    Table View
                </Text>
            </div>
            {/* <div
                className="relative flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => setViewType(false)}
            >
                <LuUsers
                    size="36"
                    className={cn(!viewType && "bg-foreground/10", "p-1.5 rounded-sm")}
                />
                <Text className="absolute w-19.5 top-11 text-sm opacity-0 group-hover:opacity-100 py-1 px-2 rounded-md group-hover:bg-foreground/10 transition-opacity duration-200">
                    By Users
                </Text>
            </div>
            <div
                className="relative flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => setViewType(true)}
            >
                <LuCalendar
                    size="36"
                    className={cn(viewType && "bg-foreground/10", "p-1.5 rounded-sm")}
                />
                <Text className="absolute w-20.5 top-11 text-sm opacity-0 group-hover:opacity-100 py-1 px-2 rounded-md group-hover:bg-foreground/10 transition-opacity duration-200">
                    By Date
                </Text>
            </div> */}
        </div>
    );
};
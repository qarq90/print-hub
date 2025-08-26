"use client";;
import { Text } from "@/components/ui/text";
import { UserProps } from "@/interfaces/User";
import { UnderConstructions } from "@/components/empty/UnderConstructions";

interface ClientProps {
    user: UserProps;
}

export default function Client({ user: _user }: ClientProps) {
    // const [viewType, setViewType] = useState(false);
    // const [statusType, setStatusType] = useState<"all" | "cancelled" | "completed" | "pending">("all");
    // const [prints, setPrints] = useState<PrintRecord[] | null>(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const result = await fetchUserHistory(user);

    //             if (result.error) {
    //                 throw result.error;
    //             }

    //             setPrints(result.data || []);
    //         } catch (error) {
    //             console.error("Error fetching user history:", error);
    //             setError(error instanceof Error ? error.message : "Failed to fetch history");
    //             setPrints([]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (user) {
    //         fetchData();
    //     }
    // }, [user]);

    // const filteredHistory = statusType === "all"
    //     ? prints || []
    //     : (prints || []).filter(item => item["print-status"] === statusType);

    return (
        <div className="mb-20  mt-4">
            <div className="mb-16 flex flex-col gap-2 text-left">
                <Text size="base">
                    Last updated: {new Date().toLocaleDateString()}
                </Text>
            </div>
            <UnderConstructions />
        </div>
    )

    // if (loading) {
    //     return (
    //         <div className="mb-20 mt-4">
    //             <div className="mb-4 flex flex-col gap-2 text-left">
    //                 <Text size="base">
    //                     Last updated: {new Date().toLocaleDateString()}
    //                 </Text>
    //             </div>
    //             <HalfLoader />
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="flex justify-center items-center h-64">
    //             <Text color="error">{error}</Text>
    //         </div>
    //     );
    // }

    // if (!prints || prints.length === 0) {
    //     return (
    //         <div className="mb-20  mt-4">
    //             <div className="mb-16 flex flex-col gap-2 text-left">
    //                 <Text size="base">
    //                     Last updated: {new Date().toLocaleDateString()}
    //                 </Text>
    //             </div>
    //             <EmptyHistory description="You haven't uploaded or scheduled any documents for printouts yet" title="Empty History" />
    //         </div>
    //     );
    // }

    // return (
    //     <>
    //         <div className="mb-4 mt-4 flex flex-col gap-2 text-left">
    //             <Text size="base">
    //                 Last updated: {new Date().toLocaleDateString()}
    //             </Text>
    //         </div>
    //         <div className="flex justify-between md:py-0 py-3 flex-row items-center">
    //             <ViewType setViewType={setViewType} viewType={viewType} />
    //             <StatusType setStatusType={setStatusType} statusType={statusType} />
    //         </div>
    //         {viewType ? (
    //             <TableView documentResult={filteredHistory} page_type="user_history" />
    //         ) : (
    //             <GridView documentResult={filteredHistory} page_type="user_history" />
    //         )}
    //     </>
    // );
}
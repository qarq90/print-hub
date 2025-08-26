"use client";;
import { MainLayout } from "@/components/layouts/MainLayout";
import { Text } from "@/components/ui/text";
import { UserProps } from "@/interfaces/User";
import { UnderConstructions } from "@/components/empty/UnderConstructions";

interface ClientProps {
    user: UserProps;
}

export default function Client({ user: _user }: ClientProps) {
    // const [viewType, setViewType] = useState(false);
    // const [prints, setPrints] = useState<DocumentType[] | null>(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const result = await fetchTodaysQueue();

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

    return (
        <MainLayout>
            <div className="mb-20  mt-4">
                <div className="mb-16 flex flex-col gap-2 text-left">
                    <Text size="5xl" weight="bold">Orders</Text>
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <UnderConstructions />
            </div>
        </MainLayout>
    )

    // if (loading) {
    //     return (
    //         <MainLayout>
    //             <div className="mb-4 flex flex-col gap-2 text-left">
    //                 <Text size="5xl" weight="bold">Orders</Text>
    //                 <Text size="base">
    //                     Last updated: {new Date().toLocaleDateString()}
    //                 </Text>
    //             </div>
    //             <div className="relative flex justify-between md:py-0 py-3 flex-row items-center z-40">
    //                 <ViewType setViewType={setViewType} viewType={viewType} />
    //             </div>
    //             <HalfLoader />
    //         </MainLayout>
    //     );
    // }

    // if (error) {
    //     return (
    //         <MainLayout>
    //             <div className="flex justify-center items-center h-64">
    //                 <Text color="error">{error}</Text>
    //             </div>
    //         </MainLayout>
    //     );
    // }

    // if (!prints || prints.length === 0) {
    //     return (
    //         <MainLayout>
    //             <div className="mb-3 flex flex-col gap-2 text-left">
    //                 <Text size="5xl" weight="bold">Orders</Text>
    //                 <Text size="base">
    //                     Last updated: {new Date().toLocaleDateString()}
    //                 </Text>
    //             </div>
    //             <EmptyHistory title="No Orders" description="No orders have been placed yet to be delivered" />
    //         </MainLayout>
    //     );
    // }

    // return (
    //     <MainLayout>
    //         <div className="mb-4 flex flex-col gap-2 text-left">
    //             <Text size="5xl" weight="bold">Orders</Text>
    //             <Text size="base">
    //                 Last updated: {new Date().toLocaleDateString()}
    //             </Text>
    //         </div>
    //         <div className="relative flex justify-between md:py-0 py-3 flex-row items-center z-40">
    //             <ViewType setViewType={setViewType} viewType={viewType} />
    //         </div>
    //         {viewType ? (
    //             <TableView documentResult={prints} page_type="prints_queue" />
    //         ) : (
    //             <GridView documentResult={prints} page_type="prints_queue" />
    //         )}
    //     </MainLayout>
    // );
}
"use client";
import { EmptyHistory } from "@/components/empty/EmptyHistory";
import { Text } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { TableView } from "@/components/pages/print/TableView";
import { GridView } from "@/components/pages/print/GridView";
import { ViewType } from "@/components/pages/print/ViewType";
import { StatusType } from "@/components/pages/print/StatusType";
import { UserProps } from "@/interfaces/User";
import { PrintRecord } from "@/interfaces/Print";
import { fetchUserHistory } from "@/functions/prints";
import { HalfLoader } from "@/components/ui/loader";
import { MultiMarkAs } from "@/components/pages/print/MultiMarkAs";
import { Button } from "@/components/ui/button";
import { LuCheck, LuX } from "react-icons/lu";

interface ClientProps {
    user: UserProps;
}

export default function Client({ user }: ClientProps) {
    const [viewType, setViewType] = useState(false);
    const [statusType, setStatusType] = useState<"all" | "cancelled" | "completed" | "pending">("all");
    const [prints, setPrints] = useState<PrintRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false)
    const [selectedPrints, setSelectedPrints] = useState<PrintRecord[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchUserHistory(user);

                if (result.error) {
                    throw result.error;
                }

                setPrints(result.data || []);
            } catch (error) {
                console.error("Error fetching user history:", error);
                setError(error instanceof Error ? error.message : "Failed to fetch history");
                setPrints([]);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    const clearSelected = () => {
        setIsMultiSelect(false);
        setSelectedPrints([]);
    }

    const filteredHistory = statusType === "all"
        ? prints || []
        : (prints || []).filter(item => item.print_status === statusType);

    if (loading) {
        return (
            <div className="mb-20">
                <div className="md:mb-4 mb-2 flex flex-col text-left">
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <HalfLoader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <Text color="error">{error}</Text>
            </div>
        );
    }

    if (!prints || prints.length === 0) {
        return (
            <div className="mb-20">
                <div className="mb-16 flex flex-col text-left">
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <EmptyHistory
                    type="prints"
                    description="You haven't uploaded or scheduled any documents for printouts yet"
                    title="Empty History"
                />
            </div>
        );
    }

    return (
        <>
            <div className="md:mb-4 mb-2 flex flex-col text-left">
                <Text size="base">
                    Last updated: {new Date().toLocaleDateString()}
                </Text>
            </div>
            <div className="relative flex justify-between md:py-0 py-3 flex-row items-center z-40">
                <ViewType setViewType={setViewType} viewType={viewType} />
                <div className="flex gap-3">
                    {!isMultiSelect && (
                        <StatusType setStatusType={setStatusType} statusType={statusType} />
                    )}

                    {isMultiSelect && (
                        <MultiMarkAs setIsMultiSelect={setIsMultiSelect} isAdminPage={false} selectedPrints={selectedPrints} setSelectedPrints={setSelectedPrints} />
                    )}

                    <Button variant="foreground" onClick={() => setIsMultiSelect(true)}><LuCheck size={32} /> Select</Button>

                    {isMultiSelect && (
                        <Button variant="destructive" onClick={clearSelected}>
                            <LuX size={32} /> Cancel
                        </Button>
                    )}
                </div>
            </div>
            {viewType ? (
                <TableView
                    documentResult={filteredHistory}
                    page_type="user_history"
                    statusType={statusType}
                    isMultiSelect={isMultiSelect}
                    selectedPrints={selectedPrints}
                    setSelectedPrints={setSelectedPrints}
                />
            ) : (
                <GridView
                    documentResult={filteredHistory}
                    page_type="user_history"
                    statusType={statusType}
                    isMultiSelect={isMultiSelect}
                    selectedPrints={selectedPrints}
                    setSelectedPrints={setSelectedPrints}
                />
            )}
        </>
    );
}
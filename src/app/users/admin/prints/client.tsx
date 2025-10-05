"use client";
import { EmptyHistory } from "@/components/empty/EmptyHistory";
import { Text } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { TableView } from "@/components/pages/print/TableView";
import { GridView } from "@/components/pages/print/GridView";
import { ViewType } from "@/components/pages/print/ViewType";
import { StatusType } from "@/components/pages/print/StatusType";
import { UserFilter } from "@/components/pages/print/UserFilter";
import { PrintRecord } from "@/interfaces/Print";
import { fetchAllPrints } from "@/functions/prints";
import { HalfLoader } from "@/components/ui/loader";

export default function Client() {
    const [viewType, setViewType] = useState(false);
    const [prints, setPrints] = useState<PrintRecord[] | null>(null);
    const [statusType, setStatusType] = useState<"all" | "cancelled" | "completed" | "pending">("all");
    const [selectedUser, setSelectedUser] = useState<string>("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchAllPrints();

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

        fetchData()
    }, []);

    const userNames = prints ? prints.map(print => print.user_name) : [];

    const filteredHistory = (prints || []).filter(item => {
        const statusMatch = statusType === "all" || item.print_status === statusType;
        const userMatch = selectedUser === "all" || item.user_name === selectedUser;
        return statusMatch && userMatch;
    });

    if (loading) {
        return (
            <>
                <div className="md:mb-4 mb-2 flex flex-col text-left">
                    <Text size="5xl" weight="bold">All Prints</Text>
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <div className="relative flex justify-between md:py-0 py-3 flex-row items-center z-40">
                    <ViewType setViewType={setViewType} viewType={viewType} />
                </div>
                <HalfLoader />
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="flex justify-center items-center h-64">
                    <Text color="error">{error}</Text>
                </div>
            </>
        );
    }

    if (!prints || prints.length === 0) {
        return (
            <>
                <div className="md:mb-4 mb-2 flex flex-col text-left">
                    <Text size="5xl" weight="bold">All Prints</Text>
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <EmptyHistory description="No users have scheduled any prints." title="Empty Schedule" />
            </>
        );
    }

    return (
        <>
            <div className="md:mb-4 mb-2 flex flex-col text-left">
                <Text size="5xl" weight="bold">All Prints</Text>
                <Text size="base">
                    Last updated: {new Date().toLocaleDateString()}
                </Text>
            </div>
            <div className="relative flex justify-between md:py-0 py-3 flex-row items-center z-40">
                <ViewType setViewType={setViewType} viewType={viewType} />
                <div className="flex gap-3">
                    <StatusType setStatusType={setStatusType} statusType={statusType} />
                    <UserFilter
                        users={userNames}
                        selectedUser={selectedUser}
                        onUserChange={setSelectedUser}
                    />
                </div>
            </div>
            {viewType ? (
                <TableView documentResult={filteredHistory} page_type="admin_page" statusType={statusType} />
            ) : (
                <GridView documentResult={filteredHistory} page_type="admin_page" statusType={statusType} />
            )}
        </>
    );
}
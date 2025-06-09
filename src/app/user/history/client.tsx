"use client";
import { EmptyHistory } from "@/components/empty/EmptyHistory";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Text } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { TableView } from "@/components/pages/common/TableView";
import { GridView } from "@/components/pages/common/GridView";
import { ViewType } from "@/components/pages/common/ViewType";
import { StatusType } from "@/components/pages/common/StatusType";
import { UserProps } from "@/interfaces/User";
import { DocumentType } from "@/interfaces/Document";
import { fetchUserHistory } from "@/functions/supabase";
import { HalfLoader } from "@/components/ui/loader";

interface ClientProps {
    user: UserProps;
}

export default function Client({ user }: ClientProps) {
    const [viewType, setViewType] = useState(false);
    const [statusType, setStatusType] = useState<"all" | "cancelled" | "completed" | "pending">("all");
    const [prints, setPrints] = useState<DocumentType[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    const filteredHistory = statusType === "all"
        ? prints || []
        : (prints || []).filter(item => item.print_status === statusType);

    if (loading) {
        return (
            <MainLayout>
                <div className="mb-4 flex flex-col gap-2 text-left">
                    <Text size="5xl" weight="bold">{user.fullName + "'s "}Print History</Text>
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <div className="flex justify-between md:py-0 py-3 flex-row items-center">
                    <ViewType setViewType={setViewType} viewType={viewType} />
                    <StatusType setStatusType={setStatusType} statusType={statusType} />
                </div>
                <HalfLoader />
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-64">
                    <Text color="error">{error}</Text>
                </div>
            </MainLayout>
        );
    }

    if (!prints || prints.length === 0) {
        return (
            <MainLayout>
                <div className="mb-4 flex flex-col gap-2 text-left">
                    <Text size="5xl" weight="bold">Prints Queue</Text>
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <EmptyHistory variant="history" />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="mb-4 flex flex-col gap-2 text-left">
                <Text size="5xl" weight="bold">{user.fullName + "'s "}Print History</Text>
                <Text size="base">
                    Last updated: {new Date().toLocaleDateString()}
                </Text>
            </div>
            <div className="flex justify-between md:py-0 py-3 flex-row items-center">
                <ViewType setViewType={setViewType} viewType={viewType} />
                <StatusType setStatusType={setStatusType} statusType={statusType} />
            </div>
            {viewType ? (
                <TableView documentResult={filteredHistory} page_type="user_history" />
            ) : (
                <GridView documentResult={filteredHistory} page_type="user_history" />
            )}
        </MainLayout>
    );
}
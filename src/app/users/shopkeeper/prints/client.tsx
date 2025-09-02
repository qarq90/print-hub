"use client";;
import { EmptyHistory } from "@/components/empty/EmptyHistory";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Text } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { TableView } from "@/components/pages/common/TableView";
import { GridView } from "@/components/pages/common/GridView";
import { ViewType } from "@/components/pages/common/ViewType";
import { PrintRecord } from "@/interfaces/Print";
import { fetchTodaysQueue } from "@/functions/neon";
import { HalfLoader } from "@/components/ui/loader";

export default function Client() {
    const [viewType, setViewType] = useState(false);
    const [prints, setPrints] = useState<PrintRecord[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchTodaysQueue();

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

    if (loading) {
        return (
            <MainLayout>
                <div className="mb-4 flex flex-col gap-2 text-left">
                    <Text size="5xl" weight="bold">Prints Queue</Text>
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>

                </div>
                <div className="relative flex justify-between md:py-0 py-3 flex-row items-center z-40">
                    <ViewType setViewType={setViewType} viewType={viewType} />
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
                <EmptyHistory description="No users have scheduled any prints." title="Empty Schedule" />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="mb-4 flex flex-col gap-2 text-left">
                <Text size="5xl" weight="bold">Prints</Text>
                <Text size="base">
                    Last updated: {new Date().toLocaleDateString()}
                </Text>
            </div>
            <div className="relative flex justify-between md:py-0 py-3 flex-row items-center z-40">
                <ViewType setViewType={setViewType} viewType={viewType} />
            </div>
            {viewType ? (
                <TableView documentResult={prints} page_type="shopkeeper_page" />
            ) : (
                <GridView documentResult={prints} page_type="shopkeeper_page" />
            )}
        </MainLayout>
    );
}
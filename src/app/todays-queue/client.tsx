"use client";;
import { EmptyHistory } from "@/components/empty/EmptyHistory";
import { NotLoggedIn } from "@/components/empty/NotLoggedIn";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { TableView } from "@/components/pages/common/TableView";
import { GridView } from "@/components/pages/common/GridView";
import { ViewType } from "@/components/pages/common/ViewType";
import { documentResult } from "@/data/document-data";

export default function Client() {
    const [viewType, setViewType] = useState(false);

    const isUserLogged = true;

    if (!isUserLogged) {
        return <NotLoggedIn />;
    }

    if (documentResult.length === 0) {
        return <EmptyHistory />;
    }

    return (
        <MainLayout>
            <div className="mb-4 text-left">
                <Text size="5xl" weight="bold">Today&apos;s Queue</Text>
                <Text size="base">
                    Last updated: {new Date().toLocaleDateString()}
                </Text>

            </div>
            <div className="relative flex justify-between md:py-0 py-3 flex-row items-center z-40">
                <ViewType setViewType={setViewType} viewType={viewType} />
            </div>
            {viewType ? (
                <TableView documentResult={documentResult} page_type="todays_queue" />
            ) : (
                <GridView documentResult={documentResult} page_type="todays_queue" />
            )}
        </MainLayout>
    );
}
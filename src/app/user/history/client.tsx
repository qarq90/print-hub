"use client";
import { EmptyHistory } from "@/components/empty/EmptyHistory";
import { NotLoggedIn } from "@/components/empty/NotLoggedIn";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { TableView } from "@/components/pages/common/TableView";
import { GridView } from "@/components/pages/common/GridView";
import { ViewType } from "@/components/pages/common/ViewType";
import { StatusType } from "@/components/pages/common/StatusType";
import { documentResult } from "@/data/document-data";

export default function Client() {

    const [viewType, setViewType] = useState(false)
    const [statusType, setStatusType] = useState<"all" | "cancelled" | "completed" | "pending">("all");

    const isUserLogged = true

    const filteredHistory = statusType === "all"
        ? documentResult
        : documentResult.filter(item => item.print_status === statusType);

    if (!isUserLogged) {
        return (
            <NotLoggedIn />
        )
    }

    if (documentResult.length === 0) {
        return (
            <EmptyHistory />
        )
    }

    return (
        <MainLayout>
            <div className="mb-4 text-left">
                <Text size="5xl" weight="bold">Print History</Text>
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


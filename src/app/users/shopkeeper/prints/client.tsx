"use client";
import { EmptyHistory } from "@/components/empty/EmptyHistory";
import { Text } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { TableView } from "@/components/pages/print/TableView";
import { GridView } from "@/components/pages/print/GridView";
import { ViewType } from "@/components/pages/print/ViewType";
import { PrintRecord } from "@/interfaces/Print";
import { fetchTodaysQueue } from "@/functions/prints";
import { HalfLoader } from "@/components/ui/loader";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationEllipsis,
    PaginationLink,
    PaginationNext,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 20;

export default function Client() {
    const [viewType, setViewType] = useState(false);
    const [prints, setPrints] = useState<PrintRecord[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchTodaysQueue();

                if (result.error) {
                    throw result.error;
                }

                setPrints(result.data || []);
                const totalItems = result.data?.length || 0;
                setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
            } catch (error) {
                console.error("Error fetching user history:", error);
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch history",
                );
                setPrints([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= currentTotalPages) {
            setCurrentPage(page);
        }
    };

    const getPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        if (currentTotalPages <= maxVisiblePages) {
            for (let i = 1; i <= currentTotalPages; i++) {
                items.push(i);
            }
        } else {
            items.push(1);

            if (currentPage > 3) {
                items.push("ellipsis-start");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(currentTotalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                items.push(i);
            }

            if (currentPage < currentTotalPages - 2) {
                items.push("ellipsis-end");
            }

            items.push(currentTotalPages);
        }

        return items;
    };

    if (loading) {
        return (
            <>
                <div className="md:mb-4 mb-2 flex flex-col text-left">
                    <Text size="5xl" weight="bold">
                        Prints Queue
                    </Text>
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
                    <Text size="5xl" weight="bold">
                        Prints Queue
                    </Text>
                    <Text size="base">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </div>
                <EmptyHistory
                    type="prints"
                    description="No users have scheduled any prints."
                    title="Empty Schedule"
                />
            </>
        );
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedHistory = prints.slice(startIndex, endIndex);
    const currentTotalPages = Math.ceil(prints.length / ITEMS_PER_PAGE);

    return (
        <>
            <div className="md:mb-4 mb-2 flex flex-col text-left">
                <Text size="5xl" weight="bold">
                    Prints Queue
                </Text>
                <Text size="base">
                    Last updated: {new Date().toLocaleDateString()}
                </Text>
            </div>
            <div className="relative flex justify-between md:py-0 py-3 flex-row items-center z-40">
                <ViewType setViewType={setViewType} viewType={viewType} />
            </div>
            {viewType ? (
                <TableView
                    documentResult={paginatedHistory}
                    page_type="shopkeeper_page"
                />
            ) : (
                <GridView
                    documentResult={paginatedHistory}
                    page_type="shopkeeper_page"
                />
            )}

            {prints.length > ITEMS_PER_PAGE && (
                <div className="mt-6 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    className={
                                        currentPage === 1
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>

                            {getPaginationItems().map((item, index) => {
                                if (
                                    item === "ellipsis-start" ||
                                    item === "ellipsis-end"
                                ) {
                                    return (
                                        <PaginationItem
                                            key={`ellipsis-${index}`}
                                        >
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                }

                                const pageNum = item as number;
                                return (
                                    <PaginationItem key={pageNum}>
                                        <PaginationLink
                                            onClick={() =>
                                                handlePageChange(pageNum)
                                            }
                                            isActive={currentPage === pageNum}
                                            className="cursor-pointer"
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    className={
                                        currentPage === currentTotalPages
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </>
    );
}

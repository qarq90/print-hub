"use client";
import { Text } from "@/components/ui/text";
import { DocumentType } from "@/interfaces/Document";
import { useEffect, useState } from "react";
import { LuX, LuCheck, LuClock, LuList } from "react-icons/lu";
import { homeDataRecords } from "@/functions/supabase";

export default function Client() {
    const [trackGridData, setTrackGridData] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data, error: fetchError } = await homeDataRecords();

                if (fetchError) {
                    throw fetchError;
                }

                if (data) {
                    setTrackGridData(data);
                }
            } catch (err) {
                console.error("Failed to fetch tracking data:", err);
                setError("Failed to load print records. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <LuCheck className="text-green-500" />;
            case 'cancelled':
                return <LuX className="text-red-500" />;
            default:
                return <LuClock className="text-yellow-500" />;
        }
    };

    return (
        <div className="flex flex-col gap-12 py-8">
            <div className="flex flex-col gap-6 w-full mx-auto my-72">
                <Text weight="bold" className="md:text-7xl text-5xl text-center">Recent Print Activity</Text>
                {loading ? (
                    <div className="flex items-center justify-center p-8">
                        <Text weight="medium">Loading print records...</Text>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center p-8">
                        <Text weight="medium" className="text-red-500">{error}</Text>
                    </div>
                ) : trackGridData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 gap-2">
                        <LuList className="h-8 w-8" />
                        <Text weight="medium">No print records found</Text>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        {trackGridData.map((doc) => (
                            <div key={doc.document_id} className="rounded-lg border border-foreground/10 p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Text weight="semibold" className="truncate">{doc.file_name}</Text>
                                        <Text size="sm">
                                            {doc.user_name} - {new Date(doc.uploaded_at).toLocaleString()}
                                        </Text>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(doc.print_status)}
                                        <Text className="capitalize">
                                            {doc.print_status}
                                        </Text>
                                    </div>
                                </div>
                                <div className="mt-2 flex justify-between items-center">
                                    <Text>
                                        {doc.page_count} page{doc.page_count !== 1 ? 's' : ''} - {doc.print_count} cop{doc.print_count !== 1 ? 'ies' : 'y'}
                                    </Text>
                                    <Text className="font-medium">
                                        ₹{(doc.page_count * doc.print_count * 2).toFixed(2)}
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
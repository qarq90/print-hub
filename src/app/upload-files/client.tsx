"use client";
import React, { useState } from "react";
import { Text } from "@/components/ui/text";
import { DocumentType } from "@/interfaces/Document";
import { FileUpload } from "@/components/ui/file-input";
import { LuMinus, LuPlus, LuTrash } from "react-icons/lu";
import { MainLayout } from "@/components/layouts/MainLayout";
import { getPDFPageCount } from "@/functions/file";
import { getFormatDate, getFileType, getFileSize } from "@/functions/file";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { uploadToPinata } from "@/functions/pinata";
import { insertSupabase } from "@/functions/supabase";
import { UserProps } from "@/interfaces/User";
import { useRouter } from "next/navigation";
import { FullLoader } from "@/components/ui/loader";
import { PinataResult } from "@/interfaces/Pinata";

interface ClientProps {
    user: UserProps;
}

export default function Client({ user }: ClientProps) {
    const [selectedFiles, setSelectedFiles] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const router = useRouter();

    const handleFiles = async (files: File[]) => {
        const processedFiles = await Promise.all(
            files.map(async (file): Promise<DocumentType> => {
                const fileType = getFileType(file.type);
                let pageCount = 1;

                switch (fileType) {
                    case ".pdf":
                        pageCount = await getPDFPageCount(file);
                        break;
                    case ".png":
                    case ".jpeg":
                    case ".jpg":
                    case ".gif":
                    case ".webp":
                        pageCount = 1;
                        break;
                }

                return {
                    file_name: file.name,
                    file_type: fileType,
                    print_count: 1,
                    page_count: pageCount,
                    print_type: "double_side",
                    print_color: "b/w",
                    print_status: "pending",
                    uploaded_at: getFormatDate(new Date()),
                    original_file: file,
                };
            })
        );
        setSelectedFiles([...selectedFiles, ...processedFiles]);
    };

    const incrementPrintCount = (index: number) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.map((file, i) =>
                i === index ? { ...file, print_count: file.print_count + 1 } : file
            )
        );
    };

    const decrementPrintCount = (index: number) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.map((file, i) =>
                i === index
                    ? { ...file, print_count: Math.max(1, file.print_count - 1) }
                    : file
            )
        );
    };

    const togglePrintType = (index: number) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.map((file, i) =>
                i === index
                    ? {
                        ...file,
                        print_type:
                            file.print_type === "single_side" ? "double_side" : "single_side",
                    }
                    : file
            )
        );
    };

    const togglePrintColor = (index: number) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.map((file, i) =>
                i === index
                    ? {
                        ...file,
                        print_color: file.print_color === "b/w" ? "colored" : "b/w",
                    }
                    : file
            )
        );
    };

    const handleDeleteFile = (index: number) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const submitHandler = async () => {
        setLoading(true);
        await Promise.all(
            selectedFiles.map(async (file) => {
                try {
                    const pinataResult: PinataResult = await uploadToPinata(file);
                    const supabaseResult = await insertSupabase(user, file, pinataResult);
                    if (supabaseResult.status) {
                        setLoading(false);
                        router.push("/user/history");
                    }
                } catch (e) {
                    console.log("Something went wrong");
                } finally {
                    setSelectedFiles([]);
                    setLoading(false);
                }
            })
        );
    };

    return (
        <>
            <MainLayout>
                <div className="space-y-4">
                    <Text size="5xl" weight="bold">
                        Upload Files
                    </Text>
                    <div className="w-full flex justify-center items-center">
                        <FileUpload handleFiles={handleFiles} ref={fileInputRef} />
                    </div>

                    {selectedFiles.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {selectedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="transition-colors rounded-lg border border-foreground/10 shadow-sm overflow-hidden hover:shadow-md"
                                    >
                                        <div className="p-4 flex flex-col space-y-3">
                                            <h3 className="text-lg font-medium text-foreground truncate flex-1">
                                                {file.file_name}
                                            </h3>
                                            <div className="flex flex-row justify-between items-center">
                                                <p className="text-sm text-foreground/70">
                                                    {getFileType(file.file_type)}
                                                </p>
                                                <LuTrash
                                                    onClick={() => handleDeleteFile(index)}
                                                    size={24}
                                                    className="p-1 mt-1 bg-red-700 hover:bg-foreground hover:text-background cursor-pointer rounded-sm ml-2"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 gap-2">
                                                <div className="grid grid-cols-2 items-center">
                                                    <span className="text-foreground/70">Size:</span>
                                                    <span className="text-foreground font-medium text-right">
                                                        {file.original_file
                                                            ? getFileSize(file.original_file.size)
                                                            : "N/A"}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 items-center">
                                                    <span className="text-foreground/70">Pages:</span>
                                                    <span className="text-foreground font-medium text-right">
                                                        {file.page_count}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-foreground/70">Sided :</span>
                                                    <span
                                                        onClick={() => togglePrintType(index)}
                                                        className={cn(
                                                            "cursor-pointer rounded-md transition-colors text-right",
                                                            file.print_type !== "single_side"
                                                                ? "text-foreground"
                                                                : "bg-foreground/10 px-2 py-0.5 hover:bg-foreground/20"
                                                        )}
                                                    >
                                                        {file.print_type === "single_side"
                                                            ? "Single Side"
                                                            : "Double Side"}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-foreground/70">Color :</span>
                                                    <span
                                                        onClick={() => togglePrintColor(index)}
                                                        className={cn(
                                                            "cursor-pointer rounded-md transition-colors text-right",
                                                            file.print_color === "b/w"
                                                                ? "text-foreground"
                                                                : "bg-foreground/10 px-2 py-0.5 hover:bg-foreground/20"
                                                        )}
                                                    >
                                                        {file.print_color === "b/w"
                                                            ? "Black & White"
                                                            : "Colored"}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 items-center">
                                                    <span className="text-foreground/70">Copies:</span>
                                                    <div className="flex justify-end gap-2 items-center">
                                                        <LuMinus
                                                            size={24}
                                                            className={cn(
                                                                "p-1 mt-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm",
                                                                file.print_count <= 1 &&
                                                                "opacity-50 cursor-not-allowed pointer-events-none hover:bg-foreground/10"
                                                            )}
                                                            onClick={() =>
                                                                file.print_count > 1 && decrementPrintCount(index)
                                                            }
                                                        />
                                                        <span className="text-foreground font-medium w-6 text-center">
                                                            {file.print_count}
                                                        </span>
                                                        <LuPlus
                                                            size={24}
                                                            onClick={() => incrementPrintCount(index)}
                                                            className="p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="w-full my-10 grid grid-cols-1 md:grid-cols-3 gap-3">
                                <Button
                                    variant="destructive"
                                    onClick={() => setSelectedFiles([])}
                                >
                                    Clear all
                                </Button>
                                <Button variant="outline" onClick={triggerFileInput}>
                                    Add more files
                                </Button>
                                <Button onClick={submitHandler}>Submit</Button>
                            </div>
                        </>
                    )}
                </div>
            </MainLayout>
            {loading && <FullLoader />}
        </>
    );
}
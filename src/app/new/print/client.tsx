"use client";;
import React, { useState } from "react";
import { Text } from "@/components/ui/text";
import { PrintType } from "@/interfaces/Print";
import { FileUpload } from "@/components/ui/file-input";
import { LuCheckCheck, LuMinus, LuPlus, LuTrash } from "react-icons/lu";
import { getPDFPageCount } from "@/functions/file";
import { getFormatDate, getFileType, getFileSize } from "@/functions/file";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { uploadToPinata } from "@/functions/pinata";
import { UserProps } from "@/interfaces/User";
import { useRouter } from "next/navigation";
import { FullLoader } from "@/components/ui/loader";
import { PinataResult } from "@/interfaces/Pinata";
import { Modal } from "@/components/Modal";
import { insertNeon } from "@/functions/neon";

interface ClientProps {
    user: UserProps;
}

export default function Client({ user }: ClientProps) {

    const [selectedFiles, setSelectedFiles] = useState<PrintType[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const router = useRouter();

    const handleFiles = async (files: File[]) => {
        const processedFiles = await Promise.all(
            files.map(async (file): Promise<PrintType> => {
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

                const printColor = "b/w";
                const printType = "double_side";

                const prefix = (fileType === ".pdf" || fileType === ".png" || fileType === ".jpeg" ||
                    fileType === ".jpg" || fileType === ".gif" || fileType === ".webp")
                    ? `${printColor === "b/w" ? "B" : "C"}_${printType === "double_side" ? "D" : "S"}`
                    : "";

                return {
                    file_name: prefix ? `${prefix}_${file.name}` : file.name,
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
            prevFiles.map((file, i) => {
                if (i === index) {
                    const newPrintType = file.print_type === "single_side" ? "double_side" : "single_side";
                    const prefix = `${file.print_color === "b/w" ? "B" : "C"}_${newPrintType === "single_side" ? "S" : "D"}`;

                    const originalName = file.file_name.replace(/^(B|C)_(S|D)_/, '') || file.file_name;

                    return {
                        ...file,
                        print_type: newPrintType,
                        file_name: `${prefix}_${originalName}`
                    };
                }
                return file;
            })
        );
    };

    const togglePrintColor = (index: number) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.map((file, i) => {
                if (i === index) {
                    const newPrintColor = file.print_color === "b/w" ? "colored" : "b/w";
                    const prefix = `${newPrintColor === "b/w" ? "B" : "C"}_${file.print_type === "single_side" ? "S" : "D"}`;

                    const originalName = file.file_name.replace(/^(B|C)_(S|D)_/, '') || file.file_name;

                    return {
                        ...file,
                        print_color: newPrintColor,
                        file_name: `${prefix}_${originalName}`
                    };
                }
                return file;
            })
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
                    const neonResult = await insertNeon(user, file, pinataResult);
                    if (neonResult.status) {
                        setLoading(false);
                        setIsOpen(true)
                        setSelectedFiles([])
                    }
                } catch (e) {
                    console.log("Something went wrong: ", e);
                } finally {
                    setLoading(false);
                }
            })
        );
    };

    return (
        <>
            <section key="files" title="Upload Files">
                <div className="flex flex-col gap-4">
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
                                        className="transition-colors bg-foreground/5 rounded-lg border border-foreground/5 shadow-sm overflow-hidden hover:shadow-md"
                                    >
                                        <div className="p-4 flex flex-col space-y-3">
                                            <h3 className="text-lg font-medium text-foreground truncate flex-1">
                                                {file.file_name.substring(4, file.file_name.length)}
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
                                                    <span className="text-foreground">Sided:</span>
                                                    <div className="flex flex-row gap-2">
                                                        <span
                                                            className={cn(
                                                                "cursor-pointer rounded-md transition-colors text-right px-2 py-0.5",
                                                                file.print_type === "double_side"
                                                                    ? "bg-accent text-black"
                                                                    : "text-foreground",
                                                            )}
                                                            onClick={() => togglePrintType(index)}
                                                        >
                                                            Double Side
                                                        </span>
                                                        <span
                                                            className={cn(
                                                                "cursor-pointer rounded-md transition-colors px-2 py-0.5 text-right",
                                                                file.print_type === "single_side"
                                                                    ? "bg-accent text-black"
                                                                    : "text-foreground",
                                                            )}
                                                            onClick={() => togglePrintType(index)}
                                                        >
                                                            Single Side
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-foreground">Color:</span>
                                                    <div className="flex flex-row gap-2">
                                                        <span
                                                            className={cn(
                                                                "cursor-pointer rounded-md transition-colors text-right px-2 py-0.5",
                                                                file.print_color === "b/w"
                                                                    ? "bg-accent text-black"
                                                                    : "text-foreground",
                                                            )}
                                                            onClick={() => togglePrintColor(index)}
                                                        >
                                                            Black and White
                                                        </span>
                                                        <span
                                                            className={cn(
                                                                "cursor-pointer rounded-md transition-colors text-right px-2 py-0.5",
                                                                file.print_color === "colored"
                                                                    ? "bg-accent text-black"
                                                                    : "text-foreground",
                                                            )}
                                                            onClick={() => togglePrintColor(index)}
                                                        >
                                                            Colored
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 items-center">
                                                    <span className="text-foreground/70">Copies:</span>
                                                    <div className="flex justify-end gap-2 items-center">
                                                        <LuMinus
                                                            size={24}
                                                            className={cn(
                                                                "p-1 mt-1 bg-foreground/10 hover:text-black hover:bg-accent cursor-pointer rounded-sm",
                                                                file.print_count <= 1 &&
                                                                "opacity-50 cursor-not-allowed pointer-events-none hover:bg-accent"
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
                                                            className="p-1 bg-foreground/10 hover:bg-accent hover:text-black cursor-pointer rounded-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="w-full my-10 grid grid-cols-3 gap-3">
                                <Button
                                    variant="destructive"
                                    onClick={() => setSelectedFiles([])}
                                >
                                    Clear all
                                </Button>
                                <Button variant="foreground" onClick={triggerFileInput}>
                                    Add more files
                                </Button>
                                <Button onClick={submitHandler}>Submit</Button>
                            </div>
                        </>
                    )}
                </div>
                {loading && <FullLoader />}
                {isOpen && (
                    <Modal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        closeOnOutsideClick
                        closeOnEsc
                    >
                        <div className="p-6">
                            <div className="flex flex-col justify-center items-center gap-4 text-center">
                                <LuCheckCheck size={48} color="accent" />
                                <h3 className="mt-2 text-lg text-center font-medium">
                                    Files Uploaded Successfully!
                                </h3>
                                <div className="">
                                    <p className="text-sm">
                                        Your files have been queued for printing.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setSelectedFiles([]);
                                    }}
                                >
                                    Upload More Files
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push('/user/prints');
                                    }}
                                >
                                    View Print History
                                </Button>
                            </div>
                        </div>
                    </Modal>
                )}
            </section>
        </ >
    );
}
"use client";
import React, { useState } from "react"
import { Text } from "@/components/ui/text"
import { DocumentType } from "@/interfaces/Document";
import { FileUpload } from "@/components/ui/file-input"
import { LuMinus, LuPlus, LuTrash } from "react-icons/lu";
import { MainLayout } from "@/components/layouts/MainLayout"
import { getPDFPageCount, getDOCXPageCount } from "@/functions/file";
import { getFormatDate, getFileType, getPPTXPageCount, getXLSXPageCount, getFileSize } from "@/functions/file";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { uploadToPinata } from "@/functions/pinata";
import { insertSupabase } from "@/functions/supabase";
import { UserProps } from "@/interfaces/User";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";
interface ClientProps {
    user: UserProps;
}

export default function Client({ user }: ClientProps) {
    const [selectedFiles, setSelectedFiles] = useState<DocumentType[]>([])
    const [loading, setLoading] = useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const router = useRouter()

    const handleFiles = async (files: File[]) => {
        const processedFiles = await Promise.all(
            files.map(async (file): Promise<DocumentType> => {
                const fileType = getFileType(file.type);
                let pageCount = 1;

                switch (fileType) {
                    case ".pdf":
                        pageCount = await getPDFPageCount(file)
                        break;
                    case ".docx":
                        pageCount = await getDOCXPageCount(file)
                        break;
                    case ".xlsx":
                        pageCount = await getXLSXPageCount(file)
                        break
                    case ".pptx":
                        pageCount = await getPPTXPageCount(file)
                        break
                    case '.png':
                    case '.jpeg':
                    case '.jpg':
                    case '.gif':
                    case '.webp':
                        pageCount = 1;
                        break;
                }

                return {
                    file_name: file.name,
                    file_type: fileType,
                    print_count: 1,
                    page_count: pageCount,
                    print_status: "pending",
                    uploaded_at: getFormatDate(new Date()),
                    original_file: file,
                };
            })
        );
        setSelectedFiles([...selectedFiles, ...processedFiles])
    };

    const incrementPrintCount = (index: number) => {
        setSelectedFiles(prevFiles =>
            prevFiles.map((file, i) =>
                i === index ? { ...file, print_count: file.print_count + 1 } : file
            )
        );
    };

    const decrementPrintCount = (index: number) => {
        setSelectedFiles(prevFiles =>
            prevFiles.map((file, i) =>
                i === index ? { ...file, print_count: Math.max(1, file.print_count - 1) } : file
            )
        );
    };

    const handleDeleteFile = (index: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const submitHandler = async () => {
        setLoading(true)
        await Promise.all(
            selectedFiles.map(async (file) => {
                try {
                    const pinataResult = await uploadToPinata(file)
                    const supabaseResult = await insertSupabase(user, file, pinataResult)
                    if (supabaseResult.status) {
                        setLoading(false)
                        router.push("/user/history")
                    }
                } catch (e) {
                    console.log("Something went wrong")
                }
                finally {
                    setSelectedFiles([])
                    setLoading(false)
                }
            }
            )
        )
    }

    return (
        <>
            <MainLayout>
                <Text size="5xl" weight="bold">Upload Files</Text>
                <div className="w-full flex justify-center items-center">
                    <FileUpload handleFiles={handleFiles} ref={fileInputRef} />
                </div>
                {
                    selectedFiles.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-8">
                                {
                                    selectedFiles.map((file, index) => (
                                        <div className="flex flex-col gap-8" key={index}>
                                            <div
                                                className="transition-colors rounded-lg border border-foreground/10 shadow-sm overflow-hidden hover:shadow-md"
                                            >
                                                <div className="p-4 flex flex-col space-y-2">
                                                    <h3 className="text-lg font-medium text-foreground truncate">
                                                        {file.file_name}
                                                    </h3>
                                                    <div className="w-full flex flex-row items-center justify-between text-sm">
                                                        <p className="text-sm text-foreground/70">
                                                            {getFileType(file.file_type)}
                                                        </p>
                                                        <LuTrash onClick={() => handleDeleteFile(index)} size={24} className="p-1 bg-red-700 hover:bg-foreground hover:text-background cursor-pointer rounded-sm" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-foreground/70">Size :</span>
                                                            <span className="text-foreground font-medium">{file.original_file ? getFileSize(file.original_file.size) : "N/A"}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-foreground/70">Pages :</span>
                                                            <span className="text-foreground font-medium">{file.page_count}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-foreground/70">Copies :</span>
                                                            <span className="text-foreground flex gap-3 font-medium">
                                                                <LuMinus
                                                                    size={24}
                                                                    className={cn(
                                                                        "p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm",
                                                                        file.print_count <= 1 && "opacity-50 cursor-not-allowed pointer-events-none hover:bg-foreground/10"
                                                                    )}
                                                                    onClick={() => file.print_count > 1 && decrementPrintCount(index)}
                                                                />
                                                                {file.print_count}
                                                                <LuPlus
                                                                    size={24}
                                                                    onClick={() => incrementPrintCount(index)}
                                                                    className="p-1 bg-foreground/10 hover:bg-foreground hover:text-background cursor-pointer rounded-sm"
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
                                <Button variant="destructive" onClick={() => setSelectedFiles([])}>Clear all</Button>
                                <Button variant="outline" onClick={triggerFileInput}>Add more files</Button>
                                <Button className="md:col-span-1 col-span-2" onClick={submitHandler}>Submit</Button>
                            </div>
                        </>
                    )
                }
            </MainLayout>
            {loading && <Loader />}
        </>
    )
}
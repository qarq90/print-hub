import * as React from "react"
import { cn } from "@/lib/utils"
import { LuUpload } from "react-icons/lu"
import { Text } from "./text"

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    description?: string
    supportedFormats?: string
    handleFiles: (files: File[]) => void
    isFilesSelected?: boolean
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
    ({ className, label = "Click to upload or drag and drop", description = ".pdf, .png, .jpeg, .jpg", supportedFormats, handleFiles, isFilesSelected, ...props }, ref) => {

        const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                handleFiles(Array.from(e.target.files));
            }
        };

        return (
            <div className="w-full flex flex-col my-3">
                <div
                    className={cn(
                        "flex items-center justify-center w-full rounded-lg border border-foreground/5 hover:scale-105 bg-foreground/5",
                        isFilesSelected && "hidden"
                    )}
                >
                    <label
                        htmlFor={props.id}
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-80 md:h-[425px] rounded-lg cursor-pointer",
                            "border-border hover:bg-accent/10",
                            "transition-colors duration-200 ease-in-out",
                            className
                        )}
                    >
                        <div className="flex flex-col items-center justify-center py-6">
                            <LuUpload className="w-8 h-8 mb-4" />
                            <p className="mb-2 text-sm">
                                <span className="font-semibold">{label}</span>
                            </p>
                            <p className="text-xs">
                                {supportedFormats || description}
                            </p>
                        </div>
                        <input
                            ref={ref}
                            multiple
                            type="file"
                            className="hidden"
                            accept=".pdf,.png,.jpeg,.jpg,application/pdf,image/png,image/jpeg"
                            onChange={onFileChange}
                            {...props}
                        />
                    </label>
                </div>
                {
                    isFilesSelected && (
                        <Text className="text-3xl md:text-5xl">
                            Selected Files
                        </Text>
                    )
                }
            </div>
        )
    }
)

FileUpload.displayName = "FileUpload"

export { FileUpload }
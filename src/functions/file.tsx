import { PDFDocument } from "pdf-lib";
import { LuFileText, LuFile, LuFileImage, LuFileArchive, LuFileInput } from "react-icons/lu";
import { DocumentType } from "@/interfaces/Document";

export const getFileType = (mimeType: string): string => {
    const mimeToExtension: Record<string, string> = {
        "application/msword": ".doc",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            ".docx",
        "application/vnd.oasis.opendocument.text": ".odt",
        "application/rtf": ".rtf",
        "text/plain": ".txt",

        "application/vnd.ms-excel": ".xls",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            ".xlsx",
        "application/vnd.oasis.opendocument.spreadsheet": ".ods",
        "text/csv": ".csv",

        "application/vnd.ms-powerpoint": ".ppt",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            ".pptx",
        "application/vnd.oasis.opendocument.presentation": ".odp",

        "application/pdf": ".pdf",

        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/gif": ".gif",
        "image/svg+xml": ".svg",
        "image/webp": ".webp",
        "image/tiff": ".tiff",
        "image/bmp": ".bmp",
        "image/vnd.adobe.photoshop": ".psd",

        "application/zip": ".zip",
        "application/x-rar-compressed": ".rar",
        "application/x-7z-compressed": ".7z",
        "application/x-tar": ".tar",
        "application/gzip": ".gz",

        "application/json": ".json",
        "application/xml": ".xml",
        "text/html": ".html",
        "text/css": ".css",
        "application/javascript": ".js",
        "application/x-sh": ".sh",
    };

    return (
        mimeToExtension[mimeType] ||
        (mimeType ? `.${mimeType.split("/").pop()?.split(".").pop()}` : "")
    );
};

export const getFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFormatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

export const getPDFPageCount = async (file: File): Promise<number> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        return pdfDoc.getPageCount();
    } catch (e) {
        console.error("Error estimating PDF page count:", e);
        return 1;
    }
};

export const getFileTypeIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
        case "image":
            return <LuFileImage />;
        case "pdf":
            return <LuFileText />;
        case "word":
            return <LuFileInput />;
        case "archive":
            return <LuFileArchive />;
        default:
            return <LuFile />;
    }
};

export const formatFileType = (fileType: string) => {
    return fileType.charAt(0).toUpperCase() + fileType.slice(1).toLowerCase();
};

export const calculateCost = (doc: DocumentType) => {
    return (
        doc.page_count *
        doc.print_count *
        (doc.print_color === "colored" ? 10 : 2)
    );
};

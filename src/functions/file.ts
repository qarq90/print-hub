import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

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

export const getDOCXPageCount = async (file: File): Promise<number> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);

        const documentFile = zip.file("word/document.xml");
        if (!documentFile) {
            console.warn("DOCX file is missing document.xml");
            return 1;
        }

        const documentXml = await documentFile.async("text");
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(documentXml, "text/xml");

        const pageBreaks = xmlDoc.getElementsByTagName(
            "w:lastRenderedPageBreak"
        ).length;
        const sectionBreaks = xmlDoc.getElementsByTagName("w:sectPr").length;
        const paragraphs = xmlDoc.getElementsByTagName("w:p").length;

        return Math.max(
            pageBreaks || sectionBreaks || Math.ceil(paragraphs / 15)
        );
    } catch (error) {
        console.error("Error estimating DOCX page count:", error);
        return 1;
    }
};

export const getXLSXPageCount = async (file: File): Promise<number> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);

        const worksheets = zip.file(/xl\/worksheets\/sheet\d+\.xml/);
        const sheetCount = worksheets.length;

        let totalPages = sheetCount;

        const workbook = zip.file("xl/workbook.xml");
        if (workbook) {
            const workbookXml = await workbook.async("text");
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(workbookXml, "text/xml");

            const definedNames = xmlDoc.getElementsByTagName("definedName");
            totalPages =
                Array.from(definedNames).filter((n) =>
                    n.textContent?.includes("Print_Area")
                ).length || sheetCount;
        }

        return Math.max(1, totalPages);
    } catch (error) {
        console.error("Error estimating XLSX page count:", error);
        return 1;
    }
};

export const getPPTXPageCount = async (file: File): Promise<number> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);

        const slides = zip.file(/ppt\/slides\/slide\d+\.xml/);
        const notes = zip.file(/ppt\/notesSlides\/notesSlide\d+\.xml/);

        const slideCount = slides.length;
        const notesCount = notes.length;

        const presentation = zip.file("ppt/presentation.xml");
        let hiddenSlides = 0;

        if (presentation) {
            const presXml = await presentation.async("text");
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(presXml, "text/xml");
            hiddenSlides =
                xmlDoc.getElementsByTagName("p:sldId").length - slideCount;
        }

        return Math.max(1, slideCount + notesCount + hiddenSlides);
    } catch (error) {
        console.error("Error estimating PPTX page count:", error);
        return 1;
    }
};

import { DocumentType } from "@/interfaces/Document";

export const uploadToPinata = async (file: DocumentType) => {
    try {
        if (!file) {
            alert("No file selected");
            return;
        }

        if (!file.original_file) {
            console.warn("File has no original_file property", file);
            return;
        }

        const data = new FormData();
        data.set("file", file.original_file);

        const uploadRequest = await fetch("/api/post/file", {
            method: "POST",
            body: data,
        });

        if (!uploadRequest.ok) {
            throw new Error(`Upload failed for file: ${file.file_name}`);
        }

        return await uploadRequest.json();
    } catch (e) {
        console.error(e);
        alert("Error uploading file");
    }
};

import { DocumentType } from "@/interfaces/Document";
import { pinata } from "@/lib/pinata/config";

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

        const renamedFile = new File([file.original_file], file.file_name, {
            type: file.original_file.type,
        });

        const data = new FormData();
        data.set("file", renamedFile);

        const uploadRequest = await fetch("/api/post/upload-files", {
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

export const deleteFromPinata = async (file: DocumentType) => {
    try {
        const response = await fetch("/api/delete/delete-file", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: file.document_id }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error:
                    data.error || `Failed to delete file (${response.status})`,
            };
        }

        return { success: true, data };
    } catch (e) {
        const error = e instanceof Error ? e.message : "Connection failed";
        console.error("Deletion error:", error);
        return { success: false, error };
    }
};

export const updateFromPinata = async (file: DocumentType) => {
    try {
        if (!file.document_id) {
            throw new Error("Missing document ID");
        }

        const response = await fetch("/api/post/update-file", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: file.document_id,
                file_name: file.file_name,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.error || "Failed to update file in Pinata"
            );
        }

        return await response.json();
    } catch (e) {
        console.error("Pinata update error:", e);
        throw e;
    }
};

export const viewFile = async (file: DocumentType) => {
    try {
        const downloadUrl = file.ipfs_cid?.toString();
        window.open(downloadUrl);
    } catch (error) {
        console.error("Download failed:", error);
    }
};

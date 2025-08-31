export interface PrintType {
    document_id?: string;
    user_id?: string;
    user_name?: string;
    file_name: string;
    file_type: string;
    print_count: number;
    page_count: number;
    print_type: "single_side" | "double_side";
    print_color: "colored" | "b/w";
    print_status: "pending" | "completed" | "cancelled";
    ipfs_cid?: string;
    uploaded_at: string;
    original_file?: File;
}

export interface PrintRecord {
    "print-id": string;
    "user-id": string;
    "user-name": string;
    "file-name": string;
    "file-type": string;
    "print-count": number;
    "page-count": number;
    "print-type": "single_side" | "double_side";
    "print-color": "colored" | "b/w";
    "print-status": "pending" | "completed" | "cancelled";
    "ipfs-link": string;
    "uploaded-at": string;
}

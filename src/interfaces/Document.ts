export interface DocumentType {
    document_id?: string;
    user_id?: string;
    user_name?: string;
    original_file?: File;
    file_name: string;
    file_type: string;
    print_count: number;
    page_count: number;
    print_status: "pending" | "completed" | "cancelled";
    uploaded_at: string;
}

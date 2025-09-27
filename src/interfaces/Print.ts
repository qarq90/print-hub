export interface PrintType {
    file_name: string;
    file_type: string;
    print_count: number;
    page_count: number;
    print_type: "single_side" | "double_side";
    print_color: "colored" | "b/w";
    print_status: "pending" | "completed" | "cancelled";
    binding_type: "no" | "bind";
    instructions: string;
    uploaded_at: string;
    hashed_content?: string;
    original_file?: File;
}

export interface PrintRecord {
    // Core identifiers
    print_id: string;
    user_id: string;
    user_name: string;
    uploaded_at: string;

    // File information
    file_name: string;
    file_type: string;
    ipfs_id: string;
    ipfs_link: string;
    hashed_content: string;

    // Print specifications
    print_count: number;
    page_count: number;
    print_type: "single_side" | "double_side";
    print_color: "colored" | "b/w";
    binding_type: "no" | "bind";
    instructions: string;

    // Status
    print_status: "pending" | "completed" | "cancelled";
}

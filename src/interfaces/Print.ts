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
    payment_status?: "paid" | "unpaid";
}

export interface PrintRecord {
    print_id: string;
    user_id: string;
    user_name: string;
    uploaded_at: string;
    file_name: string;
    file_type: string;
    ipfs_id: string;
    ipfs_link: string;
    hashed_content: string;
    print_count: number;
    page_count: number;
    print_type: "single_side" | "double_side";
    print_color: "colored" | "b/w";
    binding_type: "no" | "bind";
    instructions: string;
    print_status: "pending" | "completed" | "cancelled";
    payment_status: "paid" | "unpaid";
}

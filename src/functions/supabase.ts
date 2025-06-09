import { DocumentType } from "@/interfaces/Document";
import { PinataResult } from "@/interfaces/Pinata";
import { supabase } from "@/lib/supabase/client";
import { getFormatDate } from "./file";
import { UserProps } from "@/interfaces/User";

export const insertSupabase = async (
    user: UserProps,
    file: DocumentType,
    pinataResult: PinataResult
) => {
    try {
        if (file.print_type === "double_side") {
            file.page_count = file.page_count;
        } else {
            file.page_count = file.page_count * 2;
        }
        const { data: data } = await supabase
            .from("prints")
            .insert({
                document_id: pinataResult.id,
                user_id: user.id,
                user_name: user.fullName,
                file_name: file.file_name,
                file_type: file.file_type,
                print_count: file.print_count,
                page_count: file.page_count + 1,
                print_type: file.print_type,
                print_color: file.print_color,
                print_status: "pending",
                ipfs_cid: pinataResult.ipfs_url,
                uploaded_at: getFormatDate(new Date()),
            })
            .select();

        return { data, error: null, status: true };
    } catch (error) {
        console.error("Error inserting to Supabase:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

export const fetchUserHistory = async (user: UserProps) => {
    try {
        const { data: data } = await supabase
            .from("prints")
            .select("*")
            .or(`user_id.eq.${user.id}`)
            .order("uploaded_at", { ascending: false });

        return { data, error: null, status: true };
    } catch (error) {
        console.error("Error inserting to Supabase:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

export const fetchTodaysQueue = async () => {
    try {
        const { data: data } = await supabase
            .from("prints")
            .select("*")
            .or(`print_status.eq.${"pending"}`)
            .order("uploaded_at", { ascending: false });

        return { data, error: null, status: true };
    } catch (error) {
        console.error("Error inserting to Supabase:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

export const homeDataRecords = async () => {
    try {
        const { data: pending } = await supabase
            .from("prints")
            .select("*")
            .eq("print_status", "pending")
            .order("uploaded_at", { ascending: false })
            .limit(2);

        const { data: completed } = await supabase
            .from("prints")
            .select("*")
            .eq("print_status", "completed")
            .order("uploaded_at", { ascending: false })
            .limit(2);

        const { data: cancelled } = await supabase
            .from("prints")
            .select("*")
            .eq("print_status", "cancelled")
            .order("uploaded_at", { ascending: false })
            .limit(2);

        const { data: random } = await supabase
            .from("prints")
            .select("*")
            .order("uploaded_at", { ascending: true })
            .limit(2);

        const data = [
            ...(pending || []),
            ...(completed || []),
            ...(cancelled || []),
            ...(random || []),
        ];

        return { data, error: null, status: true };
    } catch (error) {
        console.error("Error fetching from Supabase:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

export const updateDocument = async (document: DocumentType) => {
    try {
        if (document.print_type === "double_side") {
            document.page_count = Math.ceil(document.page_count / 2);
        } else {
            document.page_count = Math.ceil(document.page_count * 2);
        }
        const { error } = await supabase
            .from("prints")
            .update({
                page_count: document.page_count,
                print_count: document.print_count,
                print_type: document.print_type,
                print_color: document.print_color,
            })
            .eq("document_id", document.document_id)
            .select();

        if (error) throw error;

        return true;
    } catch (error) {
        console.error("Error updating document in Supabase:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

export const deleteDocument = async (document: DocumentType) => {
    try {
        const { error } = await supabase
            .from("prints")
            .delete()
            .eq("document_id", document.document_id)
            .select();

        if (error) {
            throw error;
        }

        return true;
    } catch (error) {
        console.error("Error deleting document from Supabase:", error);

        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

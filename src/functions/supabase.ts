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
        const { data: data } = await supabase
            .from("prints")
            .insert({
                user_id: user.id,
                user_name: user.fullName,
                file_name: file.file_name,
                file_type: file.file_type,
                print_count: file.print_count,
                page_count: file.page_count + 1,
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

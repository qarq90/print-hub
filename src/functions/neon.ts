import { DocumentType, PrintRecord } from "@/interfaces/Document";
import { PinataResult } from "@/interfaces/Pinata";
import { UserProps } from "@/interfaces/User";
import pool from "@/lib/neon/config";
import { getFormatDate } from "./file";

export const insertNeon = async (
    user: UserProps,
    file: DocumentType,
    pinataResult: PinataResult
) => {
    try {
        const pageCount =
            file.print_type === "double_side"
                ? file.page_count
                : file.page_count * 2;

        const query = `
        INSERT INTO "prints" (
            "print-id",
            "page-count",
            "print-type",
            "print-color",
            "print-count",
            "print-status",
            "ipfs-link",
            "file-name",
            "file-type",
            "user-name",
            "user-id",
            "uploaded-at"
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        RETURNING *;
    `;

        const values = [
            pinataResult.id,
            pageCount,
            file.print_type,
            file.print_color,
            file.print_count,
            "pending",
            pinataResult.ipfs_url,
            file.file_name.substring(4),
            file.file_type,
            user.fullName,
            user.id,
            getFormatDate(new Date()),
        ];

        const result = await pool.query(query, values);

        return { data: result.rows, error: null, status: true };
    } catch (error) {
        console.error("Error inserting to Neon:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

export const fetchUserHistory = async (user: UserProps) => {
    try {
        const query = `
      SELECT * FROM "prints" 
      WHERE "user-id" = $1 
      ORDER BY "uploaded-at" ASC;
    `;

        const result = await pool.query(query, [user.id]);

        return {
            data: result.rows as PrintRecord[],
            error: null,
            status: true,
        };
    } catch (error) {
        console.error("Error fetching user history:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

export const fetchTodaysQueue = async () => {
    try {
        const query = `
      SELECT * FROM "prints" 
      WHERE "print-status" = $1 
      ORDER BY "uploaded-at" DESC;
    `;

        const result = await pool.query(query, ["pending"]);

        return {
            data: result.rows as PrintRecord[],
            error: null,
            status: true,
        };
    } catch (error) {
        console.error("Error fetching today's queue:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

export const fetchAllPrints = async () => {
    try {
        const query = `
      SELECT * FROM "prints" 
      ORDER BY "uploaded-at" ASC;
    `;

        const result = await pool.query(query);

        return {
            data: result.rows as PrintRecord[],
            error: null,
            status: true,
        };
    } catch (error) {
        console.error("Error fetching all records:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

export const updateDocument = async (document: PrintRecord) => {
    try {
        const query = `
      UPDATE "prints" 
      SET 
        "page-count" = $1,
        "print-count" = $2,
        "print-type" = $3,
        "print-color" = $4
      WHERE "print-id" = $5
      RETURNING *;
    `;

        const values = [
            document["page-count"],
            document["print-count"],
            document["print-type"],
            document["print-color"],
            document["print-id"],
        ];

        const result = await pool.query(query, values);

        return {
            data: result.rows[0] as PrintRecord,
            error: null,
            status: true,
        };
    } catch (error) {
        console.error("Error updating document:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

export const cancelDocument = async (document: PrintRecord) => {
    try {
        const query = `
      UPDATE "prints" 
      SET "print-status" = $1 
      WHERE "print-id" = $2
      RETURNING *;
    `;

        const result = await pool.query(query, [
            "cancelled",
            document["print-id"],
        ]);

        return {
            data: result.rows[0] as PrintRecord,
            error: null,
            status: true,
        };
    } catch (error) {
        console.error("Error cancelling document:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

export const completeDocument = async (document: PrintRecord) => {
    try {
        const query = `
      UPDATE "prints" 
      SET "print-status" = $1 
      WHERE "print-id" = $2
      RETURNING *;
    `;

        const result = await pool.query(query, [
            "completed",
            document["print-id"],
        ]);

        return {
            data: result.rows[0] as PrintRecord,
            error: null,
            status: true,
        };
    } catch (error) {
        console.error("Error completing document:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            status: false,
        };
    }
};

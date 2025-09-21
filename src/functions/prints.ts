import { PrintType, PrintRecord } from "@/interfaces/Print";
import { PinataResult } from "@/interfaces/Pinata";
import { UserProps } from "@/interfaces/User";

export const fetchTodaysQueue = async () => {
    try {
        const response = await fetch("/api/get/neon/prints/todays-queue", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch today's queue");
        }

        return await response.json();
    } catch (e) {
        console.error("Neon fetchTodaysQueue error:", e);
        throw e;
    }
};

export const fetchAllPrints = async () => {
    try {
        const response = await fetch("/api/get/neon/prints/fetch-all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch all prints");
        }

        return await response.json();
    } catch (e) {
        console.error("Neon fetchAllPrints error:", e);
        throw e;
    }
};

export const insertNeon = async (
    user: UserProps,
    file: PrintType,
    pinataResult: PinataResult
) => {
    try {
        const response = await fetch("/api/post/neon/prints/insert-record", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, file, pinataResult }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to insert record");
        }

        return await response.json();
    } catch (e) {
        console.error("Neon insertNeon error:", e);
        throw e;
    }
};

export const fetchUserHistory = async (user: UserProps) => {
    try {
        const response = await fetch("/api/post/neon/prints/user-history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch user history");
        }

        return await response.json();
    } catch (e) {
        console.error("Neon fetchUserHistory error:", e);
        throw e;
    }
};

export const updateDocument = async (document: PrintRecord) => {
    try {
        const response = await fetch("/api/put/neon/prints/update-print", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ document }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update document");
        }

        return await response.json();
    } catch (e) {
        console.error("Neon updateDocument error:", e);
        throw e;
    }
};

export const cancelDocument = async (document: PrintRecord) => {
    try {
        const response = await fetch("/api/patch/neon/prints/cancel-print", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ print_id: document["print-id"] }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to cancel document");
        }

        return await response.json();
    } catch (e) {
        console.error("Neon cancelDocument error:", e);
        throw e;
    }
};

export const completeDocument = async (document: PrintRecord) => {
    try {
        const response = await fetch("/api/patch/neon/prints/complete-print", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ print_id: document["print-id"] }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to complete document");
        }

        return await response.json();
    } catch (e) {
        console.error("Neon completeDocument error:", e);
        throw e;
    }
};

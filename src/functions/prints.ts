import { UserProps } from "@/interfaces/User";
import { PinataResult } from "@/interfaces/Pinata";
import { PrintType, PrintRecord } from "@/interfaces/Print";

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

export const fetchUserUnpaidPrints = async (user: UserProps) => {
    try {
        const response = await fetch("/api/post/neon/prints/user-unpaid", {
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
            body: JSON.stringify({ print_id: document.print_id }),
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

export const paidDocument = async (document: PrintRecord) => {
    try {
        const response = await fetch("/api/patch/neon/prints/paid-print", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ print_id: document.print_id }),
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
            body: JSON.stringify({ print_id: document.print_id }),
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

export const checkExistingHash = async (document: PrintType) => {
    try {
        const response = await fetch("/api/post/neon/prints/check-hash", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                hashed_content: document.hashed_content,
            }),
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

export const getEmptyStateConfig = (page_type: string, statusType: string) => {
    if (page_type === "prints_queue" || page_type === "shopkeeper_page") {
        switch (statusType) {
            case "completed":
                return {
                    title: "No Completed Jobs",
                    description:
                        "There are no completed print jobs in the queue",
                };
            case "cancelled":
                return {
                    title: "No Cancelled Jobs",
                    description:
                        "There are no cancelled print jobs in the queue",
                };
            case "pending":
                return {
                    title: "No Pending Jobs",
                    description: "The print queue is currently empty",
                };
            case "all":
            default:
                return {
                    title: "Empty Queue",
                    description: "No print jobs in the queue",
                };
        }
    }

    if (page_type === "user_history") {
        switch (statusType) {
            case "completed":
                return {
                    title: "No Completed Documents",
                    description: "You haven't completed any print jobs yet",
                };
            case "cancelled":
                return {
                    title: "No Cancelled Documents",
                    description: "You haven't cancelled any print jobs",
                };
            case "pending":
                return {
                    title: "No Pending Documents",
                    description: "You don't have any pending print jobs",
                };
            case "all":
            default:
                return {
                    title: "No Documents",
                    description: "You haven't scheduled any prints yet",
                };
        }
    }

    if (page_type === "admin_page") {
        switch (statusType) {
            case "completed":
                return {
                    title: "No Completed Records",
                    description: "No users have completed any print jobs yet",
                };
            case "cancelled":
                return {
                    title: "No Cancelled Records",
                    description: "No users have cancelled any print jobs",
                };
            case "pending":
                return {
                    title: "No Pending Requests",
                    description:
                        "There are no pending print requests at the moment",
                };
            case "all":
            default:
                return {
                    title: "No Print Records",
                    description: "No print records found in the system",
                };
        }
    }

    return {
        title: "No Documents",
        description: "No documents found for the current selection",
    };
};

export const generatePrintId = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);

    const base64 = btoa(String.fromCharCode(...array))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");

    return base64.slice(0, 64);
};

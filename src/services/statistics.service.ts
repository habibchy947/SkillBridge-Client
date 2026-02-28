import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const statisticsService = {
    getStatistics: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/statistics`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                next: { revalidate: 10 },
            });
            const data = await res.json();
            if (!res.ok) {
                return {
                    data: null,
                    error: {
                        message:
                            data.message || "Failed to fetch Statistics",
                    },
                };
            }
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to fetch statistics!" } };
        }
    },
};
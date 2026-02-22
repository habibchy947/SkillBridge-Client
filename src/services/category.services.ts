import { env } from "@/env"
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const categoryServices = {
    getCategoriesByAdmin: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/categories/admin`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: "no-store",
            });
            const  data  = await res.json();
            if(data.success) {
                return { data: data.data, error: null };
            }
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to fetch categories" } };
        }
    }
}

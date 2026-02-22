import { env } from "@/env";

const API_URL = env.API_URL;

export const tutorServices = {
    getAllTutors: async () => {
        try {
            const res = await fetch(`${API_URL}/tutors`, {
                next: {
                    revalidate: 10
                }
            });
            const data = await res.json();
            if(data.success) {
                return { data: data, error: null }
            };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to fetch categories" } };
        };
    },
};
import { env } from "@/env";

const API_URL = env.API_URL;

interface TutorServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

interface GetTutorParams { 
    category?: string;
    search?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
}

export const tutorServices = {
    getAllTutors: async (params?: GetTutorParams, options?: TutorServiceOptions) => {
        try {
            const url = new URL(`${API_URL}/tutors`);
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if(value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value);
                    }
                });
            }
            const config: RequestInit = {};

            if(options?.cache) {
                config.cache = options.cache
            };
            if(options?.revalidate) {
                config.next = {
                    revalidate: options.revalidate
                }
            }
            config.next = { ...config.next, tags: ["allTutors"] };
            const res = await fetch(url.toString(), config);
            const data = await res.json();
            if (data.success) {
                return { data: data, error: null }
            };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to fetch Tutors" } };
        };
    },
    getTutorById: async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/tutors/${id}`);
            const data = await res.json();
            if (data.success) {
                return { data: data, error: null };
            };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to fetch Tutor" } };
        };
    },
};
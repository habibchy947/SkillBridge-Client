import { env } from "@/env";
import { TutorInput, TutorUpdateInput } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

interface GetTutorParams {
    minRate?: string,
    maxRate?: string,
    minRating?: string,
    category?: string;
    search?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
}

export const tutorServices = {
    createTutorProfile: async (tutor: TutorInput) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/tutors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(tutor),
            });
            const data = await res.json();
            if (!res.ok) {
                return {
                    data: null,
                    error: {
                        message:
                            data.message || "Failed to Create Tutor",
                    },
                };
            }
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to create tutor" } };
        }
    },
    getTutorByUserId: async (options: ServiceOptions) => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/tutors/profile/me`);

            const config: RequestInit = {};

            if (options?.cache) {
                config.cache = options.cache
            };
            if (options?.revalidate) {
                config.next = {
                    revalidate: options.revalidate
                }
            }
            config.next = { ...config.next, tags: ["ownTutor"] };
            config.headers = { Cookie: cookieStore.toString() };

            const res = await fetch(url.toString(), config);
            const data = await res.json();
            if (!res.ok) {
                return {
                    data: null,
                    error: {
                        message:
                            data.message || "Failed to Fetched Tutor",
                    },
                };
            }
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to fetch Tutor" } };
        };
    }
    ,
    getAllTutors: async (params?: GetTutorParams, options?: ServiceOptions) => {
        try {
            const url = new URL(`${API_URL}/tutors`);
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value);
                    }
                });
            }
            const config: RequestInit = {};

            if (options?.cache) {
                config.cache = options.cache
            };
            if (options?.revalidate) {
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
    updateTutor: async (tutor: TutorUpdateInput) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/tutors/profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(tutor),
            });
            const data = await res.json();
            if (!res.ok) {
                return {
                    data: null,
                    error: {
                        message:
                            data.message || "Failed to Update Tutor Profile",
                    },
                };
            }
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to Update Profile" } };
        }
    }
};
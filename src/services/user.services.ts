import { env } from "@/env";
import { GetUsersParams, UserRole, UserStatus } from "@/types";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

interface UsersServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}


export const userServices = {
    getSession: async () => {
        try {
            const cookieStore = await cookies();
            // console.log(cookieStore.get("better-auth.session_token"));

            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const session = await res.json();
            if (session === null) {
                return { data: null, error: { message: "No active session" } };
            }

            return { data: session, error: null };
        } catch (error) {
            console.log("Error fetching session:", error);
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to fetch session" } };
        }
    },
    getAllUsers: async (params?: GetUsersParams, options?: UsersServiceOptions) => {
        try {
            const cookieStore = await cookies();

            const url = new URL(`${API_URL}/admin/users`);
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
            config.next = { ...config.next, tags: ["Users"] };
            config.headers = { Cookie: cookieStore.toString() };

            const res = await fetch(url.toString(), config);
            const data = await res.json();
            if (data.success) {
                return { data: data, error: null }
            };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to fetch Tutors" } };
        };
    },
    updateUserStatus: async (status: UserStatus, id: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/status/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (!res.ok) {
                return {
                    data: null,
                    error: {
                        message:
                            data.message || "Status Updating Failed!",
                    },
                };
            }
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to Update status" } };
        }
    },
}
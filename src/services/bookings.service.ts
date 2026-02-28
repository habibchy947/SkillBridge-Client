import { env } from "@/env";
import { GetBookingsParams } from "@/types/bookings.type";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface BookingServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

export const bookingsService = {
    getAllBookings: async (params?: GetBookingsParams, options?: BookingServiceOptions) => {
        try {
            const cookieStore = await cookies();

            const url = new URL(`${API_URL}/bookings/admin`);
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
            config.next = { ...config.next, tags: ["bookings"] };
            config.headers = { Cookie: cookieStore.toString() };

            const res = await fetch(url.toString(), config);
            const data = await res.json();
            if (!res.ok) {
                return {
                    data: null,
                    error: {
                        message:
                            data.message || "Failed to fetch Bookings",
                    },
                };
            }
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to fetch Bookings" } };
        };
    },
}
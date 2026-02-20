import { cookies } from "next/headers";

export const userServices = {
    getSession: async () => {
        try {
            const cookieStore = await cookies();
            console.log(cookieStore.get("better-auth.session_token"));

            const res = await fetch("http://localhost:5000/api/auth/get-session", {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const session = await res.json();
            if(session === null) {
                return { data: null, error: { message: "No active session" } };
            }

            return { data: session, error: null };
        } catch (error) {
            console.log("Error fetching session:", error);
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to fetch session" } };
        }
    }
}
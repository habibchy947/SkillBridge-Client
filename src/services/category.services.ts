import { env } from "@/env"
import { CategoryData } from "@/types";
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
                next: { tags: ["categories"] }
            });
            const data = await res.json();
            if (data.success) {
                return { data: data.data, error: null };
            }
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to fetch categories" } };
        }
    },
    createCategory: async (categoryData: CategoryData) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(categoryData),
            });
            const data = await res.json();
            if (data.error) {
                return { data: null, error: { message: data.error.message || "Category Creation Failed!" } }
            }
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to create category" } };
        }
    },
    updateCategory: async (categoryData: CategoryData, id: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/categories/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(categoryData),
            });
            const data = await res.json();
            if (data.error) {
                return { data: null, error: { message: data.error.message || "Category Updating Failed!" } }
            }
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to Update category" } };
        }
    },
    deleteCategory: async (id: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/categories/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });
            const data = await res.json();
            if (data.error) {
                return { data: null, error: { message: data.error.message || "Failed to delete this category!" } }
            }
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: error instanceof Error ? error.message : "Failed to delete this category" } };
        }
    }
}

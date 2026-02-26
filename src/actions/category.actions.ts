"use server";

import { categoryServices } from "@/services/category.services";
import { CategoryData } from "@/types";
import { updateTag } from "next/cache";

export const createCategory = async (data: CategoryData) => {
    const res = await categoryServices.createCategory(data);
    updateTag("categories");
    return res;
};

export const updateCategory = async (data: CategoryData ,id: string) => {
    const res = await categoryServices.updateCategory(data, id);
    updateTag("categories");
    return res;
};

export const deleteCategory = async (id: string) => {
    const res = await categoryServices.deleteCategory(id);
    updateTag("categories");
    return res;
};
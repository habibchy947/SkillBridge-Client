"use server";

import { categoryServices } from "@/services/category.services";
import { CategoryData } from "@/types";
import { updateTag } from "next/cache";

export const createCategory = async (data: CategoryData) => {
    const res = await categoryServices.createCategory(data);
    updateTag("categories");
    return res;
}
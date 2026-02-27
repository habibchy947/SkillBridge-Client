"use server";

import { userServices } from "@/services/user.services";
import { UserStatus } from "@/types";
import { updateTag } from "next/cache";

export const updateUserStatus = async (data: UserStatus ,id: string) => {
    const res = await userServices.updateUserStatus(data, id);
    updateTag("Users");
    return res;
};
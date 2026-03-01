"use server";

import { tutorServices } from "@/services/tutor.service";
import { TutorInput, TutorUpdateInput } from "@/types";
import { updateTag } from "next/cache";

export const createTutorProfile = async (data: TutorInput) => {
    const res = await tutorServices.createTutorProfile(data);
    updateTag("allTutors");
    return res;
};

export const updateTutor = async (data: TutorUpdateInput) => {
    const res = await tutorServices.updateTutor(data);
    updateTag("ownTutor");
    updateTag("allTutors")
    return res;
};


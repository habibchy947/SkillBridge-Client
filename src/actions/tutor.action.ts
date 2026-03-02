"use server";

import { tutorServices } from "@/services/tutor.service";
import { TutorInput, TutorUpdateInput } from "@/types";
import { CreateTutorAvailability, UpdateTutorAvailability } from "@/types/tutors.type";
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

export const createTutorAvailability = async (data: CreateTutorAvailability) => {
    const res = await tutorServices.createTutorAvailability(data);
    updateTag("ownSlot")
    return res;
}

export const updateAvailabilitySlot = async (data: UpdateTutorAvailability, id: string) => {
    const res = await tutorServices.updateAvailabilitySlot(data, id);
    updateTag("ownSlot")
    return res;
};


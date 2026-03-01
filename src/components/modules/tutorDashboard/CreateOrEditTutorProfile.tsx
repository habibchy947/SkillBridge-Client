"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { AdminCategory, TutorsPublic } from "@/types";
import { createTutorProfile, updateTutor } from "@/actions/tutor.action";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const tutorSchema = z.object({
    bio: z.string().trim().min(10, "Bio must be at least 10 characters!"),
    hourlyRate: z.number().min(1, "HourlyRate must be at least greater than 0"),
    categoryId: z.string().min(1, "Select a category for tutoring")
})

export default function CreateTutorProfile({ profile, categories }: { profile: any, categories: AdminCategory[] }) {
    const form = useForm({
        defaultValues: {
            bio: profile?.bio ?? "",
            hourlyRate: profile?.hourlyRate ?? 0,
            categoryId: profile?.categoryId ?? "",
        },
        validators: {
            onSubmit: tutorSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading(profile ? "Updating..." : "Creating...")
            try {
                console.log(value)
                if (profile) {
                    const res = await updateTutor(value);
                    console.log(res.data);
                    if (res.error) {
                        toast.error(res.error.message, { id: toastId })
                        return;
                    }
                    if (res.data.success === false) {
                        toast.error(res.data.message, { id: toastId })
                        return;
                    }
                    toast.success("Your Profile Updated Successfully", { id: toastId });
                    setEditMode(false)
                } else {
                    const res = await createTutorProfile(value);
                    console.log(res.data);
                    if (res.error) {
                        toast.error(res.error.message, { id: toastId })
                        return;
                    }
                    if (res.data.success === false) {
                        toast.error(res.data.message, { id: toastId })
                        return;
                    }
                    toast.success("Your Profile Created Successfully", { id: toastId });
                }

            } catch (error: any) {
                toast.error(error.message || "Something went wrong!", { id: toastId })
            };
        },
    });
    // const [bio, setBio] = useState("");
    // const [hourlyRate, setHourlyRate] = useState(0);
    // const [category, setCategory] = useState("");
    const [editmode, setEditMode] = useState(false);
    return (
        <div>
            {
                profile && !editmode ? (
                    <Card className="max-w-2xl mx-auto rounded-3xl shadow-lg border bg-white overflow-hidden">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                                <div className="relative w-32 h-32">
                                    <Image
                                        src={profile.user.image || "/avatar.jpg"}
                                        alt={profile.user.name}
                                        fill
                                        className="rounded-full object-cover border-4 border-primary/20 shadow-md"
                                    />
                                </div>

                                <div className="flex-1 text-center md:text-left space-y-3">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {profile.user.name}
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            {profile.user.email}
                                        </p>
                                    </div>

                                    <Badge className="px-3 py-1 text-sm rounded-full">
                                        {profile.category.name}
                                    </Badge>

                                    <p className="text-gray-600 leading-relaxed">
                                        {profile.bio}
                                    </p>

                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                        <span className="text-lg font-semibold text-primary">
                                            ${profile.hourlyRate}
                                        </span>
                                        <span className="text-sm text-muted-foreground">/ hour</span>
                                    </div>

                                    <div className="pt-4">
                                        <Button size="sm" onClick={() => setEditMode(true)}>
                                            Edit Profile
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
                    :

                    (
                        <Card className="rounded-xl shadow-sm">
                            <CardHeader>
                                <CardTitle>{profile ? "Edit Profile" : "Create Your Tutor Profile"}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form id="tutor-profile-form" onSubmit={(e) => {
                                    e.preventDefault(),
                                        form.handleSubmit()
                                }}>
                                    <FieldGroup>
                                        <form.Field name="bio" children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                                                    <Textarea
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        placeholder="Write about yourself"
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                    {isInvalid && (
                                                        <FieldError errors={field.state.meta.errors} />
                                                    )}
                                                </Field>
                                            )
                                        }} />
                                        <div className="flex gap-5">
                                            {/* hourlyRate */}
                                            <form.Field name="hourlyRate" children={(field) => {
                                                const isInvalid =
                                                    field.state.meta.isTouched && !field.state.meta.isValid
                                                return (
                                                    <Field data-invalid={isInvalid}>
                                                        <FieldLabel htmlFor={field.name}>HourlyRate ($/hr)</FieldLabel>
                                                        <Input
                                                            type="number"
                                                            id={field.name}
                                                            name={field.name}
                                                            value={field.state.value || ""}
                                                            placeholder="Your hourly rate"
                                                            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                                        />
                                                        {isInvalid && (
                                                            <FieldError errors={field.state.meta.errors} />
                                                        )}
                                                    </Field>
                                                )
                                            }} />
                                            {/* category */}
                                            <form.Field name="categoryId" children={(field) => {
                                                const isInvalid =
                                                    field.state.meta.isTouched && !field.state.meta.isValid
                                                return (
                                                    <Field data-invalid={isInvalid}>
                                                        <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                                                        <Select
                                                            name={field.name}
                                                            value={field.state.value}
                                                            onValueChange={field.handleChange}
                                                        >
                                                            <SelectTrigger
                                                                id="form-tanstack-select-language"
                                                                // aria-invalid={isInvalid}
                                                                className="min-w-[120px]"
                                                            >
                                                                <SelectValue placeholder="Select a Category" />
                                                            </SelectTrigger>
                                                            <SelectContent position="item-aligned">
                                                                {categories.map((category) => (
                                                                    <SelectItem
                                                                        key={category.id}
                                                                        value={category.id as string}
                                                                    >
                                                                        {category.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {isInvalid && (
                                                            <FieldError errors={field.state.meta.errors} />
                                                        )}
                                                    </Field>
                                                )
                                            }} />
                                        </div>
                                    </FieldGroup>
                                </form>

                            </CardContent>
                            <CardFooter className="flex gap-3">
                                <Button form="tutor-profile-form" type="submit" className="hover:cursor-pointer ">{profile ? "Update Profile" : "Create Profile"}</Button>
                                {profile && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className=""
                                        onClick={() => setEditMode(false)}
                                    >
                                        Cancel
                                    </Button>)}
                            </CardFooter>
                        </Card>
                    )
            }

        </div>

    )
}

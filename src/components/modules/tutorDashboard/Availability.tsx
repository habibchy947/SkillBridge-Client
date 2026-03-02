"use client"

import { createTutorAvailability } from "@/actions/tutor.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const availabilitySchema = z.object({
    day: z.string().min(1, "Day is required!"),
    startTime: z.string().regex(timeRegex, "Invalid Time Format, Time must be in HH:MM format"),
    endTime: z.string().regex(timeRegex, "Invalid Time Format, Time must be in HH:MM format")
}).refine((data) => data.startTime < data.endTime, {
    message: "Start time must be before end time",
    path: ["endTime"],
});

const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
]

export default function Availability() {
    const form = useForm({
        defaultValues: {
            day: "",
            startTime: "",
            endTime: ""
        },
        validators: {
            onSubmit: availabilitySchema
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating Availability..")
            try {
                console.log(value)
                const res = await createTutorAvailability(value);
                console.log(res.data);
                if (res.error) {
                    toast.error(res.error.message, { id: toastId })
                    return;
                }
                if (res.data.success === false) {
                    toast.error(res.data.message, { id: toastId })
                    return;
                }
                toast.success(res.data.message || "Availabilty Created Successfully", { id: toastId });
            } catch (error) {
                toast.error("Something went wrong!", { id: toastId })
            };
        }

    })
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8">

            <Card className="rounded-3xl shadow-lg">
                <CardHeader> 
                    <CardTitle className="text-xl font-semibold">
                        Set Your Availability Slot
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form id="availabilty-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup className="grid sm:grid-cols-3 gap-4">
                            {/* DAY */}
                            <form.Field name="day" children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <div>
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Day</FieldLabel>
                                            <Select
                                                name={field.name}
                                                value={field.state.value}
                                                onValueChange={field.handleChange}
                                            >
                                                <SelectTrigger
                                                    id="form-tanstack-select-language"
                                                >
                                                    <SelectValue placeholder="Select Day" />
                                                </SelectTrigger>
                                                <SelectContent position="item-aligned">
                                                    {days.map((d) => (
                                                        <SelectItem key={d} value={d}>
                                                            {d.charAt(0).toUpperCase() + d.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    </div>
                                )
                            }} />
                            {/* Start Time */}
                            <form.Field name="startTime" children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <div>
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                                            <Input
                                                type="time"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                placeholder="start time"
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    </div>

                                )
                            }} />
                            {/* end Time */}
                            <form.Field name="endTime" children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <div>
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>End Time</FieldLabel>
                                            <Input
                                                type="time"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                placeholder="end time"
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    </div>

                                )
                            }} />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button form="availabilty-form" type="submit" className="w-full">
                        Add Slot
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

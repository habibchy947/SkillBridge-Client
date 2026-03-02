"use client";

import { updateAvailabilitySlot } from "@/actions/tutor.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TutorAvailability } from "@/types/tutors.type";
import { useForm } from "@tanstack/react-form";
import { Edit } from "lucide-react";
import { useState } from "react";
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

export default function AvailabilityTable({ availability }: { availability: TutorAvailability[] }) {
    const [selectedAvailability, setSelectedAvailability] = useState<TutorAvailability | null>(null);
    const [open, setOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            day: selectedAvailability?.day || "",
            startTime: selectedAvailability?.startTime || "",
            endTime: selectedAvailability?.endTime || ""
        },
        validators: {
            onSubmit: availabilitySchema
        },
        onSubmit: async ({ value }) => {
            if (!selectedAvailability) {
                return;
            };
            const toastId = toast.loading("Updating Availability..")
            try {
                console.log(value)
                const res = await updateAvailabilitySlot(value, selectedAvailability.id);
                console.log(res.data);
                if (res.error) {
                    toast.error(res.error.message, { id: toastId })
                    return;
                }
                if (res.data.success === false) {
                    toast.error(res.data.message, { id: toastId })
                    return;
                }
                toast.success(res.data.message || "Availabilty Updated Successfully", { id: toastId });
                setSelectedAvailability(null);
                setOpen(false);
            } catch (error: any) {
                toast.error(error.message || "Something went wrong!", { id: toastId })
            };
        }

    })
    return (
        <Card className="rounded-2xl shadow-lg max-w-5xl mx-auto">
            <CardHeader>
                <CardTitle>Your Weekly Availability</CardTitle>
            </CardHeader>
            <CardContent>
                {availability.length === 0 ? (
                    <p className="text-muted-foreground">
                        No availability slots added yet.
                    </p>)
                    : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {availability.map((slot) => (
                                <div
                                    key={slot.id}
                                    className="flex justify-between items-center p-4 border rounded-2xl bg-muted/30"
                                >
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <Badge variant="secondary" className="text-md">
                                            {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}
                                        </Badge>
                                        <span className="font-medium">
                                            {slot.startTime} - {slot.endTime}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            setSelectedAvailability(slot); form.reset({ day: slot.day, startTime: slot.startTime, endTime: slot.endTime }); setOpen(true);
                                        }}
                                    >
                                        <Edit className="w-4 h-4 " />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
            </CardContent>
            {/* dialog box for update availability */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <form id="availability-update" onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}>
                        <DialogHeader>
                            <DialogTitle>Edit Availability Slot</DialogTitle>
                            <DialogDescription>
                                Make changes this Slot here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup className="grid sm:grid-cols-3 gap-4 mt-4">
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
                        <DialogFooter className="mt-3">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" form="availability-update">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

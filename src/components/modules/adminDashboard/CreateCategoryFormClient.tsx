"use client";

import { createCategory } from "@/actions/category.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const categorySchema = z.object({
  name: z.string().trim().min(2, "Category Name must be at least 3 characters!"),
})

export function CreateCategoryFormClient({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating...")
      try {
        const res = await createCategory(value);
        console.log(res.data);
        if(res.data.success === false) {
            toast.error(res.data.message, { id: toastId })
            return;
          }
          if(res.error) {
            toast.error(res.error.message, { id: toastId })
            return;
          }
        toast.success("Category Created Successfully", { id: toastId });
      } catch (error) {
        toast.error("Something went wrong!", { id: toastId })
      };
    },
  });

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Add a New Category</CardTitle>
        <CardDescription>
          Create a professional subject category for tutoring.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="category-form" onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}>
          <FieldGroup>
            {/* name */}
            <form.Field name="name" children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Category name"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }} />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="category-form" type="submit" className="w-full hover:cursor-pointer ">Add</Button>
      </CardFooter>
    </Card>
  )
}

"use client";

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
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

const Roles = ["STUDENT", "TUTOR"] as const;

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required!"),
  email: z.email("Email is required!"),
  image: z.string().trim().refine((val) => val === "" || z.string().url().safeParse(val).success, "Invalid URL"),
  role: z.enum(Roles, "Please select a specific role"),
  // role: z.enum(Roles as [string, ...string[]]),
  password: z.string().trim().min(8, "Password length must be at least 8 characters")
})

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      image: "",
      role: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user..")
      try {
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        };

        toast.success("User Created Successfully", { id: toastId });
        router.push(callbackUrl);
      } catch (error) {
        toast.error("Something went wrong! Please try again later", { id: toastId })
      };
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={(e) => {
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
                    placeholder="Your name"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }} />
            {/* email */}
            <form.Field name="email" children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Your email"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }} />
            {/* image */}
            <form.Field name="image" children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                  <Input
                    type="url"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Your image url"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }} />
            {/* role */}
            <form.Field name="role" children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Role</FieldLabel>
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
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {Roles.map((role) => (
                        <SelectItem
                          key={role}
                          value={role}
                        >
                          {role}
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
            {/* password */}
            <form.Field name="password" children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="provide a strong password"
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
        <Button form="register-form" type="submit" className="w-full hover:cursor-pointer ">Register</Button>
      </CardFooter>
    </Card>
  )
}

"use client";
// const handleGoogleLogin = async () => {
//   const data = await authClient.signIn.social({
//     provider: "google",
//     callbackURL: "http://localhost:3000",
//     // options: {
//     //   redirectTo: `${window.location.origin}/dashboard`,
//     // },
//   });
// };

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
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";


const formSchema = z.object({
  email: z.email("Email is required!"),
  password: z.string().trim().min(8, "Password length must be at least 8 characters")
})

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in..")
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        };

        toast.success("User Logged in Successfully", { id: toastId });
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
                    placeholder="Your password"
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
        <Button form="register-form" type="submit" className="w-full hover:cursor-pointer ">Login</Button>
      </CardFooter>
    </Card>
  )
}

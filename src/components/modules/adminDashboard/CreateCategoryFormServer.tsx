import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export default function CreateCategoryFormServer() {
    const createCategory = async (formData: FormData) => {
        "use server";

        const cookieStore = await cookies();
        const name = formData.get("name") as string
        const categoryData = {
            name
        };
        const res = await fetch(`${API_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(categoryData),
        });
        if (res.ok) {
            revalidateTag("categories", "max");
            // updateTag("categories") //use either one;
        }
            console.log(res);
    };
    return (
        <Card className="max-w-sm mx-auto">
            <CardHeader>
                <CardTitle>Add New Category</CardTitle>
                <CardDescription>Create a professional subject category for tutoring.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="category-form" action={createCategory}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Name</FieldLabel>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Category Name"
                                required
                            />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button form="category-form" type="submit">Add</Button>
            </CardFooter>
        </Card>
    );
};

"use client"
import { deleteCategory, updateCategory } from "@/actions/category.actions"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AdminCategory, CategoryData } from "@/types"
import { useForm } from "@tanstack/react-form"
import { Edit, Trash2, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import * as z from "zod";

const categorySchema = z.object({
  name: z.string().trim().min(2, "Category Name must be at least 2 characters!"),
})


export function CategoryTable({ categorys }: { categorys: AdminCategory[] }) {
  const [selectedCategory, setSelectedCategory] = useState<AdminCategory | null>(null);
  const [open, setOpen] = useState(false);

  // update category
  const form = useForm({
    defaultValues: {
      name: selectedCategory?.name,
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      if (!selectedCategory) {
        return;
      };
      const toastId = toast.loading("Updating...")
      try {
        const res = await updateCategory(value as CategoryData, selectedCategory.id as string);
        console.log(res.data);
        if (res.data.success === false) {
          toast.error(res.data.message, { id: toastId })
          return;
        }
        if (res.error) {
          toast.error(res.error.message, { id: toastId })
          return;
        }
        toast.success("Category Updated Successfully", { id: toastId });
        setSelectedCategory(null);
        setOpen(false);
      } catch (error) {
        toast.error("Something went wrong!", { id: toastId })
      };
    },
  });

  // delete category
  const handleDeleteCategory = async (id: string) => {
    const toastId = toast.loading("Deleting...")
    try {
      const res = await deleteCategory(id);
      console.log(res.data);
      if (res.data.success === false) {
        toast.error(res.data.message, { id: toastId });
        return;
      }
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }
      toast.success("Category Deleted Successfully", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    };
  };

  return (
    <Table className="border">
      <TableHeader className="bg-neutral-50 dark:bg-neutral-700">
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead className="">CreatedAt</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categorys?.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell className="">{category.createdAt}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                {/* delete category */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="hover:cursor-pointer"><Trash2 className="w-4 h-4" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                      </AlertDialogMedia>
                      <AlertDialogTitle>Delete category?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete from database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                      <AlertDialogAction variant="destructive" onClick={() => handleDeleteCategory(category.id as string)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* update category btn */}
                <Button variant="outline" className="hover:cursor-pointer" onClick={() => {
                  setSelectedCategory(category); form.reset({ name: category.name }); setOpen(true);
                }}><Edit className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}

        {/* dialog box for update category */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-sm">
            <form id="category-update" onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}>
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogDescription>
                  Make changes this category here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <form.Field name="name" children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="mt-2">Name</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }} />
              </FieldGroup>
              <DialogFooter className="mt-3">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" form="category-update">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </TableBody>
    </Table >
  )
}

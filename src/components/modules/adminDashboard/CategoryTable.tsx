"use client"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AdminCategory } from "@/types"
import { Edit, Trash2 } from "lucide-react"

export function CategoryTable({ categorys }: { categorys: AdminCategory[] }) {
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
              <div className="">
                <Button variant="destructive"><Trash2 className="w-4 h-4" /></Button>
                <Button variant="outline"><Edit className="w-4 h-4" /></Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

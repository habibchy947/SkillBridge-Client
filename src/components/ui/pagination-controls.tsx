"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./button";
import { PaginationControlProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, FieldLabel } from "./field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";


export default function PaginationControls({ meta }: PaginationControlProps) {
    const { limit: pageSize, page: currentPage, total, totalPages } = meta;

    const searchParams = useSearchParams();
    const router = useRouter();

    const navigateToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
        console.log(params)
    }

    const rowsPerPage = (rowsNum: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", rowsNum.toString());
        router.push(`?${params.toString()}`);
        console.log(params)
    }

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, total);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center px-2 py-4 border-t mt-4 min-h-auto">
            <div className="text-sm text-muted-foreground flex items-center gap-3">
                Showing {start} to {end} of {total} results.
                <Field orientation="horizontal" className="w-fit">
                    <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
                    <Select disabled={pageSize >= total} defaultValue="5" onValueChange={(e) => rowsPerPage(e)}>
                        <SelectTrigger className="w-20" id="select-rows-per-page">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="start">
                            <SelectGroup>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
            </div>

            <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <Button variant="outline" size="icon" className="hover:cursor-pointer" onClick={() => navigateToPage(1)} disabled={currentPage === 1}>
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={() => navigateToPage(currentPage - 1)} disabled={currentPage === 1} className="hover:cursor-pointer" >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                </div>

                <Button variant="outline" size="icon" onClick={() => navigateToPage(currentPage + 1)} disabled={currentPage === totalPages} className="hover:cursor-pointer" >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" className="hover:cursor-pointer" onClick={() => navigateToPage(totalPages)} disabled={currentPage === totalPages}>
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

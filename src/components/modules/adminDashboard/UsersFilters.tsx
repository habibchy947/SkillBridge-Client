"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function UsersFilters() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const role = searchParams.get("role") ?? "";
    const status = searchParams.get("status") ?? "";

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        params.set("page", "1");

        router.push(`?${params.toString()}`);
    };

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("role");
        params.delete("status");
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    const hasActiveFilters = useMemo(() => {
        return role || status;
    }, [role, status]);

    return (
        <div className="flex flex-wrap items-center gap-4 rounded-md border  p-4 shadow-sm">

            <Select
                value={role}
                onValueChange={(value) =>
                    updateFilter("role", value === "ALL" ? "" : value)
                }
            >
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by role" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="ALL">All Users</SelectItem>
                    <SelectItem value="TUTOR">Tutor</SelectItem>
                    <SelectItem value="STUDENT">Student</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={status}
                onValueChange={(value) =>
                    updateFilter("status", value === "ALL" ? "" : value)
                }
            >
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="BANNED">BANNED</SelectItem>
                </SelectContent>
            </Select>
            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-sm"
                >
                    Clear Filters
                </Button>
            )}
        </div>
    )
}

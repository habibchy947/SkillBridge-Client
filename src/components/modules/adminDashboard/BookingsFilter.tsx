"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminCategory } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function BookingsFilter({ categorys }: { categorys: AdminCategory[]}) {
    const router = useRouter();
    const searchParams = useSearchParams()
    const category = searchParams.get("category") ?? "";
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
        params.delete("category");
        params.delete("status");
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    const hasActiveFilters = useMemo(() => {
        return category || status;
    }, [category, status]);

    return (
        <Card className="rounded-sm shadow-sm max-w-sm">
            <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="grid  md:grid-cols-2 gap-4">
                {/* Category */}
                <Select
                    value={category}
                    onValueChange={(value) =>
                        updateFilter("category", value === "ALL" ? "" : value)
                    }
                >
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">All Users</SelectItem>
                        {categorys.length > 0 ? categorys.map((cat) => <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>) : "No Category"}
                    </SelectContent>
                </Select>

                {/* STATUS */}
                <Select
                    value={status}
                    onValueChange={(value) =>
                        updateFilter("status", value === "ALL" ? "" : value)
                    }
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">All Status</SelectItem>
                        <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                        <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                    </SelectContent>
                </Select>

                {/* CLEAR BUTTON */}
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="text-sm"
                    >
                        Clear Filters
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}

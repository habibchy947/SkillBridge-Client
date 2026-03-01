"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AdminCategory, TutorsPublic } from "@/types";

export default function TutorsFilter({ categories }: { categories: AdminCategory[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("ALL");
    const [minRating, setMinRating] = useState("ALL");
    const [minRate, setMinRate] = useState("");
    const [maxRate, setMaxRate] = useState("");

    useEffect(() => {
        setSearch(searchParams.get("search") || "");
        setCategory(searchParams.get("category") || "ALL");
        setMinRating(searchParams.get("minRating") || "ALL");
        setMinRate(searchParams.get("minRate") || "");
        setMaxRate(searchParams.get("maxRate") || "");
    }, [searchParams]);

    const handleApplyFilters = () => {
        const params = new URLSearchParams();

        if (search.trim() !== "") params.set("search", search.trim());
        if (category !== "ALL") params.set("category", category);
        if (minRating !== "ALL") params.set("minRating", minRating);
        if (minRate) params.set("minRate", minRate);
        if (maxRate) params.set("maxRate", maxRate);

        params.set("page", "1");

        router.push(`?${params.toString()}`);
    };

    const handleClearFilters = () => {
        router.push("?page=1");
    };

    const hasActiveFilters = useMemo(() => {
        return (
            search ||
            category !== "ALL" ||
            minRating !== "ALL" ||
            minRate ||
            maxRate
        );
    }, [search, category, minRating, minRate, maxRate]);

    return (
        <Card className="rounded-2xl shadow-sm h-fit">
            <CardContent className="p-6 space-y-6">
                <div>
                    <p className="text-sm font-medium mb-2">Search</p>
                    <Input
                        placeholder="Search tutor, bio, category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div>
                    <p className="text-sm font-medium mb-2">Category</p>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All</SelectItem>
                            { categories?.length > 0 ? categories.map((cate) => (
                                <SelectItem key={cate.id} value={cate.name}>{cate.name}</SelectItem>
                            ) ): "No Category"
                         }
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <p className="text-sm font-medium mb-2">Minimum Rating</p>
                    <Select value={minRating} onValueChange={setMinRating}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All</SelectItem>
                            <SelectItem value="3">3+ Stars</SelectItem>
                            <SelectItem value="4">4+ Stars</SelectItem>
                            <SelectItem value="4.5">4.5+ Stars</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                    <p className="text-sm font-medium">Price Range ($/hr)</p>

                    <div className="flex gap-3">
                        <Input
                            type="number"
                            placeholder="Min $"
                            value={minRate}
                            onChange={(e) => setMinRate(e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder="Max $"
                            value={maxRate}
                            onChange={(e) => setMaxRate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2 pt-4">
                    <Button className="w-full" onClick={handleApplyFilters}>
                        Apply Filters
                    </Button>

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            className="w-full"
                            onClick={handleClearFilters}
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

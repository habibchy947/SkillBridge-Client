import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";

export default function StatCard({ title, value, icon, trend }: { title: string, value: number, icon: React.ReactNode, trend?: number; }) {
    const isPositive = trend && trend > 0;
    return (
        <Card className="relative overflow-hidden rounded-md border bg-background hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 flex justify-between items-center">
        {/* Left Content */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>

          <div className="flex items-center gap-3">
            <h3 className="text-3xl font-bold tracking-tight">
              {value}
            </h3>

            {trend !== undefined && (
              <div
                className={cn(
                  "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                  isPositive
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                    : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                )}
              >
                {isPositive ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(trend)}%
              </div>
            )}
          </div>
        </div>

        {/* Icon Section */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
    )
}

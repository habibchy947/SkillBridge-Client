import StatCard from "@/components/ui/StatCard";
import { GraduationCap, UserCheck, Users } from "lucide-react";

export default function UsersStats({
    tutor,
    student,
    total
}: {
    tutor: number;
    student: number;
    total: number
}) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="Total Users" value={total} icon={<Users className="h-10 w-10 text-muted-foreground" />} />
            <StatCard title="Tutors" value={tutor} icon={<GraduationCap className="h-10 w-10 text-blue-500" />} />
            <StatCard title="Students" value={student} icon={<UserCheck className="h-10 w-10 text-emerald-500" />} />
        </div>
    )
}

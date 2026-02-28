import UsersFilters from "@/components/modules/adminDashboard/UsersFilters";
import UsersStats from "@/components/modules/adminDashboard/UsersStats";
import UsersTable from "@/components/modules/adminDashboard/UsersTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { userServices } from "@/services/user.services"
import { UserRole, UserStatus } from "@/types"

export default async function UsersPage({ searchParams }: {
    searchParams: Promise<{
        status?: UserStatus,
        role?: UserRole;
        page?: string;
        limit?: string;
        sortBy?: string;
        sortOrder?: string;
    }>
}) {
    const currentUser = await userServices.getSession();
    const { status, role, page, limit, sortBy, sortOrder } = await searchParams;
    const response = await userServices.getAllUsers({
        status,
        role,
        page,
        limit,
        sortBy,
        sortOrder
    },
        {
            // cache: "no-store"
            revalidate: 10
        })
    // console.log(response)
    const users = response?.data?.data?.data || []
    console.log(users)
    const tutor = response?.data?.data.tutor || 0;
    const student = response?.data?.data.student || 0;
    const pagination = response?.data?.data?.pagination || {
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 1
    }
    // console.log(users, pagination)
    return (
        <div className="space-y-6 p-6">
            <UsersStats tutor={tutor} student={student} total={pagination.total} />
            <UsersFilters/>
            <UsersTable user={currentUser} users={users}/>
            <PaginationControls meta={pagination} />
        </div>
    )
}

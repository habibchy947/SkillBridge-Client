import DashboardHeader from "@/components/layout/DashboardHeader";
import BookingsFilter from "@/components/modules/adminDashboard/BookingsFilter";
import BookingsTable from "@/components/modules/adminDashboard/BookingsTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { bookingsService } from "@/services/bookings.service";
import { categoryServices } from "@/services/category.services";
import { BookingStatus } from "@/types/bookings.type";

export default async function BookingsPage({ searchParams }: {
    searchParams: Promise<{
        status?: BookingStatus;
        category?: string;
        page?: string;
        limit?: string;
        sortBy?: string;
        sortOrder?: string;
    }>
}) {
    const { status, category, page, limit, sortBy, sortOrder } = await searchParams;
    const data = await bookingsService.getAllBookings({ status, category, page, limit, sortBy, sortOrder })
    const bookings = data?.data?.data?.data || []
    const pagination = data?.data?.data?.pagination || {
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 1
    }
    console.log(bookings, pagination)
    const categoryData = await categoryServices.getCategoriesByAdmin();
    return (
        <div className="space-y-6">
            <DashboardHeader title="All Bookings" description="Manage and monitor all tutoring session bookings" />
            <BookingsFilter categorys={categoryData?.data?.data} />
            <BookingsTable bookings={bookings}/>
            <PaginationControls meta={pagination} />
        </div>
    )
}

import TutorsFilter from "@/components/modules/tutors/TutorsFilter";
import { TutorsPublicCard } from "@/components/modules/tutors/TutorsPublicCard";
import PaginationControls from "@/components/ui/pagination-controls";
import { tutorServices } from "@/services/tutor.service"
import { TutorsPublic } from "@/types";


export default async function Tutors({ searchParams }: {
  searchParams: Promise<{
    minRate?: string,
    maxRate?: string,
    minRating?: string,
    category?: string;
    search?: string;
    page?: string;
    limit?: string;
  }>
}) {

  const { minRate, maxRate, minRating, category, search, page, limit } = await searchParams;
  console.log(category, search)
  const response = await tutorServices.getAllTutors({
    minRate,
    maxRate,
    minRating,
    category,
    search,
    page,
    limit
  }, {
    revalidate: 10
  }
  );
  const tutors = response?.data?.data?.data || []
  console.log(tutors)
  const pagination = response?.data?.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1
  }
  // console.log(tutors)
  // console.log(pagination)
  // console.log(response?.data?.data?.data)
  return (
    <div className="max-w-7xl px-5 lg:px-0 mx-auto mt-5 ">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <TutorsFilter tutorsData={tutors} />
        <div className="md:col-span-2 lg:col-span-3 space-y-6">
          {
            tutors.length ?
              <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {
                  tutors.map((tutor: TutorsPublic) => <TutorsPublicCard key={tutor.id} tutor={tutor} />)
                }
              </div>
              : <div className="flex justify-center min-h-max">No Tutors Found</div>
          }
        </div>
      </div>
      <div className="flex justify-center">
        <PaginationControls meta={pagination} />
      </div>
    </div>
  )
}

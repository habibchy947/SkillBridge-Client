import { TutorsPublicCard } from "@/components/modules/tutors/TutorsPublicCard";
import PaginationControls from "@/components/ui/pagination-controls";
import { tutorServices } from "@/services/tutor.service"
import { TutorsPublic } from "@/types";


export default async function Tutors({ searchParams }: {
  searchParams: Promise<{
    category?: string;
    search?: string; 
    page?: string; 
    limit?: string;
  }>
}) {

  const { category, search, page, limit } = await searchParams;
  // const category =  params?.category || ""
  // const search = params?.search || ""
  // const page = params?.page || ""
  console.log(category, search)
  const response = await tutorServices.getAllTutors({
    category,
    search,
    page,
    limit
  }, {
    revalidate: 10
  }
  );
  const tutors = response?.data?.data?.data || []
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
    <div className="max-w-7xl px-5 lg:px-0 mx-auto mt-5">
      {
        tutors.length ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {
              tutors.map((tutor: TutorsPublic) => <TutorsPublicCard key={tutor.id} tutor={tutor} />)
            }
          </div>
         : <div className="flex justify-center min-h-max">No Tutors Found</div>
      }
      <PaginationControls meta={pagination} />
    </div>
  )
}

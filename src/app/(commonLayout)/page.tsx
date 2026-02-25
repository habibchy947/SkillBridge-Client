import { Banner } from "@/components/Banner";
import { TutorsPublicCard } from "@/components/modules/tutors/TutorsPublicCard";
import { tutorServices } from "@/services/tutor.service";
import { TutorsPublic } from "@/types";

export default async function Home() {
  // const { data } = await userServices.getSession();
  // console.log("Session data:", session);
  const  featuredTutors  = await tutorServices.getAllTutors({
    sortBy: "rating",
    sortOrder: "desc",
    limit: "3"
  },
)
  console.log(featuredTutors)
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Banner/>
      {featuredTutors?.data?.data?.data && featuredTutors.data.data.data.length > 0 && (
        <div className="mb-12">
          <h2 className={"text-2xl font-bold text-center mb-6"}>Featured Tutors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTutors.data.data.data.map((tutor: TutorsPublic) => <TutorsPublicCard key={tutor.id} tutor={tutor}/>)}
          </div>
        </div>
      )}
    </div>
  );
}




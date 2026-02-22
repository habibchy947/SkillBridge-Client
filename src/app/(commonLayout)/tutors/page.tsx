import { TutorsPublicCard } from "@/components/modules/tutors/TutorsPublicCard";
import { tutorServices } from "@/services/tutor.service"
import { TutorsPublic } from "@/types";

export default async function Tutors() {
  //** For simulating loading time
  // await new Promise((resolve) => { setTimeout(resolve, 4000) });

  // ** For simulating error
  // throw new Error("Something Went Wrong!")
  const data = await tutorServices.getAllTutors();
  console.log(data?.data?.data?.data)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl px-5 lg:px-0 mx-auto mt-5">
        {
          data?.data?.data?.data.map((tutor: TutorsPublic) => <TutorsPublicCard key={tutor.id} tutor={tutor}/>)
        }
    </div>
  )
}

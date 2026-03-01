import CreateTutorProfile from "@/components/modules/tutorDashboard/CreateOrEditTutorProfile";
import { categoryServices } from "@/services/category.services";
import { tutorServices } from "@/services/tutor.service";

export default async function TutorProfile() {
    const dataPromise = await categoryServices.getCategories();
    const tutorOwnProfilePromise = await tutorServices.getTutorByUserId({
        cache: "no-store",
    })

    const [data, tutorOwnProfile] = await Promise.all([
        dataPromise,
        tutorOwnProfilePromise,
    ]);
    console.log(tutorOwnProfile)
    return (
        <div className="max-w-xl w-full mx-auto p-6">
            <CreateTutorProfile profile={tutorOwnProfile?.data?.data} categories={data?.data?.data} />
        </div>
    )
}

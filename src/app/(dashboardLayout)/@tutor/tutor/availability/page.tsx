import Availability from "@/components/modules/tutorDashboard/Availability";
import AvailabilityTable from "@/components/modules/tutorDashboard/AvailabilityTable";
import { tutorServices } from "@/services/tutor.service";

export default async function AvailabilityPage() {
  const data = await tutorServices.getTutorOwnAvailabilitySlot({
    cache: "no-store"
  })
  console.log(data?.data?.data)
  return (
    <div>
        <Availability/>
        <AvailabilityTable availability={data?.data?.data}/>
    </div>
  )
}

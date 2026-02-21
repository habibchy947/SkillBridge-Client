import { Button } from "@/components/ui/button";
import { userServices } from "@/services/user.services";

export default async function Home() {
  const { data: session, error } = await userServices.getSession();
  // console.log("Session data:", session);
  return (
    <div className="">
      <Button>Click Here</Button>
    </div>
  );
}


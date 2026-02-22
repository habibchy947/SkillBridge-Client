import { Button } from "@/components/ui/button";
import { categoryServices } from "@/services/category.services";
import { userServices } from "@/services/user.services";

export default async function Home() {
  // const { data } = await userServices.getSession();
  // console.log("Session data:", session);
  return (
    <div className="">
      <Button>Click Here</Button>
    </div>
  );
}


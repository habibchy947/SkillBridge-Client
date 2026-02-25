import { Banner } from "@/components/Banner";
import { Button } from "@/components/ui/button";
import { categoryServices } from "@/services/category.services";
import { userServices } from "@/services/user.services";

export default async function Home() {
  // const { data } = await userServices.getSession();
  // console.log("Session data:", session);
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Banner/>
    </div>
  );
}


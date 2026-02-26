import { Navbar } from "@/components/layout/Navbar";
import { userServices } from "@/services/user.services";

export default async function CommonLayout({ children }: { children: React.ReactNode }) {
    const { data } = await userServices.getSession();
    console.log(data)
    return (
        <div>
            <Navbar  />
            {children}
        </div>
    )
}

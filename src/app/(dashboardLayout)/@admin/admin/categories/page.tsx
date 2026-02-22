import { CategoryTable } from "@/components/modules/adminDashboard/CategoryTable";
import { categoryServices } from "@/services/category.services";
import { AdminCategory } from "@/types/adminCategory.type";

export default async function CategoryPage() {
    const data = await categoryServices.getCategoriesByAdmin();
    console.log("Categories data:", data);
    return (
        <div>
            <h1>Admin Categories Page</h1>
            {/* Render categories data here */}
            <div className="md:px-20 mx-auto mt-5">
                {data && data.data && (
                    <CategoryTable categorys={data?.data?.data} />
                )}
            </div>
        </div>
    )
}

import { CategoryTable } from "@/components/modules/adminDashboard/CategoryTable";
import { CreateCategoryFormClient } from "@/components/modules/adminDashboard/CreateCategoryFormClient";
// import CreateCategoryFormServer from "@/components/modules/adminDashboard/CreateBlogFormServer";
import { categoryServices } from "@/services/category.services";

export default async function CategoryPage() {
    const data = await categoryServices.getCategories();
    console.log("Categories data:", data);
    return (
        <div>
            {/* <CreateCategoryFormServer/> */}
            <CreateCategoryFormClient/>
            {/* Render categories data here */}
            <div className="md:px-20 mx-auto mt-5">
                {data && data.data && (
                    <CategoryTable categorys={data?.data?.data} />
                )}
            </div>
        </div>
    )
}

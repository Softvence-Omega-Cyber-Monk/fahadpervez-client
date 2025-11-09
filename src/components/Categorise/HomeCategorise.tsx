import CommonWrapper from "@/common/CommonWrapper";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { NavLink } from "react-router-dom";
import { Spinner } from "../ui/spinner";

interface Category {
  _id: number;
  categoryName: string;
  imageUrl: string;
}

const HomeCategories = () => {
  const {data:categories , isLoading} = useGetAllCategoriesQuery({});
  if(isLoading){
    return <div className="h-96 flex items-center justify-center"><Spinner/></div> 
  }

  return (
    <div className="py-24 px-6 md:px-0">
      <CommonWrapper>
        <h1 className="text-4xl font-montserrat font-semibold text-center text-website-color-blue mb-12">
          CATEGORIES
        </h1>
        
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories?.data?.map((category:Category) => (
            <NavLink key={category._id} to={`/category/${category._id}`}>
              <div
                key={category._id}
                className="rounded-2xl p-3 w-full h-full overflow-hidden cursor-pointer"
                >
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="flex items-center justify-center overflow-hidden w-full h-full rounded-xl ">
                    <img 
                      src={category.imageUrl} 
                      alt={category.categoryName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-center text-sm font-bold p-1 text-gray-800 leading-tight">
                    {category.categoryName}
                  </h3>
                </div>
              </div>
            </NavLink>
          ))}
         </div>
      </CommonWrapper>
    </div>
  );
};

export default HomeCategories;
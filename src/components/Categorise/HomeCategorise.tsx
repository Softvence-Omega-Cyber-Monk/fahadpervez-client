import CommonWrapper from "@/common/CommonWrapper";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { NavLink } from "react-router-dom";
import { Spinner } from "../ui/spinner";
import PrimaryButton from "@/common/PrimaryButton";

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
    <div className="pt-20 px-6 md:px-0">
      <CommonWrapper className="space-y-12">
        <h3 className="capitalize text-website-color-blue font-semibold">
          Shop By Categories
        </h3>
        
          <div className="flex flex-wrap gap-6">
          {categories?.data?.map((category:Category) => (
            <NavLink key={category._id} to={`/category/${category._id}`}>
              <div
                key={category._id}
                className="p-3 w-full h-full cursor-pointer group"
                >
                <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
                  <div className="flex items-center justify-center overflow-hidden size-40 rounded-full bg-gray-300 group-hover:border group-hover:border-gray-600">
                    <img 
                      src={category.imageUrl} 
                      alt={category.categoryName}
                      className="size-40 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-center text-sm font-bold p-1 text-gray-800 leading-tight group-hover:underline">
                    {category.categoryName}
                  </h3>
                </div>
              </div>
            </NavLink>
          ))}
         </div>
        
          <div className="flex flex-wrap gap-6">
          {categories?.data?.map((category:Category) => (
            <NavLink key={category._id} to={`/category/${category._id}`}>
              <PrimaryButton type='Badge' title={category.categoryName} className="bg-white  p-6! text-sm! font-medium hover:bg-gray-200"/>
            </NavLink>
          ))}
         </div>
      </CommonWrapper>
    </div>
  );
};

export default HomeCategories;
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
  // const categories: Category[] = [
  //   {
  //     id: 1,
  //     title: 'Prescription Medications',
  //     imageUrl: '/product-1.png',
  //   },
  //   {
  //     id: 2,
  //     title: 'Over-the-Counter (OTC)',
  //     imageUrl: '/product-2.png',
  //   },
  //   {
  //     id: 3,
  //     title: 'Vitamins & Supplements',
  //     imageUrl: '/product-3.png',
  //   },
  //   {
  //     id: 4,
  //     title: 'Personal Care & Hygiene',
  //     imageUrl: '/product-4.png',
  //   },
  //   {
  //     id: 5,
  //     title: 'Health & Wellness Devices',
  //     imageUrl: '/product-5.png',
  //   },
  //   {
  //     id: 6,
  //     title: 'First Aid',
  //     imageUrl: '/product-6.png',
  //   },
  //   {
  //     id: 7,
  //     title: 'Family Health',
  //     imageUrl: '/product-7.png',
  //   },
  //   {
  //     id: 8,
  //     title: 'Sexual Health',
  //     imageUrl: '/product-8.png',
  //   },
  //   {
  //     id: 9,
  //     title: 'Mental Health & Mood Support',
  //     imageUrl: '/product-9.png',
  //   },
  //   {
  //     id: 10,
  //     title: 'Herbal Products',
  //     imageUrl: '/product-10.png',
  //   },
  //   {
  //     id: 11,
  //     title: 'Weight Management',
  //     imageUrl: '/product-11.png',
  //   },
  //   {
  //     id: 12,
  //     title: 'More',
  //     imageUrl: '/product-12.png',
  //   }
  // ];
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
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.data?.map((category:Category) => (
            <NavLink key={category._id} to='/products/:id'>
              <div
                key={category._id}
                className="rounded-2xl p-3 w-full h-full overflow-hidden cursor-pointer"
                >
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="flex items-center justify-center overflow-hidden h-40 md:h-48 rounded-xl ">
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
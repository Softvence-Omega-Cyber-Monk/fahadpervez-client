import { NavLink } from "react-router-dom";

interface Category {
  id: number;
  title: string;
  imageUrl: string;
}

const HomeCategories = () => {
  const categories: Category[] = [
    {
      id: 1,
      title: 'Prescription Medications',
      imageUrl: '/product-1.png',
    },
    {
      id: 2,
      title: 'Over-the-Counter (OTC)',
      imageUrl: '/product-2.png',
    },
    {
      id: 3,
      title: 'Vitamins & Supplements',
      imageUrl: '/product-3.png',
    },
    {
      id: 4,
      title: 'Personal Care & Hygiene',
      imageUrl: '/product-4.png',
    },
    {
      id: 5,
      title: 'Health & Wellness Devices',
      imageUrl: '/product-5.png',
    },
    {
      id: 6,
      title: 'First Aid',
      imageUrl: '/product-6.png',
    },
    {
      id: 7,
      title: 'Family Health',
      imageUrl: '/product-7.png',
    },
    {
      id: 8,
      title: 'Sexual Health',
      imageUrl: '/product-8.png',
    },
    {
      id: 9,
      title: 'Mental Health & Mood Support',
      imageUrl: '/product-9.png',
    },
    {
      id: 10,
      title: 'Herbal Products',
      imageUrl: '/product-10.png',
    },
    {
      id: 11,
      title: 'Weight Management',
      imageUrl: '/product-11.png',
    },
    {
      id: 12,
      title: 'More',
      imageUrl: '/product-12.png',
    }
  ];

  return (
    <div className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-montserrat font-semibold text-center text-website-color-blue mb-12">
          CATEGORISE
        </h1>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <NavLink to={`/categories/${category.id}`}>
              <div
                key={category.id}
                className="rounded-2xl p-3 w-full h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="flex items-center justify-center overflow-hidden">
                    <img 
                      src={category.imageUrl} 
                      alt={category.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-center text-sm font-semibold p-2 text-gray-800 leading-tight">
                    {category.title}
                  </h3>
                </div>
              </div>
            </NavLink>
          ))}
         </div>
      </div>
    </div>
  );
};

export default HomeCategories;
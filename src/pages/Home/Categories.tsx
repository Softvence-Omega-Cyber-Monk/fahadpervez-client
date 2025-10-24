import HomeCategories from '@/components/Categorise/HomeCategorise';
import SliderProduct from '@/components/SliderProduct/SliderProduct';
import { Search, Mic, Camera } from 'lucide-react';

const Categories = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-20 bg-[#F1F5F8]">
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl text-website-color-blue text-center mb-8 sm:mb-10">
          Wide Range of Products
        </h1>
        <div className='relative w-full sm:w-3/4 md:w-2/3 lg:w-2/5 flex justify-center'>
          <input 
            type="text" 
            placeholder="Search ..." 
            className="bg-white rounded-md shadow-sm border border-gray-100 py-3 sm:py-4 px-4 sm:px-5 w-full focus:outline-none"
          />
          <div className='flex absolute top-3 sm:top-4 right-4 sm:right-6 gap-4 sm:gap-6 text-gray-500'>
            <Search className="w-5 h-5 sm:w-6 sm:h-6"/>
            <Mic className="w-5 h-5 sm:w-6 sm:h-6"/>
            <Camera className="w-5 h-5 sm:w-6 sm:h-6"/>
          </div>
        </div>
      </div>

      {/* Categories */}
        <HomeCategories/>

      {/* Slider Product */}
      <div className="mt-12 sm:mt-16">
        <SliderProduct/>
      </div>
    </div>
  )
}

export default Categories;

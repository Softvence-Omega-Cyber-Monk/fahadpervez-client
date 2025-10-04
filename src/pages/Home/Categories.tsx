import HomeCategories from '@/components/Categorise/HomeCategorise';
import SliderProduct from '@/components/SliderProduct/SliderProduct';
import { Search,Mic,Camera } from 'lucide-react';

const Categories = () => {
  return (
    <div className="p-40 bg-[#F1F5F8]">
      <div className="flex flex-col justify-center">
        <h1 className="font-montserrat text-[40px] text-website-color-blue text-center mb-10">Wide Range of Products</h1>
        <div className='relative flex justify-center'>
          <input type="text" placeholder="Search ..." className="bg-white rounded-md shadow-sm border border-gray-100 py-4 px-5 w-[40%] focus:outline-none"/>
          <div className='flex absolute top-[15px] right-[32%] gap-6 text-gray-500'>
            <Search />
            <Mic/>
            <Camera/>
          </div>
        </div>
      </div>
      {/* Categories */}
      <HomeCategories/>

      {/* slider product */}
      <SliderProduct/>
    </div>
  )
}

export default Categories

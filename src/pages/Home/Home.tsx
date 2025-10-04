import AllProducts from "@/components/AllProducts/AllProducts";
import BestSeller from "@/components/BestSeller/BestSeller";
import Button from "@/components/Button/Button"
import HomeCategories from "@/components/Categorise/HomeCategorise";
import HowItWorks from "@/components/HowToWork/HowItWorks";
import { MoveUpRight } from 'lucide-react';

const Home = () => {
  return (
    <>
      <div>
          <div className="flex justify-center ">
            <div className="bg-website-color-blue w-[50%] pt-50 pl-97">
              <h1 className="font-montserrat text-5xl font-medium text-white uppercase leading-[120%] mb-6">Experience Top-Notch Healthcare Products with Ease</h1>
              <p className="font-montserrat text-gray-300 text-lg mb-10">Shop the best products online with seamless delivery and secure payments. Your trusted destination for premium products across all categories.</p>
              <div>
                <Button className="font-montserrat text-lg text-gray-100 flex items-center gap-2">
                  Start Shopping Now
                  <MoveUpRight />
                </Button>
              </div>
              <div className="flex items-center gap-14 mt-40">
                <img src="./brand-1.png" alt="brand" />
                <img src="./brand-2.png" alt="brand" />
                <img src="./brand-3.png" alt="brand" />
                <img src="./brand-4.png" alt="brand" />
              </div>
            </div>
            <div  className="w-[50%]">
              <img src="hero.png" alt="hero" className="w-full"/>
            </div>
          </div>
          <HomeCategories/>
          <BestSeller/>
          <HowItWorks/>
          <AllProducts/>
     </div>
    </>
  )
}

export default Home
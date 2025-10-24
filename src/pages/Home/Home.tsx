import AllProducts from "@/components/AllProducts/AllProducts";
import BestSeller from "@/components/BestSeller/BestSeller";
import HomeCategories from "@/components/Categorise/HomeCategorise";
import HowItWorks from "@/components/HowToWork/HowItWorks";
import Autoplay from "embla-carousel-autoplay"
import Hero from "./Hero";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect } from "react";
import { useRefreshTokenMutation } from "@/Redux/Features/auth/auth.api";
import { toast } from "sonner";

interface IHeroData {
  title: string,
  description: string,
  image: string
}

const Home = () => {

  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    (async () => {
      try {
        await refreshToken(null).unwrap();
      } catch {
        toast.error("Please Login");
      }
    })()
  }, [refreshToken]);

  // embla-carousel-autoplay
  const heroCarousel: IHeroData[] = [
    {
      title: "Experience Top-Notch Healthcare Products with Ease",
      description: "Shop the best products online with seamless delivery and secure payments. Your trusted destination for premium products across all categories.",
      image: "/hero-5.png"
    },
    {
      title: "Experience Top-Notch Healthcare Products with Ease",
      description: "Shop the best products online with seamless delivery and secure payments. Your trusted destination for premium products across all categories.",
      image: "/hero-1.png"
    },
    {
      title: "Experience Top-Notch Healthcare Products with Ease",
      description: "Shop the best products online with seamless delivery and secure payments. Your trusted destination for premium products across all categories.",
      image: "/hero-2.png"
    },
    {
      title: "Experience Top-Notch Healthcare Products with Ease",
      description: "Shop the best products online with seamless delivery and secure payments. Your trusted destination for premium products across all categories.",
      image: "/hero-3.png"
    },
    {
      title: "Experience Top-Notch Healthcare Products with Ease",
      description: "Shop the best products online with seamless delivery and secure payments. Your trusted destination for premium products across all categories.",
      image: "/hero-4.png"
    },

  ]

  return (
    <>
<<<<<<< HEAD
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
=======
      <div className="bg-[#F1F5F8]">

        <Carousel orientation="horizontal" plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]} >
          <CarouselContent>
            {
              heroCarousel.map((item, idx) => (
                <CarouselItem key={idx}>
                  <Hero data={item} />
                </CarouselItem>
              ))
            }
          </CarouselContent>
        </Carousel>
        {/* Other Sections */}
        <HomeCategories />
        <BestSeller />
        <HowItWorks />
        <AllProducts />
      </div>
>>>>>>> 04e8881909da2c316796f778f38163540d21c380
    </>
  )
}

export default Home;

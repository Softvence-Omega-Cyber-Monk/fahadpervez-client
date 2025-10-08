import AllProducts from "@/components/AllProducts/AllProducts";
import BestSeller from "@/components/BestSeller/BestSeller";
import HomeCategories from "@/components/Categorise/HomeCategorise";
import HowItWorks from "@/components/HowToWork/HowItWorks";
import Autoplay from "embla-carousel-autoplay"
import Hero from "./Hero";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface IHeroData {
  title: string,
  description: string,
  image: string
}

const Home = () => {
  // embla-carousel-autoplay


  const heroCarousel: IHeroData[] = [
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
    {
      title: "Experience Top-Notch Healthcare Products with Ease",
      description: "Shop the best products online with seamless delivery and secure payments. Your trusted destination for premium products across all categories.",
      image: "/hero-5.png"
    }
  ]

  return (
    <>
      <div className="bg-[#F1F5F8]">

        <Carousel orientation="horizontal" plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]} >
          <CarouselContent>
            {
              heroCarousel.map((item, idx) => (<CarouselItem key={idx}>
                <Hero data={item} />
              </CarouselItem>))
            }
          </CarouselContent>
        </Carousel>


        {/* Other Sections */}
        <HomeCategories />
        <BestSeller />
        <HowItWorks />
        <AllProducts />
      </div>
    </>
  )
}

export default Home;

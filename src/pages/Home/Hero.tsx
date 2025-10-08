import Button from "@/components/Button/Button"
import { MoveUpRight } from "lucide-react"
import React from "react"

interface IHeroData {
    title: string,
    description: string,
    image: string
};

interface IHeroProps {
    data : IHeroData
}

const Hero : React.FC<IHeroProps> = ({ data }) => {

    console.log(data);

    return (
        <div className="flex flex-col md:flex-row justify-center">
            {/* Left Side */}
            <div className="bg-website-color-blue w-full md:w-1/2 pt-30 md:pt-50 px-6 md:pl-100 ">
                <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-medium text-white uppercase leading-snug md:leading-[120%] mb-6">
                    Experience Top-Notch Healthcare Products with Ease
                </h1>
                <p className="font-montserrat text-gray-300 text-base sm:text-lg mb-10">
                    Shop the best products online with seamless delivery and secure payments.
                    Your trusted destination for premium products across all categories.
                </p>
                <div>
                    <Button className="font-montserrat text-base sm:text-lg text-gray-100 flex items-center gap-2">
                        Start Shopping Now
                        <MoveUpRight />
                    </Button>
                </div>
                <div data-slick='{"slidesToShow": 4, "slidesToScroll": 1, autoplay: true, autoplaySpeed: 2000}' className="flex flex-wrap items-center justify-center gap-6 md:gap-14 mt-10 mb-10 md:mt-40">
                    <img src="./brand-1.png" alt="brand" className="w-20 md:w-auto" />
                    <img src="./brand-2.png" alt="brand" className="w-20 md:w-auto" />
                    <img src="./brand-3.png" alt="brand" className="w-20 md:w-auto" />
                    <img src="./brand-4.png" alt="brand" className="w-[15%] md:w-auto" />
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 md:mt-0">
                <img src="hero.png" alt="hero" className="w-full h-auto" />
            </div>
        </div>
    )
}

export default Hero
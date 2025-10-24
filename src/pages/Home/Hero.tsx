import React from "react"
import Button from "@/components/Button/Button"
import { MoveUpRight } from "lucide-react"
import Marquee from "react-fast-marquee";
import CommonWrapper from "@/common/CommonWrapper";
import { Link } from "react-router-dom";

interface IHeroData {
    title: string,
    description: string,
    image: string
};

interface IHeroProps {
    data : IHeroData
}

const Hero : React.FC<IHeroProps> = ({ data }) => {


    return (
        <div className="flex items-center w-full h-screen bg-center bg-cover bg-no-repeat flex-col md:flex-row justify-center" style={{backgroundImage : `url(${data.image})`}}>
            {/* Left Side */}
            <CommonWrapper>
            <div className="w-full md:w-1/2 flex flex-col items-start justify-center pt-30 md:pt-50 px-6 md-px-0">
                <h1 className="font-montserrat text-start text-3xl sm:text-4xl md:text-5xl font-medium text-white uppercase leading-snug md:leading-[120%] mb-6">
                    Experience Top-Notch Healthcare Products with Ease
                </h1>
                <p className="font-montserrat text-gray-300 text-base sm:text-lg mb-10">
                    Shop the best products online with seamless delivery and secure payments.
                    Your trusted destination for premium products across all categories.
                </p>
                <div>
                    <Link to="/products/:id">
                    <Button className="font-montserrat text-base sm:text-lg text-gray-100 flex items-center gap-2">
                        Start Shopping Now
                        <MoveUpRight />
                    </Button>
                    </Link>
                </div>
                <Marquee>
                   <div className="flex flex-wrap items-center justify-center gap-6 md:gap-14 mt-10 mb-10 md:mt-40">
                    <img src="./brand-1.png" alt="brand" className="w-20 md:w-auto" />
                    <img src="./brand-2.png" alt="brand" className="w-20 md:w-auto" />
                    <img src="./brand-3.png" alt="brand" className="w-20 md:w-auto" />
                    <img src="./brand-4.png" alt="brand" className="w-[10%] md:w-auto" />
                  </div>
                </Marquee>
            </div>
            </CommonWrapper>

            {/* Right Side */}
            {/* <div className="w-full md:w-1/2 md:mt-0"></div> */}
        </div>
    )
}

export default Hero
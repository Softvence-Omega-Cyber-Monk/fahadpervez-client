import React from "react"
import Button from "@/components/Button/Button"
import { MoveUpRight } from "lucide-react"
import Marquee from "react-fast-marquee"
import CommonWrapper from "@/common/CommonWrapper"
import { Link } from "react-router-dom"

interface IHeroData {
  title: string
  description: string
  image: string
}

interface IHeroProps {
  data: IHeroData
}

const Hero: React.FC<IHeroProps> = ({ data }) => {
  return (
    <section
      className="relative flex items-center justify-center w-full min-h-[650px] bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${data.image})` }}
    >
      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <CommonWrapper>
        <div className="relative z-10 flex flex-col justify-center items-start h-full w-full md:w-2/3  px-6">
          <h1 className="font-montserrat text-start text-3xl sm:text-4xl md:text-5xl font-semibold text-white uppercase leading-snug md:leading-[120%] mb-6">
            {data.title || "Experience Top-Notch Healthcare Products with Ease"}
          </h1>
          <p className="font-montserrat text-gray-300 text-base sm:text-lg mb-10 max-w-2xl">
            {data.description ||
              "Shop the best products online with seamless delivery and secure transactions. Your trusted destination for premium products across all categories."}
          </p>

          <Link to="/shop">
            <Button className="font-montserrat text-base sm:text-lg text-gray-100 flex items-center gap-2">
              Start Shopping Now
              <MoveUpRight />
            </Button>
          </Link>

          {/* Brand Marquee */}
          <div className="w-full mt-10">
            <Marquee gradient={false} speed={40}>
              <div className="flex items-center gap-12 ">
                <img src="/brand-1.png" alt="brand" className="w-20 md:w-28 object-contain" />
                <img src="/brand-2.png" alt="brand" className="w-20 md:w-28 object-contain" />
                <img src="/brand-3.png" alt="brand" className="w-20 md:w-28 object-contain" />
                <img src="/brand-4.png" alt="brand" className="w-20 md:w-28 object-contain" />
              </div>
            </Marquee>
          </div>
        </div>
      </CommonWrapper>
    </section>
  )
}

export default Hero

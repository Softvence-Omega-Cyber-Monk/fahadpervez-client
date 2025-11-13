import React from "react";
import CommonWrapper from "@/common/CommonWrapper";

const BrandsOfTheWeek: React.FC = () => {
  // Images must be placed in /public/assets/ folder
  const brands = [
    { name: "Muscletech", logo: "1.jpg", alt: "Muscletech" },
    { name: "Ensure", logo: "2.jpg", alt: "Ensure" },
    { name: "Met-Rx", logo: "3.jpg", alt: "Met-Rx" },
    { name: "Geritol", logo: "4.jpg", alt: "Geritol" },
    { name: "Hydroxycut", logo: "5.jpg", alt: "Hydroxycut" },
    { name: "Cellucor", logo: "6.jpg", alt: "Cellucor" },
  ];

  // Duplicate brands to create seamless scrolling
  const scrollingBrands = [...brands, ...brands];

  return (
    <CommonWrapper>
      <section className="pt-20 overflow-hidden">
        <h3 className="font-semibold text-gray-800 mb-6">Brands of the Week</h3>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee gap-6">
            {scrollingBrands.map((brand, index) => (
              <div
                key={index}
                className="w-32 h-16 sm:w-40 sm:h-20 flex items-center justify-center p-2 bg-white rounded-md border border-gray-200"
              >
                <img
                  src={brand.logo}
                  alt={brand.alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add this in your global CSS (or tailwind config) */}
        <style>
          {`
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
                }
                
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 20s linear infinite;
                    }
                    `}
        </style>
      </section>
    </CommonWrapper>
  );
};

export default BrandsOfTheWeek;

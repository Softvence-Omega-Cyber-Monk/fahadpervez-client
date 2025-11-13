import CommonWrapper from "@/common/CommonWrapper";
import React from "react";

const BrandsOfTheWeek: React.FC = () => {
  // Mock brand data - replace with actual data from your API if needed
  const brands = [
    {
      name: "Muscletech",
      logo: "../../../src/assets/1.jpg",
      alt: "Muscletech",
    },
    { name: "Ensure", logo: "../../../src/assets/2.jpg", alt: "Ensure" },
    { name: "Met-Rx", logo: "../../../src/assets/3.jpg", alt: "Met-Rx" },
    { name: "Geritol", logo: "../../../src/assets/4.jpg", alt: "Geritol" },
    { name: "Hydroxycut", logo: "../../../src/assets/5.jpg", alt: "Hydroxycut" },
    { name: "Cellucor", logo: "../../../src/assets/6.jpg", alt: "Cellucor" },
  ];

  return (
    <CommonWrapper>
      <section className="pt-20">
        <div className="">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h3 className=" font-semibold text-gray-800">
                Brands of the Week
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="w-32 h-16 sm:w-40 sm:h-20 bg-white rounded-md border border-gray-200 flex items-center justify-center p-2 hover:shadow-md transition-shadow duration-200"
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
      </section>
    </CommonWrapper>
  );
};

export default BrandsOfTheWeek;

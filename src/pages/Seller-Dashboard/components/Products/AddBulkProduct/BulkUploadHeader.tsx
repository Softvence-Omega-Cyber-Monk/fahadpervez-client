import { AiOutlineInfo } from "react-icons/ai";

export default function BulkUploadHeader() {
const requiredColumns = [
  "productName", "productCategory", "productSKU", "companyName", "gender",
  "availableSize", "productDescription", "stock", "currency", "pricePerUnit",
  "specialPrice", "specialPriceStartingDate", "specialPriceEndingDate",
  "mainImageUrl", "sideImageUrl", "sideImage2Url", "lastImageUrl",
  "videoUrl", "length", "width", "height", "weight"
];
  return (
    <div className="bg-primary-blue/10 rounded-2xl p-6">
      <div className="space-y-3">
        <div className="flex gap-3">
        <div className="flex-shrink-0 w-6 h-6 bg-primary-blue rounded-full flex items-center justify-center mt-0.5">
          <AiOutlineInfo className="text-light-background"/>
        </div>
        <div className="">
        <h3 className="font-medium">
            Before You Upload
          </h3>
        </div>
        </div>
        <div className="flex-1 pr-32">
          <p className=" p2 text-base my-4 font-normal">
            Make sure your Excel/CSV file contains the following columns in this
            exact order:
          </p>
          <div className="flex flex-wrap gap-2">
            {requiredColumns.map((column, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-white text-dark-blue text-xs font-medium rounded-xl border border-border"
              >
                {column}
              </span>
            ))}
          </div>
        </div>
      </div>  
    </div>
  );
}

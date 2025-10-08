import { useState } from "react";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import PrimaryButton from "./PrimaryButton";
interface OrderSearchBarProps {
  tableType: string;
}
export default function OrderSearchBar(props: OrderSearchBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [orderDate] = useState("Order date");
  const [orderStatus] = useState("Order Status");

  return (
    <div className="w-full md:flex space-y-5 md:space-y-0 items-center justify-between gap-4">
      <div className="flex bg-light-background  rounded-2xl items-stretch  gap-3 w-full ">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0 h-full">
          <input
            type="text"
            placeholder="Search by order id"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full h-12 pl-4 pr-11 text-sm text-gray-700 placeholder-gray-400 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-0 top-0 h-12 w-10 flex items-center justify-center bg-blue-500 rounded-r-lg hover:bg-blue-600 transition-colors">
            <Search className=" text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>
      <div className="">
        {/* Filter Button and Dropdowns Container */}
        {props.tableType === "Button" ? (
            <div className="flex items-center gap-4">
                <PrimaryButton
                  type="Primary"
                  title="Edit Select"
                  rightIcon={<MdEdit className="size-5" />}
                />
                <PrimaryButton
                  type="Outline"
                  title="Delete Select"
                  rightIcon={<MdDelete className="size-5" />
}
                />

            </div>
        ) :(
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Filter Icon Button */}
            <button className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0">
              <SlidersHorizontal
                className="w-5 h-5 text-gray-600"
                strokeWidth={2}
              />
            </button>

            {/* Order Date Dropdown */}
            <button className="h-10 px-4 flex items-center justify-between gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[140px]">
              <span className="text-sm text-gray-700 whitespace-nowrap">
                {orderDate}
              </span>
              <ChevronDown
                className="w-4 h-4 text-gray-600 flex-shrink-0"
                strokeWidth={2}
              />
            </button>

            {/* Order Status Dropdown */}
            <button className="h-10 px-4 flex items-center justify-between gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[140px]">
              <span className="text-sm text-gray-700 whitespace-nowrap">
                {orderStatus}
              </span>
              <ChevronDown
                className="w-4 h-4 text-gray-600 flex-shrink-0"
                strokeWidth={2}
              />
            </button>
          </div>
        ) }
      </div>
    </div>
  );
}

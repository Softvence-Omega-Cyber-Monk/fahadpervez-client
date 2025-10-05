import type React from "react"
import StoreProfileImg from "../../assets/storeProfileImg.png"

const StoreProfile: React.FC = () => {
  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        {/* Left: Logo and Company Info */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
            {/* <span className="text-white font-bold text-lg sm:text-xl">ikea</span>
             */}
             <img className="w-full h-full object-cover" src={StoreProfileImg} alt="" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">iMedKeat Industries</h1>
            <p className="text-xs sm:text-sm text-gray-500">Manufacturer</p>
          </div>
        </div>

        {/* Right: Message Button and Rating */}
        <div className="flex flex-col sm:items-end gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium w-full sm:w-auto">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Message
          </button>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900">4.6</span>
            <span className="text-sm text-gray-500">(934)</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mb-6">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <span>Sunnyvale, California, USA</span>
      </div>

      {/* Stats Section */}
      <div className="pt-4 sm:pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Seller since */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Seller since</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">2019</p>
          </div>

          {/* Orders */}
          <div className="text-center relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-12 before:bg-gray-200">
            <p className="text-xs text-gray-500 mb-1">Orders</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">1,250</p>
          </div>

          {/* Countries */}
          <div className="text-center relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-12 before:bg-gray-200 sm:before:block before:hidden">
            <p className="text-xs text-gray-500 mb-1">Countries</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">6</p>
          </div>

          {/* Response */}
          <div className="text-center relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-12 before:bg-gray-200">
            <p className="text-xs text-gray-500 mb-1">Response</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">2H</p>
          </div>

          {/* Rating */}
          <div className="text-center relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-12 before:bg-gray-200">
            <p className="text-xs text-gray-500 mb-1">Rating</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">4.5</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreProfile

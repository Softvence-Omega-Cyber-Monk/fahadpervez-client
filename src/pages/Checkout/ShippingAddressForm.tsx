const ShippingAddressForm = () => {
  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-[10px]">
      <h2 className="text-[#1C2A33] text-[18px] sm:text-[20px] font-[600] mb-6">Add new shipping Address</h2>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-[#1C2A33] text-[13px] sm:text-[14px] font-[400] mb-2">
            Full name (No business or company name)*
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full px-4 py-3 bg-[#E8EBED] text-[#1C2A33] text-[14px] rounded-[4px] border-none outline-none"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobileNumber" className="block text-[#1C2A33] text-[13px] sm:text-[14px] font-[400] mb-2">
            Mobile number/Billing phone number
          </label>
          <input
            type="tel"
            className="w-full px-4 py-3 bg-[#E8EBED] text-[#1C2A33] text-[14px] rounded-[4px] border-none outline-none"
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-[#1C2A33] text-[13px] sm:text-[14px] font-[400] mb-2">
            Country*
          </label>
          <div className="relative">
            <select
              id="country"
              name="country"
              defaultValue="USA"
              className="w-full px-4 py-3 bg-[#E8EBED] text-[#1C2A33] text-[14px] rounded-[4px] border-none outline-none appearance-none cursor-default"
            >
              <option value="USA">USA</option>
              <option value="CANADA">CANADA</option>
              <option value="AUSTRALIA">AUSTRALIA</option>
              <option value="BANGLADESH">BANGLADESH</option>
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0066FF] pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Address Specific */}
        <div>
          <label htmlFor="addressSpecific" className="block text-[#1C2A33] text-[13px] sm:text-[14px] font-[400] mb-2">
            Address specific*
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-[#E8EBED] text-[#1C2A33] text-[14px] rounded-[4px] border-none outline-none"
          />
        </div>

        {/* City, State, Zip Code */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-[#1C2A33] text-[13px] sm:text-[14px] font-[400] mb-2">
              City*
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-[#E8EBED] text-[#1C2A33] text-[14px] rounded-[4px] border-none outline-none"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-[#1C2A33] text-[13px] sm:text-[14px] font-[400] mb-2">
              State*
            </label>
            <input
              type="text"
              name="state"
              className="w-full px-4 py-3 bg-[#E8EBED] text-[#1C2A33] text-[14px] rounded-[4px] border-none outline-none"
            />
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-[#1C2A33] text-[13px] sm:text-[14px] font-[400] mb-2">
              Zip code*
            </label>
            <input
              type="text"
              name="zipCode"
              placeholder="98121"
              className="w-full px-4 py-3 bg-[#E8EBED] text-[#1C2A33] text-[14px] rounded-[4px] border-none outline-none"
            />
          </div>
        </div>

        {/* Default Address Checkbox */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="isDefaultAddress"
            className="w-4 h-4 rounded border-2 border-[#70797E] text-[#0066FF] cursor-default"
          />
          <label htmlFor="isDefaultAddress" className="text-[#1C2A33] text-[13px] sm:text-[14px] font-[400]">
            Set as my default address
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-full bg-[#0066FF] hover:bg-[#254472] text-white text-[15px] sm:text-[16px] font-[600] py-3 rounded-[6px] mt-6 cursor-default"
        >
          Save and continue
        </button>
      </div>
    </div>
  )
}

export default ShippingAddressForm
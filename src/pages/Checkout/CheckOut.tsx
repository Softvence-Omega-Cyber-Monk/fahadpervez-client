import { ChevronRight, Tag } from "lucide-react"
import { Link } from "react-router-dom"
import ShippingAddressForm from "./ShippingAddressForm"
import ShippingMethod from "./ShippingMethod"
import PaymentMethod from "./PaymentMethod"

const CheckOut = () => {
    return (
        <div className="min-h-screen bg-[#F1F5F8] ">
            <div className="max-w-[1120px] mx-auto py-[30px] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
                    {/*  */}
                    <div className="col-span-2 flex flex-col gap-7">
                        <div className="flex items-center gap-3.5 text-[16px] text-[#00000099] font-[400] not-italic">
                            <h4 className="flex gap-1 items-center">Cart<ChevronRight width={24} height={20} /></h4>
                            <h4 className="flex gap-1 items-center">Address<ChevronRight width={24} height={20} /></h4>
                            <h4 className="flex gap-1 items-center">Shipping<ChevronRight width={24} height={20} /></h4>
                            <h4 className="flex gap-1 items-center">Payment</h4>
                        </div>
                        <ShippingAddressForm />
                        <ShippingMethod />
                        <PaymentMethod />
                    </div>
                    {/* Order Summery Start */}
                    <div className="col-span-1 w-full lg:w-[380px] flex-shrink-0">
                        <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
                            <h3 className="text-[24px] sm:text-[28px] font-[600] text-[#1C2A33] mb-6">
                                Order Summary
                            </h3>

                            {/* Price Breakdown */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#70797E] text-[16px] font-[500]">Price</span>
                                    <span className="text-[#1C2A33] text-[16px] font-[600]">
                                        ${50}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#70797E] text-[16px] font-[500]">Shipping</span>
                                    <span className="text-[#1C2A33] text-[16px] font-[600]">
                                        ${50}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#70797E] text-[16px] font-[500]">Discount</span>
                                    <span className="text-[#00C853] text-[16px] font-[600]">
                                        ${50}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#70797E] text-[16px] font-[500]">TAX</span>
                                    <span className="text-[#1C2A33] text-[16px] font-[600]">
                                        ${50}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-[#E8EBED] pt-4 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[#70797E] text-[18px] font-[500]">Total</span>
                                    <span className="text-[#1C2A33] text-[24px] font-[700]">
                                        ${50}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#70797E] text-[14px] font-[500]">
                                        Estimated Delivery
                                    </span>
                                    <span className="text-[#1C2A33] text-[14px] font-[600]">
                                        4 August
                                    </span>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Promo Code"
                                        className="w-full px-4 py-3 pr-12 bg-[#F1F5F8] rounded-lg text-[#1C2A33] placeholder:text-[#70797E] text-[15px] font-[500] outline-none focus:ring-2 focus:ring-[#0066FF] transition-all"
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#70797E] hover:text-[#1C2A33] transition-colors"
                                        aria-label="Apply promo code"
                                    >
                                        <Tag size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <Link to={`/`}>
                                <button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-[600] text-[16px] py-4 rounded-lg transition-colors shadow-sm">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Oder Summary End */}
            </div>
        </div>
    )
}

export default CheckOut
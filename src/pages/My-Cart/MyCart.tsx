import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  updateStatus,
} from "@/store/Slices/CartSlice/cartSlice";

const MyCart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const shipping = 0;
  const discount = 0;
  const tax = 0;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.selectedProduct ? item.totalPrice || 0 : 0),
    0
  );
  const total = subtotal + shipping - discount + tax;
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  const deliveryDate = threeDaysLater.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // const updateCartStatus = (itemId: string) => {
  //   if (selectedItemId === itemId) {
  //     setSelectedItemId(null);
  //   } else {
  //     setSelectedItemId(itemId);
  //   }
  //   console.log(selectedItemId)
  //   dispatch(updateStatus({id:itemId, status:true}));
  //   console.log(cartItems)
  // };

  return (
    <div className="max-w-[80vw] mx-auto mt-28">
      <div className="">
        {/* Cart Heading */}
        <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] not-italic uppercase font-semibold text-center text-[#1C2A33] mb-8 sm:mb-10">
          My Cart
        </h1>

        {/* Cart Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Cart Items Section */}
          <div className="flex-1">
            <h3 className="mb-6">
              <span className="text-[24px] sm:text-[28px] text-[#1C2A33] font-semibold not-italic uppercase">
                CART
              </span>{" "}
              <span className="text-[#70797E] text-[15px] not-italic font-medium">
                {cartItems.length} Items
              </span>
            </h3>

            {/* Cart Items */} 
            <div className="space-y-4">
              {cartItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center border-b border-[#C9CCCE]"
                  >
                    {/* Real Radio Button */}
                    <label className="shrink-0 relative cursor-pointer  right-3">
                      <input
                        type="checkbox"
                        name="selectedCartItem"
                        value={item.id}
                        checked={item.selectedProduct}
                        onChange={() =>
                          dispatch(
                            updateStatus({
                              id: item.id,
                              status: !item.selectedProduct,
                            })
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className={`w-6 h-6 rounded-full border-[3px] relative border-[#0066FF] grid`}>
                        {item.selectedProduct && <div className="bg-[#0066FF] place-self-center size-3 rounded-full "></div>}
                      </div>
                    </label>

                    {/* Product Image */}
                    <div className="shrink-0 w-full sm:w-[120px] md:w-40">
                      <div className="bg-[#E8EBED] rounded-lg aspect-square flex items-center justify-center p-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain rounded-sm"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-[#1C2A33] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[#70797E] text-[14px] font-medium mb-px">
                        Product Code-{item.productSKU}
                      </p>
                      <p className="text-[#70797E] text-[14px] font-medium mb-4">
                        Price per unit-{item.pricePerUnit.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex  justify-around items-center gap-4 shadow p-2 rounded-full">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="w-10 h-10 cursor-pointer rounded-full bg-[#E6F3FF] flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="w-10 h-10 rounded-full bg-[#EAEAEA] border border-[#BDBDBD] text-center text-[#1C2A33] font-medium text-[16px] outline-none"
                          />
                          <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center bg-[#E6F3FF] hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="flex items-center gap-2 text-[#FF4444] hover:text-[#CC0000] transition-colors text-[14px] font-medium"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="shrink-0 self-start sm:self-center relative sm:bottom-[58px]">
                      <p className="font-semibold text-[#0082FA] text-[24px] not-italic">
                        ${item?.totalPrice?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full lg:w-[380px] shrink-0 mt-20">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
              <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#1C2A33] mb-6">
                Order Summary
              </h3>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#70797E] text-[16px] font-medium">
                    Price
                  </span>
                  <span className="text-[#1C2A33] text-[16px] font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#70797E] text-[16px] font-medium">
                    Shipping
                  </span>
                  <span className="text-[#1C2A33] text-[16px] font-semibold">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#70797E] text-[16px] font-medium">
                    Discount
                  </span>
                  <span className="text-[#00C853] text-[16px] font-semibold">
                    ${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#70797E] text-[16px] font-medium">
                    TAX
                  </span>
                  <span className="text-[#1C2A33] text-[16px] font-semibold">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#E8EBED] pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#70797E] text-[18px] font-medium">
                    Total
                  </span>
                  <span className="text-[#1C2A33] text-[24px] font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#70797E] text-[14px] font-medium">
                    Estimated Delivery
                  </span>
                  <span className="text-[#1C2A33] text-[14px] font-semibold">
                    {deliveryDate}
                  </span>
                </div>
              </div>
              {/* Checkout Button */}
              <Link to={`/checkout`}>
                <button className="w-full cursor-pointer bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-[16px] py-4 rounded-lg transition-colors shadow-sm">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;

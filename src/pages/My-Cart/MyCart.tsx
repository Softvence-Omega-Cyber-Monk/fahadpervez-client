import React, { useState } from 'react';
import { Minus, Plus, Trash2, Tag } from 'lucide-react';
import AddToCartImg from "../../assets/addToCartImg.png"
import { Link } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  productCode: string;
  price: number;
  quantity: number;
  image: string;
}

const MyCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Harmony biotic digestive tablets',
      productCode: '34rh9t388',
      price: 7.99,
      quantity: 1,
      image: AddToCartImg
    },
    {
      id: 2,
      name: 'Harmony biotic digestive tablets',
      productCode: '34rh9t388',
      price: 7.99,
      quantity: 1,
      image: AddToCartImg
    },
    {
      id: 3,
      name: 'Harmony biotic digestive tablets',
      productCode: '34rh9t388',
      price: 7.99,
      quantity: 1,
      image: AddToCartImg
    },
    {
      id: 4,
      name: 'Harmony biotic digestive tablets',
      productCode: '34rh9t388',
      price: 7.99,
      quantity: 1,
      image: AddToCartImg
    },
    {
      id: 5,
      name: 'Harmony biotic digestive tablets',
      productCode: '34rh9t388',
      price: 7.99,
      quantity: 1,
      image: AddToCartImg
    },
    {
      id: 6,
      name: 'Harmony biotic digestive tablets',
      productCode: '34rh9t388',
      price: 7.99,
      quantity: 1,
      image: AddToCartImg
    }
  ]);

  const [promoCode, setPromoCode] = useState<string>('');

  const shipping = 1.99;
  const discount = 2.00;
  const tax = 0.50;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + shipping - discount + tax;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="">
      <div className="">
        {/* Cart Heading */}
        <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] not-italic uppercase font-[600] text-center text-[#1C2A33] mb-8 sm:mb-10">
          My Cart
        </h1>

        {/* Cart Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Cart Items Section */}
          <div className="flex-1">
            <h3 className="mb-6">
              <span className="text-[24px] sm:text-[28px] text-[#1C2A33] font-[600] not-italic uppercase">
                CART
              </span>{' '}
              <span className="text-[#70797E] text-[15px] not-italic font-[500]">
                {cartItems.length} Items
              </span>
            </h3>

            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-sm"
                >
                  {/* Radio Button */}
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 rounded-full border-[3px] border-[#0066FF] bg-white relative">
                      <div className="absolute inset-[3px] rounded-full bg-[#0066FF]"></div>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="flex-shrink-0 w-full sm:w-[120px] md:w-[160px]">
                    <div className="bg-[#E8EBED] rounded-lg aspect-square flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[18px] sm:text-[20px] md:text-[22px] font-[600] text-[#1C2A33] mb-2">
                      {item.name}
                    </h4>
                    <p className="text-[#70797E] text-[14px] font-[500] mb-4">
                      Product Code-{item.productCode}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2 bg-[#F1F5F8] rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#0066FF] hover:bg-white rounded-full transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-12 text-center bg-transparent text-[#1C2A33] font-[500] text-[16px] outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#0066FF] hover:bg-white rounded-full transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-2 text-[#FF4444] hover:text-[#CC0000] transition-colors text-[14px] font-[500]"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex-shrink-0 self-start sm:self-center">
                    <p className="text-[24px] sm:text-[28px] font-[600] text-[#0066FF]">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
              <h3 className="text-[24px] sm:text-[28px] font-[600] text-[#1C2A33] mb-6">
                Order Summary
              </h3>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#70797E] text-[16px] font-[500]">Price</span>
                  <span className="text-[#1C2A33] text-[16px] font-[600]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#70797E] text-[16px] font-[500]">Shipping</span>
                  <span className="text-[#1C2A33] text-[16px] font-[600]">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#70797E] text-[16px] font-[500]">Discount</span>
                  <span className="text-[#00C853] text-[16px] font-[600]">
                    ${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#70797E] text-[16px] font-[500]">TAX</span>
                  <span className="text-[#1C2A33] text-[16px] font-[600]">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#E8EBED] pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#70797E] text-[18px] font-[500]">Total</span>
                  <span className="text-[#1C2A33] text-[24px] font-[700]">
                    ${total.toFixed(2)}
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
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
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
              <Link to={`/checkout/${10}`}>
                <button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-[600] text-[16px] py-4 rounded-lg transition-colors shadow-sm">
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useMemo } from "react";
import "react-phone-number-input/style.css";
import {
  CreditCard,
  Lock,
  AlertCircle,
  CheckCircle,
  Loader,
  MapPin,
  Package,
  X,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useRedux";
import { useCreateOrderMutation } from "@/Redux/Features/Order/Order.api";
import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";
import countryList from "react-select-country-list";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
// Extend window for Mastercard Checkout
declare global {
  interface Window {
    Checkout: any;
    afsErrorCallback: (error: any) => void;
    afsCancelCallback: () => void;
    afsCompleteCallback: (resultIndicator: string) => void;
  }
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { data: userProfileData } = useGetMeQuery({});
  const carts = useAppSelector((state) => state.cart.items);
  const cartItems = carts.filter((item) => item.selectedProduct);
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();
  const options = useMemo(() => countryList().getData(), []);
  const [value, setValue] = useState(null);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // Shipping form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    remarks: "",
    shippingMethod: "aramex",
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const [phone, setPhone] = useState<E164Number | undefined>();
  // Shipping methods
  const shippingMethods = {
    aramex: {
      name: "Aramex",
      fee: 10,
      deliveryDays: 5,
      description: "Standard delivery",
    },
    oreem: {
      name: "Oreem",
      fee: 12,
      deliveryDays: 3,
      description: "Express delivery",
    },
  };

  // Payment state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Refs
  const sessionRef = useRef<{
    sessionId: string;
    successIndicator: string;
    orderId: string;
    paymentInitData?: any;
    databaseOrderId?: string;
    amount: number;
    currency: string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isProcessingRef = useRef(false);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );
  const selectedShipping =
    shippingMethods[formData.shippingMethod as keyof typeof shippingMethods];
  const shippingFee = subtotal > 100 ? 0 : selectedShipping.fee;
  const tax = subtotal * 0.05;
  const total = subtotal + shippingFee + tax;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + selectedShipping.deliveryDays);

  // Load Mastercard Checkout script
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://afs.gateway.mastercard.com/static/checkout/checkout.min.js";
    script.async = true;

    script.setAttribute("data-error", "afsErrorCallback");
    script.setAttribute("data-cancel", "afsCancelCallback");
    script.setAttribute("data-complete", "afsCompleteCallback");

    script.onload = () => {
      console.log("Mastercard Checkout script loaded");
      setScriptLoaded(true);
    };

    script.onerror = () => {
      setError("Failed to load payment gateway");
    };

    document.body.appendChild(script);

    // Global callbacks
    window.afsErrorCallback = (error: any) => {
      console.error("Payment error:", error);
      setError("Payment failed. Please try again.");
      setLoading(false);
      isProcessingRef.current = false;
    };

    window.afsCancelCallback = () => {
      console.log("Payment cancelled");
      setError("Payment was cancelled.");
      setLoading(false);
      isProcessingRef.current = false;
    };

    window.afsCompleteCallback = (resultIndicator: string) => {
      console.log("Payment completed with result:", resultIndicator);
      const session = sessionRef.current;
      if (!session || isProcessingRef.current) return;

      if (resultIndicator === session.successIndicator) {
        updateOrderAfterPayment(
          session.databaseOrderId!,
          session.orderId,
          resultIndicator
        );
      } else {
        setError("Payment verification failed.");
        setLoading(false);
        isProcessingRef.current = false;
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      delete (window as any).afsErrorCallback;
      delete (window as any).afsCancelCallback;
      delete (window as any).afsCompleteCallback;
    };
  }, []);

  const changeHandler = (selected: any) => {
    setValue(selected);
    setFormData((prev: any) => ({ ...prev, country: selected.label }));
  };
  // Form handling
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

  const handleShippingMethodChange = (method: string) => {
    setFormData((prev) => ({ ...prev, shippingMethod: method }));
  };

  const validateForm = () => {
    const errors: any = {};
    if (!formData.fullName.trim()) errors.fullName = "Required";
    if (!formData.email.trim()) errors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email";
    if (!phone) errors.phone = "Required";
    if (!formData.country.trim()) errors.country = "Required";
    if (!formData.address.trim()) errors.address = "Required";
    if (!formData.city.trim()) errors.city = "Required";
    if (!formData.state.trim()) errors.state = "Required";
    if (!formData.zipCode.trim()) errors.zipCode = "Required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  console.log(phone);
  // Create order first, then initialize payment
  const handlePlaceOrder = async () => {
    if (!validateForm() || isProcessingRef.current) return;

    setLoading(true);
    setError("");
    setPaymentSuccess(false);
    isProcessingRef.current = true;

    sessionRef.current = null;

    try {
      // Step 1: Create order in database with PENDING payment status
      const orderData = {
        fullName: formData.fullName,
        mobileNumber: phone,
        country: formData.country,
        addressSpecific: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        shippingMethodId:
          formData.shippingMethod === "aramex"
            ? "6902ded28dc8ab84fb8481ee"
            : "69033edab5704c861a8cb4a2",
        totalPrice: subtotal,
        shippingFee: shippingFee,
        discount: 0,
        tax: tax,
        estimatedDeliveryDate: deliveryDate.toISOString(),
        orderNotes: formData.remarks || "",
        transactionId: `TXN-${Date.now()}`, // Temporary transaction ID
      };
      console.log(orderData);
      const orderResponse = await createOrder(orderData).unwrap();
      console.log("Order created:", orderResponse);

      const databaseOrderId =
        orderResponse.data?.orderId || orderResponse._id || "";

      if (!databaseOrderId) {
        throw new Error("Failed to get order ID from database");
      }

      // Step 2: Initialize payment
      const paymentResponse = await fetch(
        "https://fahadpervez-backend-803d.onrender.com/api/v1/afspay/initialize",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total.toFixed(2),
            currency: "USD",
            description: `Order payment - ${databaseOrderId}`,
            operation: "PURCHASE",
          }),
        }
      );

      const paymentData = await paymentResponse.json();

      if (paymentData.success) {
        const { sessionId, successIndicator, orderId } = paymentData.data;

        // Store in ref for callbacks
        sessionRef.current = {
          sessionId,
          successIndicator,
          orderId,
          paymentInitData: paymentData,
          databaseOrderId: databaseOrderId,
          amount: total,
          currency: "USD",
        };

        setShowPaymentModal(true);

        // Show payment iframe
        setTimeout(() => {
          if (containerRef.current && window.Checkout) {
            containerRef.current.innerHTML = "";
            window.Checkout.configure({ session: { id: sessionId } });
            window.Checkout.showEmbeddedPage("#checkout-container");
            setLoading(false);
            isProcessingRef.current = false;
          }
        }, 100);
      } else {
        setError(paymentData.message || "Failed to initialize payment");
        setLoading(false);
        isProcessingRef.current = false;
      }
    } catch (err: any) {
      console.error("Order creation error:", err);
      setError(err.data?.message || err.message || "Failed to create order");
      setLoading(false);
      isProcessingRef.current = false;
    }
  };

  // Update order after successful payment
  const updateOrderAfterPayment = async (
    databaseOrderId: string,
    transactionOrderId: string,
    resultIndicator: string
  ) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setLoading(true);

    try {
      const session = sessionRef.current;

      // Step 3: Update order with payment history
      const updatePaymentResponse = await fetch(
        `https://fahadpervez-backend-803d.onrender.com/api/v1/orders/admin/${databaseOrderId}/payment-history`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentStatus: "completed", // Payment successful
            paymentHistory: {
              paymentGateway: "Mastercard AFS",
              gatewayTransactionId: transactionOrderId,
              sessionId: session?.sessionId || "",
              resultIndicator: resultIndicator,
              successIndicator: session?.successIndicator || "",
              amount: session?.amount || total,
              currency: session?.currency || "USD",
              paymentMethod: "Credit Card",
              gatewayResponse: session?.paymentInitData || {},
            },
          }),
        }
      );

      const updatePaymentData = await updatePaymentResponse.json();

      if (updatePaymentData.success) {
        console.log("Payment updated successfully:", updatePaymentData);

        const successPageData = {
          paymentResponse: {
            sessionId: session?.sessionId || "",
            successIndicator: session?.successIndicator || "",
            orderId: session?.orderId || "",
            resultIndicator: resultIndicator,
            amount: total.toFixed(2),
            currency: "USD",
            timestamp: new Date().toISOString(),
          },
          orderResponse: {
            orderId: databaseOrderId,
            orderNumber:
              updatePaymentData.data?.orderNumber ||
              databaseOrderId.slice(-8).toUpperCase(),
            status: updatePaymentData.data?.status || "Confirmed",
            paymentStatus: updatePaymentData.data?.paymentStatus || "completed",
            totalAmount: subtotal,
            shippingFee: shippingFee,
            tax: tax,
            discount: 0,
            grandTotal: total,
            estimatedDeliveryDate: deliveryDate.toISOString(),
            createdAt: new Date().toISOString(),
            customer: {
              fullName: formData.fullName,
              email: formData.email,
              phone: formData.phone,
            },
            shippingAddress: {
              country: formData.country,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
            },
            shippingMethod: {
              name: selectedShipping.name,
              fee: shippingFee,
              deliveryDays: selectedShipping.deliveryDays,
            },
            products: cartItems.map((item) => ({
              productId: item.id,
              title: item.title,
              quantity: item.quantity,
              price: (item.totalPrice || 0) / item.quantity,
              totalPrice: item.totalPrice || 0,
            })),
            transactionId: transactionOrderId,
            orderNotes: formData.remarks || "",
          },
          rawPaymentData: session?.paymentInitData,
        };

        setPaymentSuccess(true);
        setError("");
        setLoading(false);

        // Redirect to success page
        setTimeout(() => {
          setShowPaymentModal(false);
          navigate("/order-success", { state: { orderData: successPageData } });
        }, 2000);
      } else {
        throw new Error(
          updatePaymentData.error || "Failed to update payment status"
        );
      }
    } catch (error: any) {
      console.error("Payment update error:", error);
      setError(error.message || "Failed to update payment status");
      setLoading(false);
      isProcessingRef.current = false;
    }
  };

  // Reset modal on close
  const closeModal = () => {
    if (paymentSuccess) return;

    setShowPaymentModal(false);
    setError("");
    setLoading(false);
    isProcessingRef.current = false;
    sessionRef.current = null;

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto mt-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-indigo-600" />
                Shipping Information
              </h2>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.fullName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    {formErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    {/* <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="+1234567890"
                    /> */}
                    <PhoneInput
                      defaultCountry="BH"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                        !phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={setPhone}
                    />
                    {!phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country *
                    </label>
                    {/* <input type="text" name="country" value={formData.country} onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${formErrors.country ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="United States" /> */}
                    <Select
                      options={options}
                      value={value}
                      onChange={changeHandler}
                      styles={{
                        control: (base) => ({
                          ...base,
                          border: "none",
                          boxShadow: "none",
                          backgroundColor: "white",
                          minHeight: "48px",
                          "&:hover": { border: "none" },
                        }),
                      }}
                      className={`w-full px-4  border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.country
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.country}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                      formErrors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="123 Main Street"
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.address}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="New York"
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.state ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="NY"
                    />
                    {formErrors.state && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.zipCode
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="10001"
                    />
                    {formErrors.zipCode && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.zipCode}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Order Remarks (Optional)
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Special instructions..."
                  />
                </div>
              </div>
            </div>

            {/* Shipping Methods */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6 text-indigo-600" />
                Shipping Method
              </h2>

              <div className="space-y-3">
                {Object.entries(shippingMethods).map(([key, method]) => (
                  <div
                    key={key}
                    onClick={() => handleShippingMethodChange(key)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.shippingMethod === key
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.shippingMethod === key
                              ? "border-indigo-600"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.shippingMethod === key && (
                            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {method.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {method.description} - Delivery in{" "}
                            {method.deliveryDays} days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {subtotal > 100
                            ? "FREE"
                            : `$${method.fee.toFixed(2)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {subtotal > 100 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      🎉 Congratulations! You qualify for FREE shipping
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-indigo-600" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-indigo-600">
                        ${item.totalPrice?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <div className="flex flex-col">
                    <span>Shipping ({selectedShipping.name})</span>
                    {subtotal > 100 && (
                      <span className="text-xs text-green-600">
                        Free shipping applied
                      </span>
                    )}
                  </div>
                  <span className="font-semibold">
                    {subtotal > 100 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-6 p-3 bg-blue-50 rounded-lg text-sm">
                <p className="text-gray-700">
                  <strong>Estimated Delivery:</strong>
                  <br />
                  {deliveryDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={
                  loading ||
                  !scriptLoaded ||
                  isCreatingOrder ||
                  isProcessingRef.current ||
                  !userProfileData
                }
                className="w-full cursor-pointer bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {loading || isCreatingOrder ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : !scriptLoaded ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    {userProfileData?.data
                      ? "Place Order"
                      : "Login to place order"}
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 ">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-indigo-600" />
                  {paymentSuccess ? "Payment Successful!" : "Secure Payment"}
                </h3>
                {!paymentSuccess && (
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>

              {paymentSuccess && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-green-900">
                      Payment Successful!
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Your order has been confirmed. Redirecting...
                    </p>
                  </div>
                </div>
              )}

              {error && !paymentSuccess && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm font-semibold text-red-900">
                      Payment Error
                    </p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {!paymentSuccess && (
                <>
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Amount to Pay:
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Test Card:</strong> 5123456789012346 | Exp: 12/25
                      | CVV: 123
                    </p>
                  </div>

                  <div
                    ref={containerRef}
                    id="checkout-container"
                    className="min-h-[500px] border-2 border-gray-200 rounded-lg p-4 bg-white"
                  ></div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span>256-bit SSL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>PCI Compliant</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Mastercard Gateway</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

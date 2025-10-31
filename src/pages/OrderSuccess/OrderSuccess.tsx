import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUpdateOrderPaymentStatusAdminMutation } from "@/Redux/Features/Order/Order.api";
import { CheckCircle } from "lucide-react";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [updatePaymentStatus] = useUpdateOrderPaymentStatusAdminMutation();

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (orderId) {
      updatePaymentStatus("completed");
    }
  }, [searchParams, updatePaymentStatus]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center border border-gray-200 rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been successfully placed.  
          You can view all your orders in your dashboard.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

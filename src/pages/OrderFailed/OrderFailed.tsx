import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentFailedPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // You can capture the failed orderId or transaction info if needed
    const orderId = searchParams.get("orderId");
    if (orderId) {
      console.log("Payment failed for order:", orderId);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center border border-gray-200 rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed.  
          Please try again or contact support if the issue persists.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate("/checkout")}
            className="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/support")}
            className="px-6 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;

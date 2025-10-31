import { useCancelOrderByIdMutation } from "@/Redux/Features/Order/Order.api";
import { Order } from "@/types/OrderTypes";
// import { Link } from "react-router-dom";
import { toast } from "sonner";


export default function RecentOrderStatus({data}: {data?:Order}) {
const [cancelOrderById] = useCancelOrderByIdMutation()
if(!data){
  return <div className="w-full bg-white p-6 sm:p-8 border-gray-100 border-1 rounded-md">
    <h2 className="text-2xl sm:text-2xl font-medium text-gray-900">
      Recent order status
    </h2>
    <p className="mt-4 text-gray-600">No recent orders found.</p>
  </div>
}
  const {_id,status,
orderNumber,
createdAt,
actualDeliveryDate,
grandTotal,
products,
shippingMethodId} = data
const handleDelete = async ({id} : {id:string}) => {
  const toastId = toast.loading("Cancelling order...");
  try {
        const result = await cancelOrderById({orderId:id, reason: "Cancelled by user"}).unwrap();
        console.log(result)
        if (result?.success) {
          toast.success("Order cancelled successfully!", { id: toastId });
        } else {
          toast.error("Order cancellation failed. Please try again.", { id: toastId });
        }
      } catch (err) {
        toast.error("An unexpected error occurred" + err , { id: toastId });
      }
}
  return (
    <div className="w-full bg-white p-6 sm:p-8 border-gray-100 border-1 rounded-md">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="text-2xl sm:text-2xl font-medium text-gray-900">
              Recent order status
            </h2>
            <span className="inline-block px-4 pt-1.5 bg-orange-50 text-orange-300 text-sm rounded-md">
              {status}
            </span>
          </div>
          
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Last order id: {orderNumber}
          </h3>
        </div>

        {/* Cancel Button */}
        <div >
        <button onClick={()=>handleDelete( {id:_id as string})} className="flex items-center gap-2 text-white px-4 py-px rounded-md bg-red-500 hover:bg-red-400 transition-colors self-start sm:self-auto">
          <span className="text-sm sm:text-base font-medium ">Cancel Order</span>
        </button>
        </div>
      </div>

      {/* Dates Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6 text-md text-gray-700">
        <div>Placed on {new Date(createdAt).toLocaleString("en-us" , {day:"2-digit" , month:"short", year:"numeric"}) }</div>
        <div className="sm:text-right">Estimate delivery time: {new Date(actualDeliveryDate as string).toLocaleDateString( "en-us" , { day:"2-digit" , month:"short" , year:"numeric"})}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Amount Card */}
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-lg text-gray-600 mb-2">Total amount</div>
          <div className="text-3xl font-bold text-gray-900">{grandTotal}</div>
        </div>

        {/* Total Product Card */}
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-lg text-gray-600 mb-2">Total product</div>
          <div className="text-3xl font-bold text-gray-900">{products.length}</div>
        </div>

        {/* Shipping Method Card */}
        <div className="border border-gray-200 rounded-lg p-8 text-center sm:col-span-2 lg:col-span-1">
          <div className="text-lg text-gray-600 mb-2">Shipping method</div>
          <div className="text-xl sm:text-2xl text-[#FFA600]">{shippingMethodId?.name}</div>
        </div>
      </div>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import PrimaryButton from "@/common/PrimaryButton";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteOrderByIdAdminMutation, useGetOrderByIdAdminQuery } from "@/Redux/Features/Order/Order.api";
import { MdCancel } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function RecentOrderStatus() {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderByIdAdminQuery({ id });
  const [deleteOrderById] = useDeleteOrderByIdAdminMutation();
  if (isLoading)
    return (
      <p className="text-center min-h-20 grid place-content-center">
        <Spinner />
      </p>
    );
  const orderData = data?.data;
  console.log(orderData)
  const handleDelete = () => {
    try {
      const res = deleteOrderById(orderData._id);
      console.log(res)
        toast.success("Order cancelled successfully.");
    } catch (error:any) {
      toast.error(error.message || "Order cancellation failed. Please try again.");
    }
  }
  return (
    <div className="w-full bg-white p-6 sm:p-8 border-gray-100 border rounded-2xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="">Recent order status</h2>
            <span className="inline-block px-4 py-2 bg-primary-orange/10 text-primary-orange text-sm rounded-xl">
              {orderData.status}
            </span>
          </div>

          <h3 className="">Order id: {orderData.orderNumber}</h3>
        </div>

        {/* Cancel Button */}
        <PrimaryButton
          type="Outline"
          disabled={orderData.status === "Cancelled"}
          title="Cancel Order"
          className="border-primary-red/10 text-primary-red"
          rightIcon={<MdCancel className="size-6" />}
          onClick={handleDelete}
        />
      </div>

      {/* Dates Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6 text-md text-gray-700">
        <p className="p2 text-base">
          Placed on{" "}
          {new Date(orderData?.createdAt).toLocaleDateString("en-US", {
            weekday: "long", // "Monday"
            year: "numeric", // "2025"
            month: "long", // "November"
            day: "numeric", // "14"
          })}
        </p>
        <p className="p2 text-base">
          Estimate delivery time:{" "}
          {new Date(orderData?.estimatedDeliveryDate).toLocaleDateString("en-US", {
            weekday: "long", // "Monday"
            year: "numeric", // "2025"
            month: "long", // "November"
            day: "numeric", // "14"
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Amount Card */}
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-lg text-gray-600 mb-2">Total amount</div>
          <div className="text-3xl font-bold text-gray-900">{orderData.grandTotal}</div>
        </div>

        {/* Total Product Card */}
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-lg text-gray-600 mb-2">Total product</div>
          <div className="text-3xl font-bold text-gray-900">{orderData?.products?.length}</div>
        </div>

        {/* Shipping Method Card */}
        <div className="border border-gray-200 rounded-2xl p-8 text-center sm:col-span-2 lg:col-span-1">
          <div className="text-lg text-gray-600 mb-2">Shipping method</div>
          <div className="text-xl font-medium sm:text-2xl text-primary-orange">
            Priority shipping
          </div>
        </div>
      </div>
    </div>
  );
}

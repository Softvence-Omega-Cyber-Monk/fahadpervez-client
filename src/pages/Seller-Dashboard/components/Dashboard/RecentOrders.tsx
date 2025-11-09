import { Avatar} from "@/components/ui/avatar"
import { Spinner } from "@/components/ui/spinner"
import { useGetRecentOrdersAdminAndVendorQuery } from "@/Redux/Features/Order/Order.api"
import { Order } from "@/types/OrderTypes";

const statusConfig : Record<
  string,
  { label: string; className: string }
> = {
  "Preparing for Shipment": {
    label: "Preparing for Shipment",
    className: "bg-primary-yellow/10 text-primary-yellow",
  },
  "Pending": {
    label: "Order placed",
    className: "bg-primary-purple/10 text-primary-purple",
  },
  "Confirmed": {
    label: "Out of delivery",
    className: "bg-primary-cyan/10 text-primary-cyan",
  },
  "Cancelled": {
    label: "Cancelled",
    className: "bg-primary-red/10 text-primary-red",
  },
}
export default function RecentOrders() {
  const {data,isLoading} = useGetRecentOrdersAdminAndVendorQuery({});
  if(isLoading) return (<div><Spinner /></div>)
  const orders = data?.data
  return (
    <div className="bg-light-background rounded-xl p-6 border border-border w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-dark-blue">Recent Orders</h2>
        <a href="orders" className="text-primary-blue text-base font-medium hover:underline">
          View All
        </a>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order: Order) => (
          <div key={order._id} className="flex items-center justify-between gap-4 py-2">
            {/* Left: Avatar + Order Info */}
            <div className="sm:flex items-center gap-2 flex-1 min-w-0">
              <Avatar  className="size-12 shrink-0">
                {/* <AvatarImage src={order.image}/> */}
                {
                }

              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="p1">Order : {order.orderNumber}</p>
                <p className="p2">
                  {order.userId.name} · {order.products.length} items · ${order.grandTotal}
                </p>
              </div>
            </div>

            {/* Right: Status Badge */}
            <div
              className={` rounded-xl text-sm font-medium px-4 py-2 whitespace-nowrap shrink-0 ${statusConfig[order.status]?.className}`}
            >
              {statusConfig[order.status]?.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

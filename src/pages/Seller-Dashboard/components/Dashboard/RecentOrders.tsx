import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface Order {
  id: string
  image:string
  customerName: string
  items: number
  amount: number
  status: "preparing" | "placed" | "delivery" | "cancelled"
}

const orders: Order[] = [
  {
    id: "#12748",
    customerName: "John Smith",
    items: 2,
    amount: 78,
    status: "preparing",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "#12749",
    customerName: "Emily Johnson",
    items: 3,
    amount: 120,
    status: "placed",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "#12750",
    customerName: "Michael Brown",
    items: 1,
    amount: 45,
    status: "delivery",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: "#12751",
    customerName: "Sophia Williams",
    items: 4,
    amount: 200,
    status: "cancelled",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];


const statusConfig = {
  preparing: {
    label: "Preparing for Shipment",
    className: "bg-primary-yellow/10 text-primary-yellow",
  },
  placed: {
    label: "Order placed",
    className: "bg-primary-purple/10 text-primary-purple",
  },
  delivery: {
    label: "Out of delivery",
    className: "bg-primary-cyan/10 text-primary-cyan",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-primary-red/10 text-primary-red",
  },
}

export default function RecentOrders() {
  return (
    <div className="bg-light-background rounded-xl p-6 border border-border w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-dark-blue">Recent Orders</h2>
        <a href="#" className="text-primary-blue text-base font-medium hover:underline">
          View All
        </a>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="flex items-center justify-between gap-4 py-2">
            {/* Left: Avatar + Order Info */}
            <div className="sm:flex items-center gap-2 flex-1 min-w-0">
              <Avatar  className="size-12 flex-shrink-0">
                <AvatarImage src={order.image}/>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="p1">Order {order.id}</p>
                <p className="p2">
                  {order.customerName} · {order.items} items · ${order.amount}
                </p>
              </div>
            </div>

            {/* Right: Status Badge */}
            <div
              className={` rounded-xl text-sm font-medium px-4 py-2 whitespace-nowrap flex-shrink-0 ${
                statusConfig[order.status].className
              }`}
            >
              {statusConfig[order.status].label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  FileText,
  Package,
  TrendingUp,
  CreditCard,
  Truck,
  HelpCircle,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Order", href: "/admin/orders", icon: FileText },
  { name: "Product", href: "/admin/products", icon: Package },
  { name: "Sales & Reports", href: "/admin/sales", icon: TrendingUp },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Shipping", href: "/admin/shipping", icon: Truck },
  { name: "Support", href: "/admin/support", icon: HelpCircle },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-white flex flex-col">
      <div className="px-0 border-b border-gray-200 h-20">
        <div className="flex items-center gap-2 w-full h-full justify-center">
          <img src="/Logo.png" alt="" />
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 mt-5">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg text-[18px] font-medium transition-colors",
                isActive ? "bg-primary text-white bg-blue-600" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

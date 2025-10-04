"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Search, SlidersHorizontal, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type BadgeVariant = "default" | "secondary" | "danger" | "outline" | "success" | "warning"

interface Order {
  id: string
  buyer: string
  seller: string
  product: string
  productIcon: string
  date: string
  status: string
  statusVariant: BadgeVariant 
  amount: string
}

const orders: Order[] = [
  {
    id: "ORD-2025-347",
    buyer: "Cody Fisher",
    seller: "Bessie Cooper",
    product: "Cimetidine",
    productIcon: "💊",
    date: "6/21/19",
    status: "Order placed",
    statusVariant: "secondary",
    amount: "$11.70",
  },
  {
    id: "ORD-2025-482",
    buyer: "Ronald Richards",
    seller: "Cameron",
    product: "Ranitidine",
    productIcon: "💊",
    date: "7/18/17",
    status: "Out of delivery",
    statusVariant: "default",
    amount: "$5.22",
  },
  {
    id: "ORD-2025-763",
    buyer: "Brooklyn Simmons",
    seller: "Arlene McCoy",
    product: "Omeprazole",
    productIcon: "💊",
    date: "2/11/12",
    status: "Cancelled",
    statusVariant: "danger",
    amount: "$14.81",
  },
  {
    id: "ORD-2025-159",
    buyer: "Courtney Henry",
    seller: "Theresa Webb",
    product: "Pirenzepine",
    productIcon: "💊",
    date: "7/27/13",
    status: "Delivered",
    statusVariant: "success",
    amount: "$6.48",
  },
  {
    id: "ORD-2025-147",
    buyer: "Guy Hawkins",
    seller: "Guy Hawkins",
    product: "Famotidine",
    productIcon: "💊",
    date: "7/11/19",
    status: "Order placed",
    statusVariant: "secondary",
    amount: "$14.81",
  },
  {
    id: "ORD-2025-148",
    buyer: "Leslie Alexander",
    seller: "Eleanor Pena",
    product: "Sodium bicarbona",
    productIcon: "💊",
    date: "5/30/14",
    status: "Out of delivery",
    statusVariant: "default",
    amount: "$17.84",
  },
  {
    id: "ORD-2025-149",
    buyer: "Darrell Steward",
    seller: "Devon Lane",
    product: "Misoprostol",
    productIcon: "💊",
    date: "12/4/17",
    status: "Preparing for Shipment",
    statusVariant: "warning",
    amount: "$8.99",
  },
  {
    id: "ORD-2025-150",
    buyer: "Kathryn Murphy",
    seller: "Jacob Jones",
    product: "Magaldrate",
    productIcon: "💊",
    date: "11/7/16",
    status: "Delivered",
    statusVariant: "success",
    amount: "$14.81",
  },
  {
    id: "ORD-2025-151",
    buyer: "Wade Warren",
    seller: "Savannah Nguyen",
    product: "Sucralfate",
    productIcon: "💊",
    date: "10/6/13",
    status: "Cancelled",
    statusVariant: "danger",
    amount: "$6.48",
  },
  {
    id: "ORD-2025-152",
    buyer: "Bessie Cooper",
    seller: "Annette Black",
    product: "Amoxicillin",
    productIcon: "💊",
    date: "8/2/19",
    status: "Delivered",
    statusVariant: "success",
    amount: "$5.22",
  },
]

const allStatuses = Array.from(new Set(orders.map(o => o.status)))

export default function Orders() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [dateSort, setDateSort] = useState<"asc" | "desc" | null>(null)

  const filteredOrders = useMemo(() => {
    let filtered = [...orders]

    // Filter by tab
    if (activeTab === "pending") {
      filtered = filtered.filter(o => 
        o.status === "Order placed" || 
        o.status === "Out of delivery" || 
        o.status === "Preparing for Shipment"
      )
    } else if (activeTab === "complete") {
      filtered = filtered.filter(o => o.status === "Delivered")
    } else if (activeTab === "cancel") {
      filtered = filtered.filter(o => o.status === "Cancelled")
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(o => 
        o.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by status
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(o => selectedStatuses.includes(o.status))
    }

    // Sort by date
    if (dateSort) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateSort === "asc" 
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      })
    }

    return filtered
  }, [activeTab, searchQuery, selectedStatuses, dateSort])

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
  }

  const handleViewOrder = (order: Order) => {
    navigate(`/admin/orders/${order.id}`, { state: { order } })
  }

  return (
    <div className="space-y-6 p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="all">All Order</TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="pending">Pending order</TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="complete">Complete Order</TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="cancel">Cancel Order</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 border-none" />
          <Input
            placeholder="Search by order id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-none bg-white"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-white">
            <Button variant="outline" className="gap-2 bg-white cursor-pointer border-none">
              <SlidersHorizontal className="w-4 h-4" />
              Order date
              {dateSort && <span className="text-xs">({dateSort === "asc" ? "↑" : "↓"})</span>}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white border-none">
            <DropdownMenuCheckboxItem
              checked={dateSort === "asc"}
              onCheckedChange={() => setDateSort(dateSort === "asc" ? null : "asc")}
              className="border-b border-gray-300 cursor-pointer"
            >
              Oldest First
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={dateSort === "desc"}
              onCheckedChange={() => setDateSort(dateSort === "desc" ? null : "desc")}
              className="cursor-pointer"
            >
              Newest First
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2 bg-white cursor-pointer">
              Order Status
              {selectedStatuses.length > 0 && (
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedStatuses.length}
                </span>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-none bg-white">
            {allStatuses.map(status => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => toggleStatus(status)}
                className="cursor-pointer"
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Seller
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr 
                    key={order.id} 
                    className={`transition-colors hover:bg-gray-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <span className="text-sm font-semibold text-gray-900">{order.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{order.buyer}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        {order.seller}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{order.productIcon}</span>
                        <span className="text-sm font-medium text-gray-800">{order.product}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{order.date}</span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={order.statusVariant} className="font-medium border-none">
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-bold text-gray-900">{order.amount}</span>
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => handleViewOrder(order)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    No orders found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-600 font-medium">
            Showing {filteredOrders.length > 0 ? 1 : 0} to {Math.min(10, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-semibold shadow-sm">
              1
            </button>
            <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium">
              2
            </button>
            <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium">
              3
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
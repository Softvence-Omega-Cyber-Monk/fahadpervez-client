"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, SlidersHorizontal, ChevronDown, ChevronRight } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
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
    statusVariant: "destructive",
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
    statusVariant: "destructive",
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

export default function Orders() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Order</TabsTrigger>
          <TabsTrigger value="pending">Pending order</TabsTrigger>
          <TabsTrigger value="complete">Complete Order</TabsTrigger>
          <TabsTrigger value="cancel">Cancel Order</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by order id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <SlidersHorizontal className="w-4 h-4" />
          Order date
          <ChevronDown className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          Order Status
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Buyer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Seller</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Product</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                  <td className="py-3 px-4 text-sm">{order.buyer}</td>
                  <td className="py-3 px-4 text-sm text-primary">{order.seller}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{order.productIcon}</span>
                      <span className="text-sm">{order.product}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                  <td className="py-3 px-4">
                    <Badge variant={order.statusVariant}>{order.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold">{order.amount}</td>
                  <td className="py-3 px-4">
                    <Link to={`/orders/${order.id}`} className="text-primary text-sm font-medium hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-600">Showing 1 to 10 of 24 orders</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="px-3 py-1 text-sm bg-primary text-white rounded">1</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">2</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">3</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Mic, Download, ChevronRight } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const buyers = [
    {
        id: 1,
        name: "Cody Fisher",
        email: "john.doe@email.com",
        phone: "(209) 555-0104",
        totalBuy: 2161,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 2,
        name: "Jerome Bell",
        email: "sarah.wilson@email.com",
        phone: "(702) 555-0122",
        totalBuy: 1861,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 3,
        name: "Jacob Jones",
        email: "admin@store.com",
        phone: "(808) 555-0111",
        totalBuy: 681,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 4,
        name: "Albert Flores",
        email: "contact@company.com",
        phone: "(907) 555-0101",
        totalBuy: 1450,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 5,
        name: "Theresa Webb",
        email: "info@service.org",
        phone: "(307) 555-0133",
        totalBuy: 3200,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 6,
        name: "Devon Lane",
        email: "support@helpdesk.net",
        phone: "(405) 555-0128",
        totalBuy: 1980,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 7,
        name: "Courtney Henry",
        email: "marketing@business.com",
        phone: "(270) 555-0117",
        totalBuy: 750,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 8,
        name: "Ralph Edwards",
        email: "feedback@community.org",
        phone: "(671) 555-0110",
        totalBuy: 980,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 9,
        name: "Wade Warren",
        email: "sales@ecommerce.com",
        phone: "(302) 555-0107",
        totalBuy: 1120,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 10,
        name: "Arlene McCoy",
        email: "hello@website.com",
        phone: "(252) 555-0126",
        totalBuy: 4020,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
]

const sellers = [
    {
        id: 1,
        name: "Cody Fisher",
        email: "john.doe@email.com",
        products: 34,
        totalSell: 2161,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 2,
        name: "Jerome Bell",
        email: "sarah.wilson@email.com",
        products: 63,
        totalSell: 1861,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 3,
        name: "Jacob Jones",
        email: "admin@store.com",
        products: 74,
        totalSell: 681,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 4,
        name: "Albert Flores",
        email: "contact@company.com",
        products: 45,
        totalSell: 1450,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 5,
        name: "Theresa Webb",
        email: "info@service.org",
        products: 58,
        totalSell: 3200,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 6,
        name: "Devon Lane",
        email: "support@helpdesk.net",
        products: 90,
        totalSell: 1980,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 7,
        name: "Courtney Henry",
        email: "marketing@business.com",
        products: 32,
        totalSell: 750,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 8,
        name: "Ralph Edwards",
        email: "feedback@community.org",
        products: 71,
        totalSell: 980,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 9,
        name: "Wade Warren",
        email: "sales@ecommerce.com",
        products: 29,
        totalSell: 1120,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
    {
        id: 10,
        name: "Arlene McCoy",
        email: "hello@website.com",
        products: 83,
        totalSell: 4020,
        status: "Active",
        joinDate: "30/10/2021",
        avatar: "👤",
    },
]

export default function UsersTab() {
    const [activeTab, setActiveTab] = useState("buyers")
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="space-y-6">
            {/* Tabs & Export */}
            <div className="flex items-center justify-between">
                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-gray-100 rounded-full p-1 shadow-sm cursor-pointer">
                        <TabsTrigger
                            value="buyers"
                            className="px-5 py-2 rounded-full text-sm font-medium transition-all
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500
        data-[state=active]:text-white 
        data-[state=inactive]:text-gray-600 
        hover:data-[state=inactive]:bg-white/60 cursor-pointer"
                        >
                            Buyers
                        </TabsTrigger>
                        <TabsTrigger
                            value="sellers"
                            className="px-5 py-2 rounded-full text-sm font-medium transition-all
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-indigo-500
        data-[state=active]:text-white 
        data-[state=inactive]:text-gray-600 
        hover:data-[state=inactive]:bg-white/60 cursor-pointer"
                        >
                            Sellers
                        </TabsTrigger>
                    </TabsList>
                </Tabs>


                <Button className="gap-2 bg-blue-600 text-white shadow-md hover:bg-blue-700">
                    <Download className="w-4 h-4" />
                    Export
                </Button>
            </div>

            {/* Seller Requests */}
            {activeTab === "sellers" && (
                <Link
                    to="/admin/users/sellers/requests"
                    className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors shadow-sm"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-orange-600">05</span>
                        <span className="font-medium text-gray-900">New Seller Profile Requests</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-orange-600" />
                </Link>
            )}

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                    placeholder="Search users ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Mic className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full border-0">
                        <thead className="bg-gray-50">
                            <tr className="text-sm font-semibold text-gray-600">
                                <th className="text-left py-3 px-4">Name</th>
                                <th className="text-left py-3 px-4">Email</th>
                                <th className="text-left py-3 px-4">
                                    {activeTab === "buyers" ? "Phone" : "Products"}
                                </th>
                                <th className="text-left py-3 px-4">
                                    {activeTab === "buyers" ? "Total Buy" : "Total Sell"}
                                </th>
                                <th className="text-left py-3 px-4">Status</th>
                                <th className="text-left py-3 px-4">Join On</th>
                                <th className="py-3 px-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {(activeTab === "buyers" ? buyers : sellers).map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-xl">
                                                {user.avatar}
                                            </div>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        {activeTab === "buyers" ? ('phone' in user ? user.phone : '') : ('products' in user ? user.products : '')}
                                    </td>
                                    <td className="py-3 px-4 text-sm font-semibold">
                                        {activeTab === "buyers" ? ('totalBuy' in user ? user.totalBuy : '') : ('totalSell' in user ? user.totalSell : '')}
                                    </td>
                                    <td className="py-3 px-4">
                                        <Badge
                                            className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border-none shadow-none"
                                        >
                                            {user.status}
                                        </Badge>

                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{user.joinDate}</td>
                                    <td className="py-3 px-4">
                                        <Link to={`/users/buyer/${user.id}`}>
                                            <ChevronRight className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">Showing 1 to 10 of 24 orders</div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                            <ChevronRight className="w-4 h-4 rotate-180" />
                        </button>
                        <button className="px-3 py-1 text-sm bg-primary text-white rounded shadow-sm">1</button>
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

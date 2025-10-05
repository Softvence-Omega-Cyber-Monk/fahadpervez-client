import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Badge } from "@/components/ui/badge"

const salesData = [
  { day: "Sat", value: 28000 },
  { day: "Sun", value: 5000 },
  { day: "Mon", value: 10000 },
  { day: "Tue", value: 2000 },
  { day: "Wed", value: 20000 },
  { day: "Thu", value: 18000 },
  { day: "Fri", value: 12000 },
]

const categoryData = [
  { name: "Analgesics", value: 30, color: "#6366f1" },
  { name: "Antibiotics", value: 15, color: "#f43f5e" },
  { name: "Antipyretics", value: 10, color: "#f97316" },
  { name: "Antihistamines", value: 25, color: "#22c55e" },
  { name: "Antidepressants", value: 8, color: "#06b6d4" },
  { name: "Antidiabetic", value: 5, color: "#a855f7" },
  { name: "Antihypertensives", value: 4, color: "#ec4899" },
  { name: "Anticoagulants", value: 3, color: "#14b8a6" },
]

const orderStatusData = [
  { status: "Pending", value: 150 },
  { status: "Processing", value: 280 },
  { status: "Shipped", value: 220 },
  { status: "Delivered", value: 320 },
  { status: "Cancelled", value: 30 },
]

const recentActivity = [
  {
    type: "Order",
    description: "New order #ORD-2024-001",
    user: "john.doe@email.com",
    amount: "$299.99",
    status: "Pending",
    time: "2 min ago",
  },
  {
    type: "User",
    description: "New user registration",
    user: "sarah.wilson@email.com",
    amount: "-",
    status: "Active",
    time: "2 min ago",
  },
  {
    type: "Product",
    description: "Product updated: Antipyretics",
    user: "admin@store.com",
    amount: "-",
    status: "Updated",
    time: "2 min ago",
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6 ml-10 mr-10 mt-10">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-none rounded-2xl max-h-[160px]">
          <CardContent className="flex flex-col gap-3">
            <div className="text-sm text-gray-600 mb-1 text-[16px]">Total Sales</div>
            <div className="text-3xl font-bold mb-2 text-[32px]">$247,850</div>
            <div className="flex items-center text-[16px] text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              13.65%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none rounded-2xl max-h-[160px]">
          <CardContent className="flex flex-col gap-3">
            <div className="text-sm text-gray-600 mb-1">Total Orders</div>
            <div className="text-3xl font-bold mb-2">1,247</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              13.65%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none rounded-2xl">
          <CardContent className="flex flex-col gap-3">
            <div className="text-sm text-gray-600 mb-1">Active Users</div>
            <div className="text-3xl font-bold mb-2">8,942</div>
            <div className="flex items-center text-sm text-red-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              13.65%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none rounded-2xl">
          <CardContent className="flex flex-col gap-3">
            <div className="text-sm text-gray-600 mb-1">Total Products</div>
            <div className="text-3xl font-bold mb-2">2,156</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              13.65%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trends */}
        <Card className="lg:col-span-2 border-none bg-white">
          <CardHeader>
            <CardTitle className="text-[24px]">Sales Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="bg-white border-none">
          <CardHeader>
            <CardTitle className="text-[24px]">Alert & Notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3 p-3 bg-red-50 rounded-lg">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">!</span>
              </div>
              <div>
                <div className="font-semibold text-sm">Low Stock Alert</div>
                <div className="text-xs text-gray-600">5 products are running low on inventory</div>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">i</span>
              </div>
              <div>
                <div className="font-semibold text-sm">Pending Approval</div>
                <div className="text-xs text-gray-600">3 seller applications awaiting review</div>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">i</span>
              </div>
              <div>
                <div className="font-semibold text-sm">System Update</div>
                <div className="text-xs text-gray-600">Scheduled maintenance tonight at 2 AM</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="border-none bg-white">
          <CardHeader>
            <CardTitle className="text-[24px]">Medicine Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card className="border-none bg-white">
          <CardHeader>
            <CardTitle className="text-[24px]">Order Status Overview</CardTitle>
          </CardHeader>
          <CardContent className="mt-10">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderStatusData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" />
                <YAxis dataKey="status" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white border-none">
        <CardHeader>
          <CardTitle className="text-[24px]">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-left py-3 px-4 font-regular text-sm text-gray-800">Type</th>
                  <th className="text-left py-3 px-4 font-regular text-sm text-gray-800">Description</th>
                  <th className="text-left py-3 px-4 font-regular text-sm text-gray-800">User</th>
                  <th className="text-left py-3 px-4 font-regular text-sm text-gray-800">Amount</th>
                  <th className="text-left py-3 px-4 font-regular text-sm text-gray-800">Status</th>
                  <th className="text-left py-3 px-4 font-regular text-sm text-gray-800">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Badge
                      className="border-none"
                        variant={
                          activity.type === "Order" ? "warning" : activity.type === "User" ? "info" : "success"
                        }
                      >
                        {activity.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{activity.description}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{activity.user}</td>
                    <td className="py-3 px-4 text-sm font-semibold">{activity.amount}</td>
                    <td className="py-3 px-4">
                      <Badge
                      className="border-none"
                        variant={
                          activity.status === "Pending" ? "warning" : activity.status === "Active" ? "success" : "info"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

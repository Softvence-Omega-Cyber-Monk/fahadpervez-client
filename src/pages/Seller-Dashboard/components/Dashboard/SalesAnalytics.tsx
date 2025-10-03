"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const salesData = [
  { month: "Jan", sales: 69 },
  { month: "Feb", sales: 17 },
  { month: "Mar", sales: 32 },
  { month: "April", sales: 20 },
  { month: "May", sales: 41 },
  { month: "June", sales: 11 },
  { month: "July", sales: 57 },
  { month: "Aug", sales: 15 },
  { month: "Sep", sales: 57 },
  { month: "Oct", sales: 52 },
  { month: "Nov", sales: 93 },
  { month: "Dec", sales: 42 },
]

const metrics = [
  { value: "1,243", label: "Total Orders" },
  { value: "$89.50", label: "Avg Order Value" },
  { value: "3.2%", label: "Conversion Rate" },
  { value: "234", label: "New Customers" },
]

export default function SalesAnalytics() {
  return (
    <div className="bg-light-background rounded-lg border border-border p-6">
      {/* Header */}
      <h2 className="mb-6">Sales Analytics</h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-1 text-center">
            <p className="text-2xl font-bold text-dark-blue">{metric.value}</p>
            <p className="text-sm text-light-gray">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ChartContainer
        config={{
          sales: {
            label: "Sales",
            color: "#60B7FF",
          },
        }}
        className="h-[280px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EAEB" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#70797E", fontSize: 12 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#70797E", fontSize: 12 }}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="sales" fill="#60B7FF" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="sales" position="top" fill="#70797E" fontSize={11} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

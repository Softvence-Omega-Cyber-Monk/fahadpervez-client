import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"


const revenueData = [
  { day: "Mon", revenue: 3000 },
  { day: "Tue", revenue: 3500 },
  { day: "Wed", revenue: 3800 },
  { day: "Thu", revenue: 4200 },
  { day: "Fri", revenue: 4500 },
  { day: "Sat", revenue: 4800 },
  { day: "Sun", revenue: 2800 },
]

export default function RevenueOverview() {
  return (
    <div className="bg-light-background rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="">Revenue Overview</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8B7FD8]"></div>
            <span className="text-sm text-light-gray">Revenue</span>
          </div>
          <select className="text-sm text-light-gray border border-border rounded-md px-3 py-1.5 bg-light-background focus:outline-none focus:ring-2 focus:ring-primary-blue">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div

        className="h-[280px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B7FD8" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8B7FD8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EAEB" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#70797E", fontSize: 12 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#70797E", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
              ticks={[0, 1000, 2000, 3000, 4000, 5000]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8B7FD8"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              dot={{ fill: "#8B7FD8", r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

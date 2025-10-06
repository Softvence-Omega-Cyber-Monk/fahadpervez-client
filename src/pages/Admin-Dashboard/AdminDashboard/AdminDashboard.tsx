import React from 'react';
// Recharts imports for professional data visualization
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// Load Lucide React icons for a clean look
import { TrendingUp, ShoppingBag, Users, Package, AlertTriangle, Info, XCircle } from 'lucide-react';

// --- 1. TYPESCRIPT INTERFACES ---

interface Stat {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

interface AlertItem {
  type: 'danger' | 'warning' | 'info';
  title: string;
  description: string;
}

interface Activity {
  type: 'Order' | 'User' | 'Product';
  description: string;
  user: string;
  amount: string;
  status: 'Pending' | 'Active' | 'Updated';
  time: string;
}

// Data interfaces for Recharts
interface SalesTrend {
  name: string; // Day of the week
  sales: number; // Sales in thousands
}

interface Category {
  name: string;
  value: number; // Percentage value
  color: string;
  [key: string]: any; // Add index signature
}

// --- 2. MOCK DATA & CUSTOM ICONS ---

// Using Lucide-React icons for better integration and visual consistency

const statsData: Stat[] = [
  { title: "Total Sales", value: "$247,850", percentage: "13.65%", isPositive: true, icon: <TrendingUp className="w-6 h-6 text-blue-500" /> },
  { title: "Total Orders", value: "1,247", percentage: "13.65%", isPositive: true, icon: <ShoppingBag className="w-6 h-6 text-green-500" /> },
  { title: "Active Users", value: "8,942", percentage: "13.65%", isPositive: false, icon: <Users className="w-6 h-6 text-yellow-500" /> },
  { title: "Total Products", value: "2,156", percentage: "13.65%", isPositive: true, icon: <Package className="w-6 h-6 text-indigo-500" /> },
];

const alertsData: AlertItem[] = [
  { type: 'danger', title: 'Low Stock Alert', description: '5 products are running low on inventory. Requires immediate restock.' },
  { type: 'warning', title: 'Pending Approval', description: '3 seller applications awaiting review in the queue.' },
  { type: 'info', title: 'System Update', description: 'Scheduled maintenance tonight at 2 AM. Be prepared.' },
];

const activityData: Activity[] = [
  { type: 'Order', description: 'New order #ORD-2024-001', user: 'john.doe@email.com', amount: '$299.99', status: 'Pending', time: '2 min ago' },
  { type: 'User', description: 'New user registration', user: 'sarah.wilson@email.com', amount: '-', status: 'Active', time: '5 min ago' },
  { type: 'Product', description: 'Product updated: Antipyretics', user: 'admin@store.com', amount: '-', status: 'Updated', time: '12 min ago' },
  { type: 'Order', description: 'Order #ORD-2024-005 processed', user: 'mike.smith@email.com', amount: '$12.50', status: 'Active', time: '1 hour ago' },
];

const salesData: SalesTrend[] = [
  { name: 'Sat', sales: 10 },
  { name: 'Sun', sales: 8 },
  { name: 'Mon', sales: 12 },
  { name: 'Tue', sales: 7 },
  { name: 'Wed', sales: 15 },
  { name: 'Thu', sales: 11 },
  { name: 'Fri', sales: 19 },
];

// Defined custom colors for the Pie Chart based on Tailwind palette
const categoryData: Category[] = [
  { name: 'Analgesics', value: 25, color: '#ef4444' }, // Red-500
  { name: 'Antibiotics', value: 15, color: '#10b981' }, // Emerald-500
  { name: 'Antipyretics', value: 10, color: '#3b82f6' }, // Blue-500
  { name: 'Antihistamines', value: 18, color: '#f59e0b' }, // Amber-500
  { name: 'Antidepressants', value: 12, color: '#8b5cf6' }, // Violet-500
  { name: 'Antidiabetic', value: 20, color: '#f97316' }, // Orange-500
];

// --- 3. COMPONENTS ---

/**
 * Card for displaying key statistics.
 */
const StatCard: React.FC<Stat> = ({ title, value, percentage, isPositive, icon }) => {
  const color = isPositive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  const arrowIcon = isPositive ? (
    <TrendingUp className="w-4 h-4 mr-1" />
  ) : (
    <XCircle className="w-4 h-4 mr-1" />
  );

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg transition duration-300 hover:shadow-xl border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className="p-2 rounded-full bg-gray-100">{icon}</div>
      </div>
      <div className="text-3xl font-extrabold text-gray-900 mb-2">{value}</div>
      <div className="flex items-center">
        <div className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
          {arrowIcon}
          {percentage}
        </div>
        <span className="text-xs text-gray-400 ml-2">vs last month</span>
      </div>
    </div>
  );
};

/**
 * Sales Trends Line Chart using Recharts.
 */
const SalesTrendsChart: React.FC = () => {
  const formatYAxis = (tick: number) => `$${tick}k`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-80">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Trends (in 1000s)</h2>
      <div className="h-full -mt-4"> {/* Adjust margin for chart */}
        <ResponsiveContainer width="100%" height="95%">
          <LineChart
            data={salesData}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#e2e8f0' }} style={{ fontSize: '12px' }} />
            <YAxis
              tickFormatter={formatYAxis}
              domain={[0, 20]}
              tickCount={5}
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              formatter={(value) => [`$${value}k`, 'Sales']}
              labelFormatter={(label) => `Day: ${label}`}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px', padding: '8px' }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/**
 * Alert and Notification component.
 */
const AlertNotification: React.FC = () => {
  const getAlertClasses = (type: AlertItem['type']) => {
    switch (type) {
      case 'danger': return 'bg-red-50 text-red-700 border-red-500';
      case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-500';
      case 'info': default: return 'bg-blue-50 text-blue-700 border-blue-500';
    }
  };

  const getIcon = (type: AlertItem['type']) => {
    const color = type === 'danger' ? 'text-red-500' : type === 'warning' ? 'text-yellow-500' : 'text-blue-500';
    switch (type) {
      case 'danger': return <XCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${color}`} />;
      case 'warning': return <AlertTriangle className={`w-5 h-5 mr-3 flex-shrink-0 ${color}`} />;
      case 'info': default: return <Info className={`w-5 h-5 mr-3 flex-shrink-0 ${color}`} />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Alert & Notification</h2>
      <div className="space-y-4">
        {alertsData.map((alert, index) => (
          <div key={index} className={`flex items-start p-3 rounded-xl border-l-4 ${getAlertClasses(alert.type)}`}>
            {getIcon(alert.type)}
            <div>
              <div className="font-semibold text-sm">{alert.title}</div>
              <p className="text-xs mt-0.5 text-gray-600">{alert.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Medicine Category Distribution Pie Chart using Recharts.
 */
const CategoryDistributionChart: React.FC = () => {
  // Custom Vertical Legend Component
  const Legend: React.FC = () => (
    <div className="flex flex-col space-y-2 text-sm ml-4 mt-4 lg:mt-0">
      {categoryData.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <span className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: entry.color }}></span>
          <span className="text-gray-600">{entry.name}</span>
          <span className="font-medium text-gray-800 ml-2">({entry.value}%)</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Medicine Category Distribution</h2>
      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={5}
              labelLine={false}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px', padding: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="w-full lg:w-auto">
            <Legend />
        </div>
      </div>
    </div>
  );
};


/**
 * Order Status Overview Bar visualization.
 */
const OrderStatusOverview: React.FC = () => {
  const statusData = [
    { name: 'Pending', value: 180, color: 'bg-yellow-500' },
    { name: 'Processing', value: 250, color: 'bg-indigo-500' },
    { name: 'Shipped', value: 160, color: 'bg-blue-500' },
    { name: 'Delivered', value: 280, color: 'bg-green-500' },
    { name: 'Cancelled', value: 70, color: 'bg-gray-400' },
  ];
  const maxValue = 300; // Define max value for bar scaling

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-8">Order Status Overview</h2>
      <div className="space-y-6 flex-grow pt-2">
        {statusData.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-24 text-sm text-gray-600 font-medium shrink-0">{item.name}</div>
            <div className="flex-grow ml-4 relative">
              <div className="h-5 rounded-full overflow-hidden bg-gray-200">
                <div
                  className={`h-full ${item.color} transition-all duration-700 ease-out`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
              <span className="absolute right-0 text-sm font-bold text-gray-700 min-w-8 text-right">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Recent Activity Table.
 */
const RecentActivityTable: React.FC = () => {

  const getStatusClasses = (status: Activity['status']) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Updated': default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeClasses = (type: Activity['type']) => {
    switch (type) {
      case 'Order': return 'bg-green-100 text-green-800';
      case 'User': return 'bg-blue-100 text-blue-800';
      case 'Product': default: return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Type', 'Description', 'User', 'Amount', 'Status', 'Time'].map(header => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activityData.map((activity, index) => (
            <tr key={index} className="hover:bg-gray-50 transition duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeClasses(activity.type)}`}>
                  {activity.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {activity.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {activity.user}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                {activity.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(activity.status)}`}>
                  {activity.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {activity.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


// --- 4. MAIN DASHBOARD COMPONENT (Renamed to App) ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-['Inter']">
      <script src="https://cdn.tailwindcss.com"></script>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Pharmacy Admin Dashboard</h1>
        <p className="text-base text-gray-500 mt-1">Key metrics and recent activity for your inventory and sales.</p>
      </header>

      {/* Grid for Stats Cards: Responsive from 1 to 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid: Switches from 1 column stack (mobile/tablet) to 3-column layout (desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Trends Chart: Takes full width on small screens, 2/3 on large */}
        <div className="lg:col-span-2">
          <SalesTrendsChart />
        </div>
        {/* Alert & Notification: Takes full width on small screens, 1/3 on large */}
        <div className="lg:col-span-1 min-h-[320px]"> {/* Ensure minimum height for balanced look */}
          <AlertNotification />
        </div>
      </div>

      {/* Middle Content Grid (Charts): Switches from 1 column stack (mobile/tablet) to 2-column layout (desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Medicine Category Distribution */}
        <div className="h-auto md:h-[400px]">
          <CategoryDistributionChart />
        </div>
        {/* Order Status Overview */}
        <div className="h-auto md:h-[400px]">
          <OrderStatusOverview />
        </div>
      </div>

      {/* Recent Activity Table (Full Width) */}
      {/* Table handles responsiveness via overflow-x-auto */}
      <div className="mt-8">
        <RecentActivityTable />
      </div>
    </div>
  );
};

export default App;

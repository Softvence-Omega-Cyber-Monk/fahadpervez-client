import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 🚨 CRITICAL: Register all required elements for the chart to display
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// --- Chart Colors & Constants ---
// Updated to a richer purple (#7D68FC) for a perfect match to the image.
const LINE_COLOR = '#7D68FC'; 
const GRADIENT_ALPHA = 0.4;
const POINT_RADIUS = 6;
const TEXT_COLOR = '#6B7280';


// --- Mock Data ---
const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const chartData = {
  labels,
  datasets: [
    {
      label: 'Revenue',
      // Data points matched visually from the graph
      data: [2800, 3100, 3600, 3900, 3800, 3300, 1800], 
      
      // PIXEL PERFECT STYLING
      borderColor: LINE_COLOR, 
      tension: 0.3,
      fill: 'start', // Start fill from the x-axis
      
      pointRadius: POINT_RADIUS,
      pointBackgroundColor: '#FFFFFF', // White center
      pointBorderColor: LINE_COLOR, 
      pointBorderWidth: 2,
      
      // Custom Gradient for Fill Area
      backgroundColor: (context: any) => {
        const chart = context.chart;
        const {ctx, chartArea} = chart;
        if (!chartArea) return null;
        
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        // Start transparent at the bottom
        gradient.addColorStop(0, `${LINE_COLOR}00`); 
        // Fade to the primary fill color at the top
        // Note: The conversion to hex alpha works, but for simplicity, we can use an RGBA approximation for this color
        gradient.addColorStop(1, `rgba(125, 104, 252, ${GRADIENT_ALPHA})`); 
        return gradient;
      },
    },
  ],
};


// --- Chart Options for Pixel Match ---
const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: {
      display: true, // Show the 'Revenue' legend entry
      position: 'top',
      align: 'center',
      labels: {
        usePointStyle: true,
        color: TEXT_COLOR,
        font: {
            size: 14,
            weight: 500
        }
      }
    },
    title: { display: false },
    tooltip: { mode: 'index', intersect: false }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: TEXT_COLOR }
    },
    y: {
      beginAtZero: true,
      max: 5000, // Explicitly set max y-value to 5k
      min: 0,
      grid: {
        color: '#E5E7EB',
      },
      ticks: {
        callback: function(value: any) {
          // Format Y-axis labels to 0, 1k, 2k, etc.
          return value === 0 ? '0' : (value / 1000) + 'k'; 
        },
        color: TEXT_COLOR,
      },
    },
  },
};


const RevenueOverviewChart = () => {
  const [timeRange, setTimeRange] = React.useState('Last 7 Days'); 

  return (
    // PIXEL PERFECT CONTAINER STYLING: rounded-xl and shadow-md
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Revenue Overview</h2>
        
        {/* Time Range Selector */}
        <select 
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last Quarter</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Chart Container - height defined for visual accuracy */}
      <div className="h-80 w-full"> 
        <Line data={chartData} options={chartOptions} />
      </div>
      
    </div>
  );
};

export default RevenueOverviewChart;

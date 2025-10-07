import { useState } from "react";
import {
    ChevronRight,
    Printer,
    Check,
    Package,
    Truck,
    CheckCircle2,
    ArrowLeft,
    Calendar,
    Clock,
    Pen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock data - In real app, this comes from useLocation().state.order
const mockOrderData = {
    id: "ORD-2025-347",
    buyer: "Cody Fisher",
    seller: "Bessie Cooper",
    product: "Cimetidine",
    productIcon: "💊",
    date: "6/21/19",
    status: "Preparing for Shipment",
    statusVariant: "warning" as const,
    amount: "$114.00",
};

const orderStatuses = [
    {
        id: 1,
        label: "Order placed",
        icon: Check,
        color: "bg-purple-500",
    },
    {
        id: 2,
        label: "Preparing for Shipment",
        icon: Package,
        color: "bg-orange-500",
    },
    {
        id: 3,
        label: "Out of delivery",
        icon: Truck,
        color: "bg-cyan-500",
    },
    {
        id: 4,
        label: "Delivered",
        icon: CheckCircle2,
        color: "bg-green-500",
    },
];

const productDetails = [
    {
        id: 1,
        name: "Alphafilcon",
        sku: "SP-X2023-BLK",
        icon: "💊",
        quantity: 9,
        pricePerUnit: 8,
    },
    {
        id: 2,
        name: "Paracetamol",
        sku: "SP-X2022-BLK",
        icon: "💊",
        quantity: 6,
        pricePerUnit: 6,
    },
    {
        id: 3,
        name: "Omeprazole",
        sku: "SP-X2028-BLK",
        icon: "💊",
        quantity: 3,
        pricePerUnit: 2,
    },
];

export default function OrderDetails() {
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showShippingModal, setShowShippingModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(2);
    const [shippingAddress, setShippingAddress] = useState("3517 W. Gray St. Utica, Pennsylvania 57867");
    const [shippingMethod, setShippingMethod] = useState("dhl");
    const [phone, setPhone] = useState("(219) 555-0114");

    const orderData = mockOrderData; // Replace with: useLocation().state?.order    const subtotal = productDetails.reduce((sum, item) => sum + (item.quantity * item.pricePerUnit), 0);


    const subtotal = productDetails.reduce((sum, item) => sum + (item.quantity * item.pricePerUnit), 0);
    const delivery = 2;
    const total = subtotal + delivery;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm">
                    <button 
                        onClick={() => alert('Navigate back to orders')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Orders
                    </button>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 font-semibold">Order details</span>
                </div>

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600">
                                    Order ID: <span className="font-semibold text-gray-900">{orderData.id}</span>
                                </span>
                                <Badge variant={orderData.statusVariant} className="font-medium px-3 py-1">
                                    {orderData.status}
                                </Badge>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            className="gap-2 shadow-sm hover:shadow-md transition-shadow"
                            onClick={() => window.print()}
                        >
                            <Printer className="w-4 h-4" />
                            Print Order
                        </Button>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Buyer Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md border border-blue-100 p-5 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                {orderData.buyer[0]}
                            </div>
                            <div className="font-bold text-gray-900 text-lg">Buyer</div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex flex-col">
                                <span className="text-gray-600 text-xs font-medium">Name</span>
                                <span className="text-blue-700 font-semibold">{orderData.buyer}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-600 text-xs font-medium">Phone</span>
                                <span className="text-gray-800">(319) 555-0115</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-600 text-xs font-medium">Email</span>
                                <span className="text-gray-800">johnfa@gmail.com</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-600 text-xs font-medium">Location</span>
                                <span className="text-gray-800">6391 Elgin St. Celina, Delaware 10299</span>
                            </div>
                        </div>
                    </div>

                    {/* Seller Card */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-md border border-purple-100 p-5 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                {orderData.seller[0]}
                            </div>
                            <div className="font-bold text-gray-900 text-lg">Seller</div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex flex-col">
                                <span className="text-gray-600 text-xs font-medium">Name</span>
                                <span className="text-purple-700 font-semibold">{orderData.seller}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-600 text-xs font-medium">Phone</span>
                                <span className="text-gray-800">(256) 359-0153</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-600 text-xs font-medium">Email</span>
                                <span className="text-gray-800">informedi@gmail.com</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-600 text-xs font-medium">Location</span>
                                <span className="text-gray-800">6391 Elgin St. Celina, Delaware 10299</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Card */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-md border border-green-100 p-5 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                                    <Truck className="w-5 h-5 text-white" />
                                </div>
                                <div className="font-bold text-gray-900 text-lg">Shipping</div>
                            </div>
                            <button
                                onClick={() => setShowShippingModal(true)}
                                className="text-green-700 hover:text-green-800 p-2 hover:bg-green-100 rounded-lg transition-colors"
                            >
                                <Pen className="w-4 h-4 cursor-pointer" />
                            </button>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex flex-col">
                                <span className="text-gray-600 text-xs font-medium">Payment</span>
                                <span className="text-gray-800">Visa card **** 0115</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-600 text-xs font-medium">Carrier</span>
                                <span className="text-gray-800 font-semibold">DHL Express</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-600 text-xs font-medium">Shipping Location</span>
                                <span className="text-gray-800">6391 Elgin St. Celina, Delaware 10299</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Date Card */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-md border border-orange-100 p-5 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <div className="font-bold text-gray-900 text-lg">Order Date</div>
                        </div>
                        <div className="space-y-3 mt-7">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-orange-600" />
                                <div className="flex flex-col">
                                    <span className="text-gray-600 text-xs font-medium">Time</span>
                                    <span className="text-gray-800 font-semibold">14:55 pm</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-orange-600" />
                                <div className="flex flex-col">
                                    <span className="text-gray-600 text-xs font-medium">Date</span>
                                    <span className="text-gray-800 font-semibold">{orderData.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Summary */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Product Summary</h2>
                            <button className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                                Cancel order
                                <span className="text-xl">×</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 border-b-2 border-gray-200">
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Product</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Quantity</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Price per unit</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Sub total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {productDetails.map((product, index) => (
                                    <tr key={product.id} className={`transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                                        <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                                            {String(product.id).padStart(2, '0')}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{product.icon}</span>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                                                    <div className="text-xs text-gray-500 font-medium">SKU: {product.sku}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-700">{product.quantity}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-700">${product.pricePerUnit}</td>
                                        <td className="py-4 px-6 text-sm font-bold text-gray-900">
                                            ${product.quantity * product.pricePerUnit}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-end">
                            <div className="w-80 space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Subtotal:</span>
                                    <span className="text-sm font-bold text-gray-900">${subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Delivery:</span>
                                    <span className="text-sm font-bold text-gray-900">${delivery}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 bg-blue-50 px-4 rounded-lg">
                                    <span className="text-base font-bold text-gray-900">Total:</span>
                                    <span className="text-lg font-bold text-blue-600">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm font-medium text-gray-600">Payment status:</span>
                                    <Badge variant="success" className="font-semibold">Paid ✓</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Status Tracker */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-gray-900">Order Status</h2>
                            <Badge 
                                variant={orderStatuses[currentStatus - 1]?.label === "Delivered" ? "success" : orderStatuses[currentStatus - 1]?.label === "Order placed" ? "secondary" : "warning"} 
                                className="font-semibold px-4 py-1.5 text-sm"
                            >
                                {orderStatuses[currentStatus - 1]?.label}
                            </Badge>
                        </div>
                        <Button 
                            onClick={() => setShowStatusModal(true)}
                            className="shadow-md hover:shadow-lg transition-shadow"
                        >
                            Update order status
                        </Button>
                    </div>

                    <div className="relative py-8 px-8">
                        {/* Progress Line Container */}
                        <div className="absolute top-14 left-20 right-20 px-16">
                            <div className="relative h-1 bg-gray-200">
                                <div 
                                    className="absolute h-full bg-gradient-to-r from-purple-500 via-orange-500 to-cyan-500 transition-all duration-500 left-0"
                                    style={{ width: `${((currentStatus - 1) / (orderStatuses.length - 1)) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 relative">
                            {orderStatuses.map((status, index) => {
                                const isCompleted = index < currentStatus;
                                const isCurrent = index === currentStatus - 1;
                                
                                return (
                                    <div key={status.id} className="flex flex-col items-center">
                                        <div
                                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                                                isCompleted 
                                                    ? `${status.color} shadow-lg scale-110` 
                                                    : isCurrent
                                                    ? `${status.color} shadow-lg animate-pulse`
                                                    : "bg-gray-300"
                                            } text-white relative z-10`}
                                        >
                                            <status.icon className="w-7 h-7" />
                                        </div>
                                        <div className={`text-sm font-bold text-center mb-2 ${
                                            isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                                        }`}>
                                            {status.label}
                                        </div>
                                        <div className="text-xs text-gray-500 text-center">
                                            {index === 0
                                                ? "17 June, 2025 3:50 pm"
                                                : index === 1
                                                ? isCompleted ? "17 June, 2025 9:00 pm" : "Estimate 18 June"
                                                : `Estimate ${21 + index} June, 2025`}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Update Status Modal */}
                <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
                    <DialogContent className="max-w-md bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Update Order Status</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 mt-6">
                            {orderStatuses.map((status, index) => (
                                <label 
                                    key={status.id} 
                                    className="flex items-center gap-4 cursor-pointer group"
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        checked={index + 1 === currentStatus}
                                        onChange={() => setCurrentStatus(index + 1)}
                                        className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className={`flex-1 flex items-center gap-4 p-4 rounded-xl transition-all ${
                                        index + 1 === currentStatus 
                                            ? 'bg-blue-50 border-2 border-blue-500 shadow-md' 
                                            : 'bg-gray-50 border-2 border-transparent group-hover:bg-gray-100'
                                    }`}>
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center ${status.color} text-white shadow-md`}
                                        >
                                            <status.icon className="w-6 h-6" />
                                        </div>
                                        <span className="font-semibold text-gray-900">{status.label}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <Button 
                            className="w-full mt-6 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow" 
                            onClick={() => setShowStatusModal(false)}
                        >
                            Update Status
                        </Button>
                    </DialogContent>
                </Dialog>

                {/* Edit Shipping Modal */}
                <Dialog open={showShippingModal} onOpenChange={setShowShippingModal}>
                    <DialogContent className="max-w-lg bg-gray-50 border-none">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Edit Shipping Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-5 mt-6">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Shipping Address
                                </label>
                                <Input 
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    className="h-12 text-base border-none bg-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Shipping Method
                                    </label>
                                    <select 
                                        value={shippingMethod}
                                        onChange={(e) => setShippingMethod(e.target.value)}
                                        className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-white"
                                    >
                                        <option value="dhl">DHL Express</option>
                                        <option value="fedex">FedEx</option>
                                        <option value="ups">UPS</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Phone
                                    </label>
                                    <Input 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="h-12 text-base border-none bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                        <Button 
                            className="w-full mt-6 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow bg-white cursor-pointer" 
                            onClick={() => setShowShippingModal(false)}
                        >
                            Save Changes
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
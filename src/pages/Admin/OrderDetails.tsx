import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ChevronRight,
    Printer,
    Check,
    Package,
    Truck,
    CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const orderStatuses = [
    {
        id: 1,
        label: "Order placed",
        icon: Check,
        color: "bg-purple-500",
        completed: true,
    },
    {
        id: 2,
        label: "Preparing for Shipment",
        icon: Package,
        color: "bg-orange-500",
        completed: false,
    },
    {
        id: 3,
        label: "Out of delivery",
        icon: Truck,
        color: "bg-cyan-500",
        completed: false,
    },
    {
        id: 4,
        label: "Delivered",
        icon: CheckCircle2,
        color: "bg-green-500",
        completed: false,
    },
];

export default function OrderDetails() {
    const { id } = useParams();
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showShippingModal, setShowShippingModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(2);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Link to="/orders" className="hover:text-gray-900">
                    Order
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Order details</span>
            </div>

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                <div className="text-sm text-gray-600">
                    Order ID: {id || "ORD-2025-347"}
                </div>
            </div>

            {/* Buyer, Seller, Shipping, Order Date */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-blue-50">
                    <CardContent className="p-4">
                        <div className="font-semibold text-gray-900 mb-3">Buyer</div>
                        <div className="space-y-1 text-sm">
                            <div>
                                <span className="text-gray-600">Name:</span>{" "}
                                <span className="text-primary">John Fagurson</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Phone:</span> (319) 555-0115
                            </div>
                            <div>
                                <span className="text-gray-600">Email:</span> johnfa@gmail.com
                            </div>
                            <div>
                                <span className="text-gray-600">Location:</span> 6391 Elgin St. Celina, Delaware 10299
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50">
                    <CardContent className="p-4">
                        <div className="font-semibold text-gray-900 mb-3">Seller</div>
                        <div className="space-y-1 text-sm">
                            <div>
                                <span className="text-gray-600">Name:</span>{" "}
                                <span className="text-primary">Hopi Daniyel</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Phone:</span> (256) 359-0153
                            </div>
                            <div>
                                <span className="text-gray-600">Email:</span> informedi@gmail.com
                            </div>
                            <div>
                                <span className="text-gray-600">Location:</span> 6391 Elgin St. Celina, Delaware 10299
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="font-semibold text-gray-900">Shipping details</div>
                            <button
                                onClick={() => setShowShippingModal(true)}
                                className="text-primary hover:text-primary/80"
                            >
                                <Printer className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div>
                                <span className="text-gray-600">Payment:</span> Visa card **** 0115
                            </div>
                            <div>
                                <span className="text-gray-600">Carrier:</span> DHL Express
                            </div>
                            <div>
                                <span className="text-gray-600">Shipping Location:</span> 6391 Elgin St. Celina, Delaware 10299
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50">
                    <CardContent className="p-4">
                        <div className="font-semibold text-gray-900 mb-3">Order date</div>
                        <div className="space-y-1 text-sm">
                            <div>
                                <span className="text-gray-600">Time:</span> 14:55 pm
                            </div>
                            <div>
                                <span className="text-gray-600">Date:</span> Wed, Sep 12, 2025
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Product Summary */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Product summary</h2>
                        <button className="text-red-600 text-sm font-medium flex items-center gap-2">
                            Cancel order
                            <span className="text-lg">×</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">#</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Product</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Quantity</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Price per unit</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Sub total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-3 px-4 text-sm">01</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">💊</span>
                                            <div>
                                                <div className="text-sm font-medium">Alphafilcon</div>
                                                <div className="text-xs text-gray-500">SKU : SP-X2023-BLK</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm">9</td>
                                    <td className="py-3 px-4 text-sm">$8</td>
                                    <td className="py-3 px-4 text-sm font-semibold">$72</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 text-sm">02</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">💊</span>
                                            <div>
                                                <div className="text-sm font-medium">Paracetamol</div>
                                                <div className="text-xs text-gray-500">SKU : SP-X2022-BLK</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm">6</td>
                                    <td className="py-3 px-4 text-sm">$6</td>
                                    <td className="py-3 px-4 text-sm font-semibold">$36</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 text-sm">03</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">💊</span>
                                            <div>
                                                <div className="text-sm font-medium">Omeprazole</div>
                                                <div className="text-xs text-gray-500">SKU : SP-X2028-BLK</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm">3</td>
                                    <td className="py-3 px-4 text-sm">$2</td>
                                    <td className="py-3 px-4 text-sm font-semibold">$6</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <div className="w-64 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Delivery:</span>
                                <span className="font-semibold">$2</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-semibold">$96.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Payment status:</span>
                                <Badge variant="default">Paid*</Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Order Status Tracker */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold text-gray-900">Order</h2>
                            <Badge variant="destructive">Preparing for Shipment</Badge>
                        </div>
                        <Button onClick={() => setShowStatusModal(true)}>Update order status</Button>
                    </div>

                    <div className="relative">
                        <div className="flex items-center justify-between">
                            {orderStatuses.map((status, index) => (
                                <div key={status.id} className="flex flex-col items-center flex-1">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center ${index < currentStatus ? status.color : "bg-gray-300"
                                            } text-white mb-3`}
                                    >
                                        <status.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-sm font-medium text-gray-900 text-center mb-1">
                                        {status.label}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {index === 0
                                            ? "17 June, 2025 3:50 pm"
                                            : index === 1
                                                ? "17 June, 2025 9:00 pm"
                                                : `Estimate ${21 + index} June, ${index === 3 ? "2025" : "2025"}`}
                                    </div>
                                    {index < orderStatuses.length - 1 && (
                                        <div
                                            className={`absolute top-6 h-0.5 ${index < currentStatus - 1 ? "bg-gray-400" : "bg-gray-300"
                                                }`}
                                            style={{ left: `${(index + 0.5) * 25}%`, width: "25%" }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Update Status Modal */}
            <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update order status</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        {orderStatuses.map((status, index) => (
                            <div key={status.id} className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    name="status"
                                    checked={index + 1 === currentStatus}
                                    onChange={() => setCurrentStatus(index + 1)}
                                    className="w-5 h-5"
                                />
                                <div className="flex-1 flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${status.color} text-white`}
                                    >
                                        <status.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-primary">{status.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="w-full mt-6" onClick={() => setShowStatusModal(false)}>
                        Update
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Edit Shipping Modal */}
            <Dialog open={showShippingModal} onOpenChange={setShowShippingModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Shipping details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Edit Shipping Address
                            </label>
                            <Input defaultValue="3517 W. Gray St. Utica, Pennsylvania 57867" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Shipping method
                                </label>
                                <Select defaultValue="dhl">
                                    <option value="dhl">DHL Express</option>
                                    <option value="fedex">FedEx</option>
                                    <option value="ups">UPS</option>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Phone</label>
                                <Input defaultValue="(219) 555-0114" />
                            </div>
                        </div>
                    </div>
                    <Button className="w-full mt-6" onClick={() => setShowShippingModal(false)}>
                        Update
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

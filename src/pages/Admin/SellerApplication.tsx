"use client"

import { useParams, Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SellerApplication() {
    const { id } = useParams()
    console.log(id)
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Link to="/users" className="hover:text-gray-900">
                    Users
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link to="/users" className="hover:text-gray-900">
                    Sellers
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link to="/users/sellers/requests" className="hover:text-gray-900">
                    New Seller Profile Requests
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Seller Application</span>
            </div>

            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Seller Application Review</h1>
                <p className="text-sm text-gray-600">Review and manage new seller registration profiles.</p>
            </div>

            <Card className="bg-gray-200 border-none">
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Full Name</div>
                            <div className="font-medium">Wade Warren</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Email</div>
                            <div className="font-medium">john.doe@example.com</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Phone Number</div>
                            <div className="font-medium">+1 555-123-4567</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gray-200 border-none">
                <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Business Name</div>
                            <div className="font-medium">Doe's Goods & Co.</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Business Type</div>
                            <div className="font-medium">Retail</div>
                        </div>
                        <div className="md:col-span-2">
                            <div className="text-sm text-gray-600 mb-1">Business Description</div>
                            <div className="font-medium">
                                We sell high-quality, handcrafted goods and accessories. Our products are ethically sourced and designed
                                for long-lasting use.
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Business CR Number</div>
                            <div className="font-medium">123456789</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">CR Documents</div>
                            <Link to="#" className="text-primary font-medium hover:underline">
                                View Document
                            </Link>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Country</div>
                            <div className="font-medium">Country</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gray-200 border-none">
                <CardHeader>
                    <CardTitle>Product & Shipping</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Product Categories</div>
                            <div className="font-medium">Analgesics, Cardiovascular Medications</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Shipping Locations</div>
                            <div className="font-medium">Local within city state, National within country, International</div>
                        </div>
                        <div className="md:col-span-2">
                            <div className="text-sm text-gray-600 mb-1">Store Description</div>
                            <div className="font-medium">
                                Our store specializes in organic and sustainable health products, ensuring our customers receive the
                                best quality. We prioritize eco-friendly packaging and fast, reliable shipping worldwide.
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gray-200 border-none">
                <CardHeader>
                    <CardTitle>Payment Setup</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Payment Method</div>
                            <div className="font-medium">Bank Account</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Bank Account Details</div>
                            <div className="font-medium">
                                Name: John Doe
                                <br />
                                Account Number: **** **** **** 1234
                                <br />
                                Routing Number: 987654321
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gray-200 border-none">
                <CardHeader>
                    <CardTitle>Contract Info</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Terms Accepted</div>
                            <div className="font-medium">Yes, the seller has accepted all terms and conditions.</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Signature</div>
                            <Link to="#" className="text-primary font-medium hover:underline">
                                View Signature
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button variant="destructive" size="lg">
                    Reject
                </Button>
                <Button variant="default" size="lg">
                    Approve
                </Button>
            </div>
        </div>
    )
}

import { useParams, Link, useLocation, useNavigate } from "react-router-dom"
import { ChevronRight, MapPin, Mail, Phone, MapPinned, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function BuyerDetails() {
  const { id } = useParams()
  console.log(id)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link to="/admin/users" className="hover:text-gray-900">
          User
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span>Buyer</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Buyer details</span>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-4xl">
              {buyer.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{buyer.name}</h1>
              <p className="text-sm text-gray-600">Join date: {buyer.joinDate}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                {buyer.status}
              </span>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <MapPin className="w-5 h-5" />
            {buyer.address || "Sunnyvale, California, USA"}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-none h-32">
            <CardContent className="mt-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Email</div>
                  <div className="text-sm text-gray-600">{buyer.email}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none h-32">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Phone</div>
                  <div className="text-sm text-gray-600">{buyer.phone}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none h-32">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <MapPinned className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Address</div>
                  <div className="text-sm text-gray-600">
                    {buyer.address || "Address not provided"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-none h-32">
          <CardContent>
            <h3 className="font-semibold text-gray-900 mb-1">Total Purchases</h3>
            <p className="text-2xl font-bold text-blue-600">${buyer.totalBuy.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">Total amount spent</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none h-32">
          <CardContent>
            <h3 className="font-semibold text-gray-900 mb-1">User ID</h3>
            <p className="text-2xl font-bold text-gray-900">#{buyer.id}</p>
            <p className="text-sm text-gray-600 mt-1">Unique identifier</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none h-32">
          <CardContent>
            <h3 className="font-semibold text-gray-900 mb-1">Account Status</h3>
            <p className="text-2xl font-bold text-green-600">{buyer.status}</p>
            <p className="text-sm text-gray-600 mt-1">Current account status</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info Section */}
      <Card className="bg-white border-none">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Account Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-semibold text-gray-900">{buyer.joinDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{buyer.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold text-gray-900">{buyer.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {buyer.status}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
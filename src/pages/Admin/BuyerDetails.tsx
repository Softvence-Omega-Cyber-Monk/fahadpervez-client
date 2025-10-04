"use client"

import { useParams, Link } from "react-router-dom"
import { ChevronRight, MapPin, Mail, Phone, MapPinned } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function BuyerDetails() {
  const { id } = useParams()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link to="/users" className="hover:text-gray-900">
          User
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span>Buyer</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Buyer details</span>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img src="/placeholder.svg?height=80&width=80" alt="Jane Cooper" className="w-20 h-20 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Jane Cooper</h1>
              <p className="text-sm text-gray-600">Join date: May, 2019</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span className="text-sm">Sunnyvale, California, USA</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Email</div>
                  <div className="text-sm text-gray-600">pangeti@gmail.com</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Phone</div>
                  <div className="text-sm text-gray-600">+00 123 456 789</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <MapPinned className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Address</div>
                  <div className="text-sm text-gray-600">Sunnyvale, California, USA</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Order Complete</h3>
            <p className="text-sm text-gray-600">122 order complete total</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Cancel Order</h3>
            <p className="text-sm text-gray-600">25 order cancel</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Buy Amount</h3>
            <p className="text-sm text-gray-600">$6,000 USD total buy.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

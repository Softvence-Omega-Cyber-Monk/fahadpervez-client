import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const requests = [
  { id: 1, name: "Wade Warren", business: "The Cozy Corner", date: "30/10/2021", status: "Pending" },
  { id: 2, name: "Savannah Nguyen", business: "Lee's Tech Store", date: "30/10/2021", status: "Pending" },
  { id: 3, name: "Marvin McKinney", business: "Smith's Essentials", date: "30/10/2021", status: "Pending" },
  { id: 4, name: "Brooklyn Simmons", business: "Doe's Goods & Co.", date: "30/10/2021", status: "Pending" },
  { id: 5, name: "Albert Flores", business: "Lee's Tech Store", date: "30/10/2021", status: "Pending" },
]

export default function SellerRequests() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link to="/users" className="hover:text-gray-900">Users</Link>
        <ChevronRight className="w-4 h-4" />
        <span>Sellers</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">New Seller Profile Requests</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-0">
            <thead className="bg-gray-50">
              <tr className="text-sm font-semibold text-gray-600">
                <th className="text-left py-3 px-4">Applicant Name</th>
                <th className="text-left py-3 px-4">Business Name</th>
                <th className="text-left py-3 px-4">Submission Date</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{request.name}</td>
                  <td className="py-3 px-4 text-sm">{request.business}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{request.date}</td>
                  <td className="py-3 px-4">
                    <Badge className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border-none shadow-none">
                      {request.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/admin/users/sellers/requests/${request.id}`}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      Review Application
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

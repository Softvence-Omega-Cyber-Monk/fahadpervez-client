import { ChevronLeft, ChevronRight, Search, User } from "lucide-react"

const SellersTable = ({ data }: any) => {



    return (
        <>
            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Desktop Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Phone
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Total Buy
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Join On
                                </th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {/* Table Row */}
                            {
                                data?.map((item : any) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src="/user-placeholder-profile.jpg"
                                                    alt="John Doe"
                                                    className="w-10 h-10 rounded-full bg-gray-200"
                                                />
                                                <span className="font-medium text-gray-900">{item?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item?.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">+1 (555) 123-4567</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">$1,200</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                                                {
                                                    item?.isActive ? "Active" : "InActive"
                                                }
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(item?.createdAt).toDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-600">Showing 1 to 10 of 24 orders</p>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                            1
                        </button>
                        <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            2
                        </button>
                        <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            3
                        </button>
                        <button className="px-3 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellersTable
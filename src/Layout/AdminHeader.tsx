import { Bell, ShoppingCart } from "lucide-react"

export default function Header() {
    return (
        <header className="h-20 items-center bg-white border-b border-gray-200 px-6">
            <div className="flex justify-between items-center mt-5 gap-4">
                <div className="flex items-center gap-3 ml-4">
                    <img src="/admin.png" alt="Marvin McKinney" className="w-10 h-10 rounded-full" />
                    <div>
                        <div className="text-sm font-semibold text-gray-900 text-[18px]">Marvin McKinney</div>
                        <div className="text-xs text-gray-500 text-[14px]">Admin</div>
                    </div>
                </div>
                <div>
                    <button className="relative p-2 text-gray-600 hover:text-gray-900">
                        <Bell className="w-6 h-6" />
                    </button>

                    <button className="relative p-2 text-gray-600 hover:text-gray-900">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                            3
                        </span>
                    </button>
                </div>
            </div>
        </header>
    )
}

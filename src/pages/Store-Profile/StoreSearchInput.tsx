import { Image, Mic, Search } from "lucide-react"

const StoreSearchInput = () => {
    return (
        <div className="w-full flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="relative flex items-center bg-white rounded-full shadow-sm border border-gray-200 px-4 py-3 hover:shadow-md transition-shadow">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search ..."
                        className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                    />

                    {/* Icons Container */}
                    <div className="flex items-center gap-3 ml-2">
                        {/* Search Icon */}
                        <button className="text-gray-500 hover:text-gray-700 transition-colors">
                            <Search size={20} />
                        </button>

                        {/* Mic Icon */}
                        <button className="text-gray-500 hover:text-gray-700 transition-colors">
                            <Mic size={20} />
                        </button>

                        {/* Image Icon */}
                        <button className="text-gray-500 hover:text-gray-700 transition-colors">
                            <Image size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreSearchInput
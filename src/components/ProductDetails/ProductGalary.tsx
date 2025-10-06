import { useState } from "react"
import { Heart, Share2, ShoppingCart, MessageSquare, Minus, Plus } from "lucide-react";

interface ProductData {
    id: string;
    name: string;
    sku: string;
    price: number;
    sale: number; // percentage
    seller: string;
    revenue: number;
    stock: number;
    maxStock: number; 
    image: string; // Placeholder for product icon/image
  }

const ProductGalary = ({ product }: { product: ProductData }) => {

    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(0)

    const images = [
        product.image,
        product.image,
        product.image,
        product.image,
    ]

    const productInfo = [
        "100% authentic",
        "Best by: 03/2027",
        "First available: 11/2016",
        `Shipping weight: ${product.revenue} kg`,
        `Product code: ${product.sku}`,
        "UPC: 364586766785",
        `Package quantity: ${product.stock} Count`,
        "Dimensions: 9.7 x 5.1 x 5 cm , 0.07 kg",
    ]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Section - Images */}
            <div className="lg:col-span-5">
                <div className="flex flex-col-reverse sm:flex-row gap-4">
                    {/* Thumbnails */}
                    <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
                        {images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? "border-blue-500" : "border-transparent"}`}>
                                <img
                                    src={img || "/placeholder.svg"}
                                    alt={`Product thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {index === 3 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-gray-800 border-b-8 border-b-transparent ml-1"></div>
                                        </div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 bg-gray-100 rounded-lg p-6 sm:p-8 relative">
                        <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                            <Heart className="h-5 w-5 text-gray-600" />
                        </button>
                        <button className="absolute top-16 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                            <Share2 className="h-5 w-5 text-gray-600" />
                        </button>
                        <img
                            src={images[selectedImage] || "/placeholder.svg"}
                            alt="Main product image"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Middle Section - Product Info */}
            <div className="lg:col-span-4">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">{product.name}</h1>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-sm sm:text-base">By:</span>
                        <a href="#" className="text-blue-600 font-medium text-sm sm:text-base hover:underline">
                            {product.seller}
                        </a>
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">
                        Sold: <span className="font-medium">335</span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4].map((star) => (
                            <svg key={star} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                        <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                            <defs>
                                <linearGradient id="half">
                                    <stop offset="50%" stopColor="#FACC15" />
                                    <stop offset="50%" stopColor="#E5E7EB" />
                                </linearGradient>
                            </defs>
                            <path
                                fill="url(#half)"
                                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                            />
                        </svg>
                    </div>
                    <div className="flex items-center gap-2 text-sm sm:text-base">
                        <span className="font-medium text-gray-900">4.5/5</span>
                        <span className="text-gray-500">(7457)</span>
                    </div>
                </div>

                <div className="inline-block mb-6">
                    <span className="px-3 py-1 bg-white border-2 border-blue-500 text-blue-600 rounded-md text-sm font-medium">
                        In Stock - {product.stock} left
                    </span>
                </div>

                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                    {productInfo.map((info, index) => (
                        <li key={index} className="flex items-start">
                            <span className="mr-2">.</span>
                            <span>{info}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Section - Price & Actions */}
            <div className="lg:col-span-3">
                <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
                    <div className="">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl sm:text-4xl font-bold text-gray-900">${product.price}</span>
                            <span className="text-xl sm:text-2xl text-gray-400 line-through">${product.price + 5}</span>
                        </div>

                        <div className="flex items-center justify-center gap-4 mb-4">
                            <button
                                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <Minus className="h-5 w-5 text-gray-600" />
                            </button>
                            <span className="text-2xl font-semibold text-gray-900 w-12 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <Plus className="h-5 w-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 mb-3 transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                        Add To Cart
                    </button>
                </div>
                <button className="w-full bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-blue-600 flex items-center justify-center gap-2 transition-colors mt-[50px]">
                    <MessageSquare className="h-5 w-5" />
                    Send Inquiry
                </button>
            </div>
        </div>
    )
}

export default ProductGalary
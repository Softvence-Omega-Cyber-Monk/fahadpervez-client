interface Product {
  name: string
  description: string
  price: number
  image: string
}

const products: Product[] = [
  {
    name: "Amoxicillin (Antibiotic)",
    description: "142 sold this month",
    price: 78,
    image: "https://images.unsplash.com/photo-1588776814546-8cfa8f6b3bfa?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Ibuprofen (Pain Reliever)",
    description: "230 sold this month",
    price: 65,
    image: "https://images.unsplash.com/photo-1588774069624-5d9b2de2ac4b?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Metformin (Diabetes Management)",
    description: "180 sold this month",
    price: 30,
    image: "https://images.unsplash.com/photo-1586784275941-7a6a6a6e3a20?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Lisinopril (Blood Pressure)",
    description: "120 sold this month",
    price: 50,
    image: "https://images.unsplash.com/photo-1584362917165-1ec7d8b0f7b7?auto=format&fit=crop&w=400&q=80",
  },
];

<<<<<<< HEAD



export default function TopProducts() {
  return (
    <div className="bg-light-background rounded-xl p-6 shadow-sm border border-border">
=======
export default function TopProducts() {
  return (
    <div className="bg-light-background rounded-xl p-6 border border-border">
>>>>>>> 04e8881909da2c316796f778f38163540d21c380
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="">Top Products</h2>
        <a href="#" className="p1 text-primary-blue hover:underline">
          View All
        </a>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between gap-4 py-2">
            {/* Left: Image + Product Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative size-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="p1">{product.name}</p>
                <p className="p2">{product.description}</p>
              </div>
            </div>

            {/* Right: Price */}
            <p className="text-primary-green flex-shrink-0">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

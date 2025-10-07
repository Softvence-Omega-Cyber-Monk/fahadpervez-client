import ProductSlider from "./AddToCartSlider";

const CartFrequently = () => {

    const sampleProducts = [
        {
            id: 1,
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ndnISDznDisqHxiTxEanTtooZFiOzD.png',
            title: 'Harmony biotic digestive tablets',
            currentPrice: 7.99,
            originalPrice: 12.99
        },
        {
            id: 2,
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ndnISDznDisqHxiTxEanTtooZFiOzD.png',
            title: 'Eco-friendly reusable water bottle',
            currentPrice: 15.49,
            originalPrice: 19.99
        },
        {
            id: 3,
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ndnISDznDisqHxiTxEanTtooZFiOzD.png',
            title: 'Organic herbal tea blend',
            currentPrice: 9.99,
            originalPrice: 14.99
        },
        {
            id: 4,
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ndnISDznDisqHxiTxEanTtooZFiOzD.png',
            title: 'Natural vitamin supplements',
            currentPrice: 12.99,
            originalPrice: 17.99
        },
        {
            id: 5,
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ndnISDznDisqHxiTxEanTtooZFiOzD.png',
            title: 'Probiotic wellness capsules',
            currentPrice: 18.99,
            originalPrice: 24.99
        }
    ];

    return (
        <div className="py-[50px]">
                <ProductSlider products={sampleProducts} />
        </div>
    )
}

export default CartFrequently
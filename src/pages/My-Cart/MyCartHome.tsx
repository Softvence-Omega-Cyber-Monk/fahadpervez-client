
import CartFrequently from "./CartFrequently"
import MyCart from "./MyCart"

const MyCartHome = () => {
    return (
        <div className="min-h-screen bg-[#F1F5F8] ">
            <div className="max-w-[1120px] mx-auto py-[30px] px-4 sm:px-6 lg:px-8">
                <MyCart />
                <CartFrequently/>
            </div>
        </div>
    )
}

export default MyCartHome
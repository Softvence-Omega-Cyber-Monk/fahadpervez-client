import StoreProfile from "./StoreProfile"
import CompanyOverview from "./StoreProfileInformation"
import StoreProfileTab from "./StoreProfileTab"

const StoreHome = () => {
    return (
        <div className="bg-[#F1F5F8]">
            <div className="min-h-screen max-w-[1120px] mx-auto py-[40px]">
                <StoreProfile />
                <CompanyOverview />
                <StoreProfileTab/>
            </div>
        </div>
    )
}

export default StoreHome
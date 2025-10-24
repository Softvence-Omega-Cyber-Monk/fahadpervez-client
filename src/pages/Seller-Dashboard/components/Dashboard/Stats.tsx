import StatsCard from "@/common/StatsCard"
import StatsData from "@/utils/SellerDashboardData/StatsCard.json"


const Stats = () => {
  return (
<<<<<<< HEAD
    <div className="grid grid-cols-4 gap-8">
=======
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
>>>>>>> 04e8881909da2c316796f778f38163540d21c380
      {
        StatsData.map((item)=>(
            <StatsCard item={item}/>
        ))
      }
    </div>
  )
}

export default Stats

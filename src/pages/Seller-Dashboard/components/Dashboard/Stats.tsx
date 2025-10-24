import StatsCard from "@/common/StatsCard"
import StatsData from "@/utils/SellerDashboardData/StatsCard.json"


const Stats = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
      {
        StatsData.map((item)=>(
            <StatsCard item={item}/>
        ))
      }
    </div>
  )
}

export default Stats

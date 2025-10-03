import StatsCard from "@/common/StatsCard"
import StatsData from "@/utils/SellerDashboardData/StatsCard.json"


const Stats = () => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {
        StatsData.map((item)=>(
            <StatsCard item={item}/>
        ))
      }
    </div>
  )
}

export default Stats

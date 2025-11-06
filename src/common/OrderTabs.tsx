 





import { Spinner } from "@/components/ui/spinner";
import { useGetAllOrdersByAdminAndVendorQuery } from "@/Redux/Features/Order/Order.api";
import { Order } from "@/types/OrderTypes";
import { Dispatch, SetStateAction } from "react";


const OrderTabs = ({setStatus,status}:{setStatus:Dispatch<SetStateAction<string>>,status:string}) => {
  const {data,isLoading} = useGetAllOrdersByAdminAndVendorQuery({status:""});
  
  if(isLoading) return (<div><Spinner /></div>)
  const orders = data?.data
  const pendingCount = orders.filter((order :Order )=> order.status === "Pending").length;
  const completeCount = orders.filter((order :Order )=> order.status === "Confirmed").length;
  const cancelCount = orders.filter((order : Order )=> order.status === "Cancelled").length;

  return (
    <div className="bg-white rounded-md py-4 px-6 shadow-sm overflow-x-auto">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <button onClick={()=>setStatus("")}  className={ `${status === "" ? "bg-blue-600 text-white" : ""}  font-sm px-6 py-2 rounded-full text-md whitespace-nowrap `}>
          All Order <span className="font-normal">({data?.count})</span>
        </button>
        <button onClick={()=>setStatus("Pending")} className={ `${status === "Pending" ? "bg-blue-600 text-white" : ""}  font-sm px-6 py-2 rounded-full text-md whitespace-nowrap `}>
          Pending order <span className="text-yellow-500">({pendingCount})</span>
        </button>

        <button onClick={()=>setStatus("Confirmed")} className={ `${status === "Confirmed" ? "bg-blue-600 text-white" : ""}  font-sm px-6 py-2 rounded-full text-md whitespace-nowrap `}>
          Complete Order <span className="text-green-500">({completeCount})</span>
        </button>

        <button onClick={()=>setStatus("Cancelled")} className={ `${status === "Cancelled" ? "bg-blue-600 text-white" : ""}  font-sm px-6 py-2 rounded-full text-md whitespace-nowrap `}>
          Cancel Order <span className="text-red-500">({cancelCount})</span>
        </button>
      </div>
    </div>
  );
};

export default OrderTabs;

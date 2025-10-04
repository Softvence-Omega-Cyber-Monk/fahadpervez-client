
import { Outlet } from "react-router-dom";



const Products = () => {

  return (
    <div className="space-y-10">
      <Outlet/>
    </div>
  );
};

export default Products;
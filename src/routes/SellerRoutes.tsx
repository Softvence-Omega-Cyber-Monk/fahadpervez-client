import Dashboard from "@/pages/Seller-Dashboard/Dashboard/Dashboard";
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineShoppingCart, AiOutlineDollarCircle, AiOutlineMessage, AiOutlineSetting, AiOutlineQuestionCircle } from "react-icons/ai";
import Order from "@/pages/Seller-Dashboard/Order/Order";
import Earnings from "@/pages/Seller-Dashboard/Earnings/Earnings";
import Message from "@/pages/Seller-Dashboard/Message/Message";
import Settings from "@/pages/Seller-Dashboard/Settings/Settings";
import HelpAndSupport from "@/pages/Seller-Dashboard/HelpAndSupport/HelpAndSupport";
import AddProduct from "@/pages/Seller-Dashboard/components/Products/AddSingleProduct/AddProduct";
import AddBulkProduct from "@/pages/Seller-Dashboard/components/Products/AddBulkProduct/AddBulkProduct";
import ProductsLandingPage from "@/pages/Seller-Dashboard/components/Products/ProductsLandingPage/ProductsLandingPage";

export const sellerRoutes = [
  {
    index: true,
    path:'dashboard',
    icon: <RiDashboardFill />,
    name: "Dashboard",
    element: <Dashboard />,
  },
  {
    path: "products",
    icon: <AiOutlineShoppingCart />,
    name: "Products",
    // element: <Products />,
    children:[
      {
        index:true,
        element:<ProductsLandingPage/>
      },
      {
        path:"add-single-product",
        element:<AddProduct/>
      },
      {
        path:"add-bulk-product",
        element:<AddBulkProduct/>
      }
    ]
  },
  {
    path: "orders",
    icon: <AiOutlineShoppingCart />,
    name: "Orders",
    element: <Order />,
  },
  {
    path: "earnings",
    icon: <AiOutlineDollarCircle />,
    name: "Earnings",
    element: <Earnings/>,
  },
  {
    path: "messages",
    icon: <AiOutlineMessage />,
    name: "Messages",
    element: <Message />,
  },
  {
    path: "settings",
    icon: <AiOutlineSetting />,
    name: "Settings",
    element: <Settings />,
  },
  {
    path: "help-support",
    icon: <AiOutlineQuestionCircle />,
    name: "Help & Support",
    element: <HelpAndSupport />,
  },
];

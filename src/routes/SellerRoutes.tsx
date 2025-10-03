import Dashboard from "@/pages/Seller-Dashboard/Dashboard/Dashboard";
import Products from "@/pages/Seller-Dashboard/Products/Products";
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineShoppingCart, AiOutlineDollarCircle, AiOutlineMessage, AiOutlineSetting, AiOutlineQuestionCircle } from "react-icons/ai";
import Order from "@/pages/Seller-Dashboard/Order/Order";
import Earnings from "@/pages/Seller-Dashboard/Earnings/Earnings";
import Message from "@/pages/Seller-Dashboard/Message/Message";
import Settings from "@/pages/Seller-Dashboard/Settings/Settings";
import HelpAndSupport from "@/pages/Seller-Dashboard/HelpAndSupport/HelpAndSupport";

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
    element: <Products />,
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

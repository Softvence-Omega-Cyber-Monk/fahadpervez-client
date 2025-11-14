import Dashboard from "@/pages/Seller-Dashboard/Dashboard/Dashboard";
import { RiDashboardFill  } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineShoppingCart, AiOutlineDollarCircle, AiOutlineMessage, AiOutlineSetting, AiOutlineQuestionCircle } from "react-icons/ai";
import Earnings from "@/pages/Seller-Dashboard/Earnings/Earnings";
import Message from "@/pages/Seller-Dashboard/Message/Message";
import Settings from "@/pages/Seller-Dashboard/Settings/Settings";
import HelpAndSupport from "@/pages/Seller-Dashboard/HelpAndSupport/HelpAndSupport";
import AddProduct from "@/pages/Seller-Dashboard/components/Products/AddSingleProduct/AddProduct";
import AddBulkProduct from "@/pages/Seller-Dashboard/components/Products/AddBulkProduct/AddBulkProduct";
import ProductsLandingPage from "@/pages/Seller-Dashboard/components/Products/ProductsLandingPage/ProductsLandingPage";
import BulkValidation from "@/pages/Seller-Dashboard/components/Products/AddBulkProduct/BulkValidation";
import ConfirmUpload from "@/pages/Seller-Dashboard/components/Products/AddBulkProduct/ConfirmUpload";
import CompleteUpload from "@/pages/Seller-Dashboard/components/Products/AddBulkProduct/CompleteUpload";
import OrderLandingPage from "@/pages/Seller-Dashboard/components/Order/OrderLandingPage";
import OrderTracking from "@/pages/Seller-Dashboard/components/Order/OrderTracking";
import SellerCategory from "@/pages/Seller-Dashboard/components/SellerCategory/SellerCategory";
import UpdateProduct from "@/pages/Seller-Dashboard/components/Products/AddSingleProduct/UpdateProduct";

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
        path:"add-single-product/:id",
        element:<UpdateProduct/>
      },
      {
        path:"add-bulk-product",
        element:<AddBulkProduct/>
      },
      {
        path:"bulk-validation",
        element:<BulkValidation/>
      },
      {
        path:"confirm-upload",
        element:<ConfirmUpload/>
      },
      {
        path:"upload-complete",
        element:<CompleteUpload/>
      },
    ]
  },
  {
    path: "add-category",
    icon: <IoAddCircleOutline  />,
    name:"Add Category",
    element:<SellerCategory/>
  },
  {
    path: "orders",
    icon: <AiOutlineShoppingCart />,
    name: "Orders",
    // element: <Order />,
    children:[
      {
        index:true,
        element:<OrderLandingPage/>
      },
      {
        path:"order-status/:id",
        element:<OrderTracking />
      }
    ]
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

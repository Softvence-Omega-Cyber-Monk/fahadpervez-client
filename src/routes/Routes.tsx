import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "@/pages/Buyer-Dashboard/Dashboard/Dashboard";
import MyOrders from "@/pages/Buyer-Dashboard/MyOrders/MyOrders";
import WishList from "@/pages/Buyer-Dashboard/WishList/WishList";
import Settings from "@/pages/Buyer-Dashboard/Settings/Settings";
import HelpSupport from "@/pages/Buyer-Dashboard/HelpSupport/HelpSupport";
import NotFound from "@/pages/NotFound";
import AdminDashboardLayout from "@/pages/Admin-Dashboard/DashboardLayout/AdminDashboardLayout";
import Users from "@/pages/Admin-Dashboard/Users/Users";
import Order from "@/pages/Admin-Dashboard/Order/Order";
import Product from "@/pages/Admin-Dashboard/Product/Product";
import Payments from "@/pages/Admin-Dashboard/Payments/Payments";
import Shipping from "@/pages/Admin-Dashboard/Shipping/ShippingDashboard";
import Support from "@/pages/Admin-Dashboard/Support/Support";
import AdminSettings from "@/pages/Admin-Dashboard/Settings/AdminSettings";
import AdmninDashboard from "@/pages/Admin-Dashboard/AdminDashboard/AdminDashboard";
import Login from "@/pages/Login/Login";
import Signup from "@/pages/Signup/Signup";
import Home from "@/pages/Home/Home";
import Categories from "@/pages/Home/Categories";
import ProductDetails from "@/pages/Buyer-Dashboard/ProductDetails/ProductDetails";
import SellerDashboardLayout from "@/pages/Seller-Dashboard/DashboardLayout/SellerDashboardLayout";
import { sellerRoutes } from "./SellerRoutes";
import ProductDetail from "@/pages/ProductDetail";
import MyCartHome from "@/pages/My-Cart/MyCartHome";
import CheckOut from "@/pages/Checkout/CheckOut";
import StoreHome from "@/pages/Store-Profile/StoreHome";
import Notifications from "@/pages/Buyer-Dashboard/Notifications/Notifications";
// import DashboardProductDetails from "@/pages/Buyer-Dashboard/DashboardProductDetails/DashboardProductDetails";
import BuyerProfile from "@/pages/Buyer-Dashboard/BuyerProfile/BuyerProfile";
import Message from "@/pages/Buyer-Dashboard/Message/Message";
import PaymentsDasbord from "@/components/Admin/paymentsDasbord/PaymentsDasbord";
import SalesReportsPage from "@/pages/Admin/SalesReportsPage";
import CMSDashboard from "@/components/Admin/CMS/CMSDashboard";
import AdminMessage from "@/pages/Admin-Dashboard/Message/AdminMessage";
import { CMSEditPage } from "@/components/Admin/CMS/CMSEditPage";
import SellerDashboard from "../pages/Seller-Dashboard/Dashboard/Dashboard"
import { UnAuthoraised } from "@/pages/UnAuthoraised/UnAuthoraised";
import Register from "@/pages/Login/Register";
import WithAuth from "@/Config/WithAuth";
import CustomerSupport from "@/pages/CustomerSupport/CustomerSupport";
import BuyerDashboardLayout from "@/pages/Buyer-Dashboard/DashboardLayout/BuyerDashboardLayout";
import CouponAdminPage from "@/pages/Admin-Dashboard/Coupon/Coupon";
import CategoryDetails from "@/pages/Home/CategoryDetails";
import Shop from "@/pages/Shop/Shop";
import AddProductPage from "@/pages/Seller-Dashboard/components/Products/AddSingleProduct/AddProduct";
import OrderDetails from "@/pages/Buyer-Dashboard/DashboardProductDetails/OrderDetails";
import AdminOrderDetails from "@/pages/Admin-Dashboard/Order/components/AdminOrderDetails";
import CheckoutPage from "@/pages/AFSPay/AFSPay";
import OrderSuccessPage from "@/pages/OrderSuccess/OrderSuccess";
import PaymentFailedPage from "@/pages/OrderFailed/OrderFailed";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/afs",
        element: <CheckoutPage />
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/category/:id",
        element: <CategoryDetails />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetail />,
      },
      {
        path: "/my-cart",
        element: <MyCartHome />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path: "/store-profile/:id",
        element: <StoreHome />,
      },
      {
        path: "/customer-support",
        element: <CustomerSupport />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/checkout/success",
        element: <OrderSuccessPage />
      },
      {
        path: "/checkout/failed",
        element: <PaymentFailedPage />
      }
    ],
  },
  {
    path: "buyer-dashboard",
    element: <WithAuth requiredRole="CUSTOMER"><BuyerDashboardLayout /></WithAuth>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
        {
    path: "order-details/:id",
    element: <OrderDetails />,
  },
      {
        path: "wishlist",
        element: <WishList />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "help-support",
        element: <HelpSupport />,
      },
      {
        path: "product-details/:productId",
        element: <ProductDetails />,
      },
      {
        path: "product-details/:productId",
        element: <ProductDetails />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      // {
      //   path: "dashboard-product-details/:productId",
      //   element: <DashboardProductDetails />,
      // },
    
      {
        path: "buyer-profile",
        element: <BuyerProfile />,
      },
      {
        path: "message",
        element: <Message />,
      },
    ],
  },

  {
    path: "admin-dashboard",
    element: <WithAuth requiredRole="ADMIN"><AdminDashboardLayout /></WithAuth>,
    children: [
      {
        index: true,
        element: <AdmninDashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "orders",
        element: <Order />,
      },
      {
        path: "order-details/:id",
        element: <AdminOrderDetails />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "message",
        element: <AdminMessage />,
      },
      {
        path: "coupons",
        element: <CouponAdminPage />
      },
      {
        path: "cms",
        element: <CMSDashboard />,
      },
      {
        path: "edit-page",
        element: <CMSEditPage />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "shipping",
        element: <Shipping />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
      {
        path: "admin-payment",
        element: <PaymentsDasbord />,
      },
      {
        path: "sales-reports",
        element: <SalesReportsPage />,
      },
    ],
  },
  {
    path: "/seller-dashboard",
    element: <WithAuth requiredRole="VENDOR"><SellerDashboardLayout /></WithAuth>,
    children: [
      {
        index: true,
        element: <SellerDashboard />
      },
      ...sellerRoutes
    ],
  },
  {
        path:"/update-product/:id",
        element:<AddProductPage/>
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/un-authoraised",
    element: <UnAuthoraised />
  }
]);

export default routes;

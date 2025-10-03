import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import BuyerDashboardLayout from "@/pages/Buyer-Dashboard/DashboardLayout/BuyerDashboardLayout";
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
import SalesReports from "@/pages/Admin-Dashboard/SalesReports";
import Payments from "@/pages/Admin-Dashboard/Payments/Payments";
import Shipping from "@/pages/Admin-Dashboard/Shipping/Shipping";
import Support from "@/pages/Admin-Dashboard/Support/Support";
import AdminSettings from "@/pages/Admin-Dashboard/Settings/AdminSettings";
import AdmninDashboard from "@/pages/Admin-Dashboard/AdminDashboard/AdminDashboard";
import Login from "@/pages/Login/Login";
import Signup from "@/pages/Signup/Signup";
import Home from "@/pages/Home/Home";
import Categories from "@/pages/Home/Categories";
import SingleProduct from "@/pages/Home/SingleProduct";

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
        path: "/categories/:categoryName",
        element: <Categories />,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "buyer-dashboard",
        element: <BuyerDashboardLayout />,
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
        ],
      },

      {
        path: "admin-dashboard",
        element: <AdminDashboardLayout />,
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
            path: "product",
            element: <Product />,
          },
          {
            path: "sales-reports",
            element: <SalesReports />,
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
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;

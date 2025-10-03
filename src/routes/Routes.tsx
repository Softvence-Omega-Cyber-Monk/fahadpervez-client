import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import AdminRoute from "./AdminRoutes";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Form from "@/pages/Form";
import Services from "@/pages/Services";
import Layout from "@/Layout/AdminLayout";

// Admin Pages
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import Users from "@/pages/Admin/Users";
import BuyerDetails from "@/pages/Admin/BuyerDetails";
import SellerRequests from "@/pages/Admin/SellerRequests";
import SellerApplication from "@/pages/Admin/SellerApplication";
import Orders from "@/pages/Admin/Orders";
import OrderDetails from "@/pages/Admin/OrderDetails";



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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      // ✅ Admin Protected Routes
      {
        path: "/admin",
        element: <AdminRoute />, // Checks for admin
        children: [
          {
            path: "",
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "",
            element: <Layout />,
            children: [
              {
                path: "dashboard",
                element: <AdminDashboard />,
              },
              {
                path: "users",
                element: <Users />,
              },
              {
                path: "users/buyer/:id",
                element: <BuyerDetails />,
              },
              {
                path: "users/sellers/requests",
                element: <SellerRequests />,
              },
              {
                path: "users/sellers/requests/:id",
                element: <SellerApplication />,
              },
              {
                path: "orders",
                element: <Orders />,
              },
              {
                path: "orders/:id",
                element: <OrderDetails />,
              },
            ],
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

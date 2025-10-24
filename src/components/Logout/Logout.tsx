import { Power } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      
      await axios.post(import.meta.env.VITE_BASE_API + "/api/v1/users/logout", {}, {
        withCredentials: true, 
      });

      // LocalStorage clear
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Success message
      toast.success("Logged out successfully!");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div
      onClick={handleLogout}
      className="text-lg bg-white shadow-md border border-gray-200 hover:bg-red-600 hover:text-white duration-300 flex justify-center gap-2 p-4 rounded-lg cursor-pointer"
    >
      Logout
      <Power className="text-red-300" />
    </div>
  );
};

export default Logout;

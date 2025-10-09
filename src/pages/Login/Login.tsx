import { useLogInUserMutation } from '@/Redux/Features/auth/auth.api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const [logInUser] = useLogInUserMutation();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

    if (!rememberMe) {
      toast.error("Please check 'Remember Me' to continue.");
      return;
    }


    const toastId = toast.loading("Signing you in.....");
    e.preventDefault();
    try {
      const data = {
        email,
        password
      };

      const res = await logInUser(data).unwrap();

      if (res.success) {
        localStorage.setItem("user", res.data)
      }

      toast.success("Logged In Successfully", { id: toastId });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login faild. Please check your creadiential", { id: toastId })
    }
  }


  return (
    <div className="flex min-h-screen bg-[#F1F5F8]">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">

          {/* Register Link */}
          <div className="mb-8">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="#" className="text-blue-600 hover:underline">Register</a>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} >

            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Enter email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Enter password"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-sm text-gray-700 hover:text-blue-600">
                Forget Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Pharmacy Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1))',
          }}
        >
          <img src="/login-img.png" alt="" className='w-full h-full' />
        </div>
      </div>
    </div>
  );
};

export default Login;
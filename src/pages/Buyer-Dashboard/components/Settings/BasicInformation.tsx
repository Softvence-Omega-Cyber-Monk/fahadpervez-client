import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useUpdateProfileMutation } from '@/Redux/Features/user/user.api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';



export default function BasicInformation() {

  const [updateProfile] = useUpdateProfileMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    country: '',
    language: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

    const data = {
      name: [formData.firstName, formData.lastName].filter(Boolean).join(" "),
      phone: formData.phone,
      email: formData.email,
      country: formData.country,
      // language : formData.language
    };

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );


    try {
      await updateProfile(filteredData).unwrap();
      toast.success("Profile Updated Successfully" , {id : toastId});
      navigate("/");
    } catch (error) {
      toast.error("Profile updated faild" , {id : toastId});
    }
  }

  return (
    <div>
      <div className="w-full bg-white p-4 sm:p-6 lg:p-8 mt-6 mb-5">
        <div className="">
          {/* Heading */}
          <h2 className="text-lg sm:text-xl font-sm font-normal text-gray-900 mb-8">
            Basic information
          </h2>

          {/* Form Grid */}
          <form onSubmit={handleUpdateProfile} id='basic-info-form' className="space-y-6">
            {/* First Name and Last Name Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm sm:text-base text-gray-900 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  required
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm sm:text-base text-gray-900 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Phone and E-mail Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-sm sm:text-base text-gray-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-sm sm:text-base text-gray-900 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Country and Language Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Country */}
              <div>
                <label className="block text-sm sm:text-base text-gray-900 mb-2">
                  Country
                </label>
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 pointer-events-none" />
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm sm:text-base text-gray-900 mb-2">
                  Language
                </label>
                <div className="relative">
                  <select
                    value={formData.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="flex justify-center sm:justify-end mt-5">
              <button id='basic-info-form' className="bg-[#0082FA] hover:bg-[#1e4366] duration-500 w-full sm:w-auto px-18 py-3 rounded-md text-white text-sm sm:text-base">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { IBuyerProfileType } from "../../PersonalInfo/PersonalInfo";
import useUpdateProfile from "@/hooks/useUpdateProfile";

interface BasicInformationProps {
  profileData?: IBuyerProfileType;
  setPreviewProfileImage?: Dispatch<SetStateAction<string>>;
  setPreviewName?: Dispatch<SetStateAction<string>>;
  imageFile?: File | null;
}

export default function BasicInformation(props: BasicInformationProps) {
  const { profileData } = props;
  const { handleUpdate } = useUpdateProfile();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    language: "",
    profileImage: props?.imageFile,
  });

  /** Set default values when profileData changes */
  useEffect(() => {
    if (profileData) {
      const nameParts = profileData.name?.split(" ") || [];
      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts[1] || "",
        phone: profileData.phone || "",
        email: profileData.email || "",
        country: profileData.country || "",
        language: profileData.language || "",
        profileImage: props?.imageFile,
      });
    }
  }, [profileData, props?.imageFile]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Build updated object
    const updatedData = {
      name: [formData.firstName, formData.lastName].filter(Boolean).join(" "),
      phone: formData.phone,
      email: formData.email,
      country: formData.country,
      language: formData.language,
      profileImage: props?.imageFile,
    };

    try {
      const formData = new FormData();
      formData.append("name", updatedData.name);
      formData.append("phone", updatedData.phone);
      formData.append("email", updatedData.email);
      formData.append("country", updatedData.country);
      formData.append("language", updatedData.language);
      formData.append("profileImage", updatedData.profileImage as File);

      await handleUpdate(formData);
      if (props.setPreviewName) {
        props.setPreviewName(updatedData.name);
      }
    } catch (error) {
      toast.error("Profile update failed: " + error);
    }
  };

  return (
    <div>
      <div className="w-full bg-white p-4 sm:p-6 lg:p-8 mt-6 mb-5">
        <h2 className="text-lg sm:text-xl font-normal text-gray-900 mb-8">
          Basic Information
        </h2>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
                className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Phone & E-mail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-900 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-900 mb-2">E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Country & Language */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm text-gray-900 mb-2">
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 appearance-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 pointer-events-none" />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-900 mb-2">
                Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 appearance-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 pointer-events-none" />
            </div>
          </div>

          <div className="flex justify-center sm:justify-end mt-5">
            <button
              type="submit"
              className="bg-[#0082FA] hover:bg-[#1e4366] duration-500 w-full sm:w-auto px-8 py-3 rounded-md text-white text-sm sm:text-base"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

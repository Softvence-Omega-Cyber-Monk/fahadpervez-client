// src/components/AdminSettings/ProfileInfoSettings.tsx

import React, { useState } from 'react';
import { Camera, Save, Upload, User } from 'lucide-react';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import { toast } from 'sonner';

interface FormDataFields {
  name: string;
  phone: string;
  email: string;
  profileImage?: string;
}

interface ProfileInfoSettingsProps {
  profileData: FormDataFields;
}

const ProfileInfoSettings: React.FC<ProfileInfoSettingsProps> = ({ profileData }) => {
  const [formData, setFormData] = useState<FormDataFields>(profileData);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(
    profileData?.profileImage ||
      'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
  );
  const [file, setFile] = useState<File | null>(null);
  const {handleUpdate} = useUpdateProfile();

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle Image Upload (show preview + store file)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  // Handle Submit (append file + other data)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare multipart FormData
    const data = new FormData();
    data.append('name', formData.name.trim());
    data.append('phone', formData.phone.trim());
    data.append('email', formData.email.trim());
    if (file) {
      data.append('profileImage', file);
    }
    try {
      await handleUpdate(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("An unexpected error occurred" + error );
    }

  };

  return (
    <div className="w-full space-y-6">
      {/* Admin Personal Information */}
      <div className="w-full p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="w-full lg:w-auto">
            <h2 className="text-2xl font-bold text-gray-900">Admin Personal Information</h2>
            <p className="text-gray-600 mt-1">Update your photo and personal details</p>
          </div>
          <label className="cursor-pointer w-full lg:w-auto">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex items-center justify-center lg:justify-start space-x-2 px-6 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200 w-full lg:w-auto">
              <Upload size={18} />
              <span>Upload Photo</span>
            </div>
          </label>
        </div>

        <div className="flex flex-col xl:flex-row items-center xl:items-start space-y-6 xl:space-y-0 xl:space-x-8 w-full">
          {/* Profile Photo */}
          <div className="relative group flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden shadow-md">
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={40} className="text-blue-600" />
              )}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
              <Camera size={20} className="text-white" />
            </div>
          </div>

          <div className="text-center xl:text-left w-full">
            <h3 className="text-xl font-semibold text-gray-900">{formData.name}</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Admin
              </span>
              <span className="text-sm text-gray-500">Last updated: Today</span>
            </div>
            <p className="text-gray-600 mt-3 max-w-4xl text-center xl:text-left">
              Update your photo and personal details here. Changes will be reflected across your account.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Info Form */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full p-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
            <p className="text-gray-600 mt-1">Manage your basic account details</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
            {/* Name */}
            <div className="space-y-2 w-full">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
                Name<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2 w-full">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-800">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Email */}
            <div className="space-y-2 w-full">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                Email Address<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter your e-mail address"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row justify-end items-center space-y-4 lg:space-y-0 lg:space-x-4 pt-8 mt-8 border-t border-gray-200 w-full">
            <button
              type="button"
              className="w-full lg:w-auto px-8 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
             
              className="w-full lg:w-auto px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoSettings;

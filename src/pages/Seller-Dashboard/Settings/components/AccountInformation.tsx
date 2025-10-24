import { useUpdateProfileMutation } from "@/Redux/Features/user/user.api";
import {
  BasicInformation,
  BusinessInformation,
} from "@/types/SellerDashboardTypes/SettingsTypes";
import React, { useRef } from "react";
import toast from "react-hot-toast";

interface SaveButtonProps {
  type: "primary" | "danger";
  children: React.ReactNode;
  onClick?: () => void;
}

interface SectionTitleProps {
  children: React.ReactNode;
}

const SaveButton = ({ type, children, onClick }: SaveButtonProps) => (
  <button
    onClick={onClick}
    className={`
      mt-6 px-6 py-2.5 rounded-lg font-medium text-white text-sm transition-all
      ${
        type === "primary"
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-red-600 hover:bg-red-700"
      }
    `}
  >
    {children}
  </button>
);

const SectionTitle = ({ children }: SectionTitleProps) => (
  <h3 className="text-base font-semibold text-gray-900 mb-4 mt-8 first:mt-0">
    {children}
  </h3>
);

interface AccountInformationProps {
  basicInformation: BasicInformation;
  businessInformation: BusinessInformation;
}

const AccountInformation: React.FC<AccountInformationProps> = (props) => {
  const [updateProfile] = useUpdateProfileMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { name, phone, email, country, language, role, address } =
    props.basicInformation;
  const { businessName, businessType, businessDescription } =
    props.businessInformation;
  const [profileImage, setProfileImage] = React.useState<File | null>(null);

  // States to hold updates
  const [basicUpdateInformation, setBasicUpdateInformation] = React.useState({
    name,
    phone,
    email,
    country,
    language,
    address,
  });

  const [businessUpdateInformation, setBusinessUpdateInformation] =
    React.useState({
      businessName,
      businessType,
      phone,
      businessDescription,
    });

  // handle change for both
  const handleBasicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBasicUpdateInformation((prev) => ({ ...prev, [name]: value }));
  };

  const handleBusinessChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBusinessUpdateInformation((prev) => ({ ...prev, [name]: value }));
  };

  // onClick handlers
  const handleBasicSave = async () => {
    
    try {
      const res = await updateProfile(basicUpdateInformation);
      console.log(res);
      if (res.data.success === false) {
        toast.error("Error updating profile: " + res.error);
      } else {
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error("Error updating profile: " + error);
    }
  };

  const handleBusinessSave = async() => {
    console.log("Business Information Updated:", businessUpdateInformation);
    try {
      const res = await updateProfile(businessUpdateInformation);
      console.log(res);
      if (res.data.success === false) {
        toast.error("Error updating profile: " + res.error);
      } else {
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error("Error updating profile: " + error);
    }

  };

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="pb-8 border-b border-gray-100">
        <SectionTitle>Profile picture</SectionTitle>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-600 font-semibold">
                  {name?.[0]?.toUpperCase() || "J"}
                  {name?.split(" ")?.[1]?.[0]?.toUpperCase() || "D"}
                </span>
              )}
            </div>

            <div>
              <p className="font-semibold text-gray-900">{name}</p>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setProfileImage(e.target.files[0]);
              }
            }}
          />

          <button
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            onClick={() => fileInputRef.current?.click()}
          >
            Change profile
          </button>
        </div>

        {/* Basic Information */}
        <SectionTitle>Basic information</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Your name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Gladys Richards"
              defaultValue={name}
              onChange={handleBasicChange}
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Phone</label>
            <input
              name="phone"
              type="tel"
              placeholder="(671) 555-0110"
              defaultValue={phone}
              onChange={handleBasicChange}
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">E-mail</label>
            <input
              name="email"
              type="email"
              placeholder="debra.holt@example.com"
              defaultValue={email}
              onChange={handleBasicChange}
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Country</label>
            <select
              name="country"
              defaultValue={country}
              onChange={handleBasicChange}
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            >
              <option>USA</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Language</label>
            <select
              name="language"
              defaultValue={language}
              onChange={handleBasicChange}
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            >
              <option>English</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <SaveButton type="primary" onClick={handleBasicSave}>
            Save changes
          </SaveButton>
        </div>
      </div>

      {/* Business Information Section */}
      <div>
        <SectionTitle>Business information</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-2">
              Business name
            </label>
            <input
              name="businessName"
              type="text"
              placeholder="The Walt Disney Company"
              defaultValue={businessName}
              onChange={handleBusinessChange}
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Business type
            </label>
            <input
              name="businessType"
              type="text"
              placeholder="Entertainment"
              defaultValue={businessType}
              onChange={handleBusinessChange}
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Phone</label>
            <input
              name="phone"
              type="tel"
              placeholder="(671) 555-0110"
              defaultValue={phone}
              onChange={handleBusinessChange}
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-2">
              Business Description
            </label>
            <textarea
              name="businessDescription"
              rows={4}
              placeholder="Enter business description"
              defaultValue={businessDescription}
              onChange={handleBusinessChange}
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900 resize-y"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <SaveButton type="primary" onClick={handleBusinessSave}>
            Save changes
          </SaveButton>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;

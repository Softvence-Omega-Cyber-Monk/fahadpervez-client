import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";
import BasicInformation from "../components/Settings/BasicInformation";
import ProfilePicture from "../components/Settings/ProfilePicture";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";

export interface IBuyerProfileType {
  _id?: string;
  email?: string;
  name?: string;
  country?: string;
  phone?: string;
  profileImage?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  language?: string;
}

const PersonalInfo = () => {
  const { data, isLoading } = useGetMeQuery(null);
  const [previewProfileImage, setPreviewProfileImage] = useState("");
  const [previewName, setPreviewName] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const profileData = data?.data;

  useEffect(() => {
    if (profileData?.profileImage) {
      setPreviewProfileImage(profileData?.profileImage);
    }
    if (profileData?.name) {
      setPreviewName(profileData?.name);
    }
  }, [profileData]);

  if (isLoading) {
    return (
      <div className="grid place-content-center min-h-[70vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <ProfilePicture
        previewProfileImage={previewProfileImage}
        previewName={previewName}
        previewRole={profileData?.role as string}
        setImageFile={setImageFile}
      />
      <BasicInformation
        profileData={profileData}
        setPreviewName={setPreviewName}
        setPreviewProfileImage={setPreviewProfileImage}
        imageFile={imageFile}
      />
    </div>
  );
};

export default PersonalInfo;

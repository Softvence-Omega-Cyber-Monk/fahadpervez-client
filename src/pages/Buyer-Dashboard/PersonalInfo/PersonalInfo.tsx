import { useGetMeQuery } from "@/Redux/Features/auth/auth.api"
import BasicInformation from "../components/Settings/BasicInformation"
import ProfilePicture from "../components/Settings/ProfilePicture"

export interface IBuyerProfileType{
  _id? : string,
  email : string,
  name ? : string,
  country ? : string,
  phone ? : string,
  profileImage ? : string,
  role ? : string,
  firstName ? : string,
  lastName ? : string,
  language ? : string
}

const PersonalInfo = () => {

  const { data } = useGetMeQuery(null);
  const profileData = data?.data;

  return (
    <div>
      <ProfilePicture profileData={profileData as IBuyerProfileType} />
      <BasicInformation />
    </div>
  )
}

export default PersonalInfo
import PrimaryButton from "@/common/PrimaryButton";
import { useNavigate } from "react-router-dom";


export const UnAuthoraised = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative grid place-content-center min-h-screen gap-10"
    >
      <div className="space-y-10">
      <h1 className="  px-4">
        You are not authorized to access this route
      </h1>
      <div className="flex gap-4 items-center justify-center">
      <PrimaryButton type="Primary" title="Login" className="w-44 border border-primary-blue" onClick={()=>navigate('/login')} />
      <PrimaryButton type="Secondary" title="Back to Home" className="border w-44" onClick={()=>navigate('/')}/>
      </div>
      </div>
    </div>
  );
};

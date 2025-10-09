import { useState } from "react";
import BasicInfo from "@/components/AllRegister/BasicInfo/BasicInfo";
import BusinessInfo from "@/components/AllRegister/BusinessInfo/BusinessInfo";
import ShippingInfo from "@/components/AllRegister/ShippingInfo/ShippingInfo";

const Signup = () => {
  const [step, setStep] = useState<"basic" | "business" | "shipping" | "payment">("basic");
  

  return (
    <div>
      {step === "basic" && <BasicInfo onNext={() => setStep("business")} />}
      {step === "business" && <BusinessInfo onPrevious={() => setStep("basic")} onNext={() => setStep("shipping")} />}
      {step === "shipping" && (<ShippingInfo onPrevious={() => setStep("business")} onNext={() => setStep("payment")}/>
      )}
    </div>
  );
};

export default Signup;

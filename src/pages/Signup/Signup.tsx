import { useState } from "react";
import BasicInfo from "@/components/AllRegister/BasicInfo/BasicInfo";
import BusinessInfo from "@/components/AllRegister/BusinessInfo/BusinessInfo";
import ShippingInfo from "@/components/AllRegister/ShippingInfo/ShippingInfo";
import PaymentInfo from "@/components/AllRegister/PaymentInfo/PaymentInfo";
import ContractInfo from "@/components/AllRegister/ContractInfo/ContractInfo";
import Agreement from "@/components/AllRegister/Agreement/Agreement";
import Review from "@/components/AllRegister/Review/Review";

const Signup = () => {
  const [step, setStep] = useState<"basic" | "business" | "shipping" | "payment" | "contract" | "agreement" | "review">("basic");

  return (
    <div>
      {step === "basic" && <BasicInfo onNext={() => setStep("business")} />}
      {step === "business" && <BusinessInfo onPrevious={() => setStep("basic")} onNext={() => setStep("shipping")} />}
      {step === "shipping" && <ShippingInfo onPrevious={() => setStep("business")} onNext={() => setStep("payment")}/>}
      {step === "payment" && <PaymentInfo onPrevious={() => setStep("shipping")} onNext={() => setStep("contract")}/>}
      {step === "contract" && <ContractInfo onPrevious={() => setStep("payment")} onNext={() => setStep("agreement")}/>}
      {step === "agreement" && <Agreement onNext={() => setStep("review")}/>}
      {step === "review" && <Review/>}
    </div>
  );
};

export default Signup;

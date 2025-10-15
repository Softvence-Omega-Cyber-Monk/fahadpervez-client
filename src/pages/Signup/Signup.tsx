import { useState } from "react";
import BasicInfo from "@/components/AllRegister/BasicInfo/BasicInfo";
import BusinessInfo from "@/components/AllRegister/BusinessInfo/BusinessInfo";
import ShippingInfo from "@/components/AllRegister/ShippingInfo/ShippingInfo";
import PaymentInfo from "@/components/AllRegister/PaymentInfo/PaymentInfo";
import ContractInfo from "@/components/AllRegister/ContractInfo/ContractInfo";
import Agreement from "@/components/AllRegister/Agreement/Agreement";
import Review from "@/components/AllRegister/Review/Review";  
import ContractInstraction from "@/components/AllRegister/ContractInstraction/ContractInstraction";
import ReadSign from "@/components/AllRegister/ContractInstraction/ReadSign";

const Signup = () => {
  const [step, setStep] = useState<"basic" | "business" | "shipping" | "payment" | "contract" | "agreement" | "review" | "instraction" | "readsign">("basic");

  return (
    <div>
        {step === "basic" && <BasicInfo onNext={() => setStep("business")} />}
        {step === "business" && <BusinessInfo onPrevious={() => setStep("basic")} onNext={() => setStep("shipping")} />}
        {step === "shipping" && <ShippingInfo onPrevious={() => setStep("business")} onNext={() => setStep("payment")} />}
        {step === "payment" && <PaymentInfo onPrevious={() => setStep("shipping")} onNext={() => setStep("contract")} />}
        {step === "contract" && <ContractInfo onPrevious={() => setStep("payment")} onNext={() => setStep("agreement")} />}
        {step === "agreement" && <Agreement onNext={() => setStep("review")} />}
        {step === "instraction" && <ContractInstraction onNext={() => setStep("readsign")} />}
        {step === "readsign" && <ReadSign />}
        {step === "review" && <Review />}
    </div>
  );
};

export default Signup;

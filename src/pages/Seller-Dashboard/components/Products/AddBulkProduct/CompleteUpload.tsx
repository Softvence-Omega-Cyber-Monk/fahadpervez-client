import PrimaryButton from "@/common/PrimaryButton"
import { Download} from "lucide-react"

export default function CompleteUpload() {
  return (
    <div className="min-h-screen grids place-content-center text-center">
      {/* Success Icon with Decorative Elements */}
      <div className="relative inline-flex items-center justify-center mb-6">
        {/* Decorative circles */}
        <div className="absolute -top-2 -left-4 w-3 h-3 rounded-full border-2 border-primary-orange" />
        <div className="absolute -top-4 left-8 w-2 h-2 rounded-full border-2 border-primary-red" />
        <div className="absolute top-2 -right-6 w-2 h-2 rounded-full border-2 border-primary-red" />
        <div className="absolute -bottom-2 -left-6 w-2 h-2 rounded-full border-2 border-primary-red" />
        <div className="absolute -bottom-4 left-4 w-3 h-3 rounded-full border-2 border-primary-green" />
        <div className="absolute bottom-0 -right-4 w-2 h-2 rounded-full border-2 border-primary-green" />
        <div className="absolute top-8 -left-8 w-6 h-1 bg-primary-yellow rounded-full transform -rotate-45" />
        <div className="absolute -top-2 right-6 w-6 h-1 bg-primary-yellow rounded-full transform rotate-45" />

        {/* Main success badge */}
        <img src="/src/assets/Check.svg" alt="" />
      </div>

      {/* Success Message */}
      <h2 className="text-dark-blue font-bold text-2xl mb-3">UPLOAD COMPLETE!</h2>
      <p className="pb-10 p2 text-base">
        Your products have been successfully processed and added to your catalog.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <PrimaryButton type="Primary" title="Upload More Products"/>
        <PrimaryButton type="Outline" title="Download Report" leftIcon={<Download className="size-5" />}/>
      </div>
    </div>
  )
}

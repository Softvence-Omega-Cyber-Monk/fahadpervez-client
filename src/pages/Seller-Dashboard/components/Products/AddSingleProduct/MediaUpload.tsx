import { Upload } from "lucide-react"

export default function MediaUpload() {
  const imageSlots = [
    { id: "main", label: "Main image" },
    { id: "side1", label: "Side image" },
    { id: "side2", label: "Side" },
    { id: "last", label: "Last image" },
  ]

  return (
    <div className="bg-light-background rounded-lg p-6 space-y-6">
      {/* Image Upload Section */}
      <div>
        <div className="flex items-baseline gap-1 mb-4">
          <h3 className="text-dark-blue font-semibold text-base">Add Image</h3>
          <span className="text-primary-red text-base">*</span>
        </div>
        <p className="text-light-gray text-xs font-normal mb-4">
          Upload an image or drag and drop PNG, JPG, PDF up to 2 mb.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {imageSlots.map((slot) => (
            <div
              key={slot.id}
              className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary-blue hover:bg-primary-blue/5 transition-colors cursor-pointer p-4"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload className="w-6 h-6 text-light-gray" />
              </div>
              <span className="text-light-gray text-xs font-normal text-center">{slot.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Video Upload Section */}
      <div>
        <div className="flex items-baseline gap-1 mb-4">
          <h3 className="text-dark-blue font-semibold text-base">Add Video</h3>
        </div>
        <p className="text-light-gray text-xs font-normal mb-4">Upload a video up to 10 mb.</p>

        <div className="relative border-2 border-dashed border-primary-blue rounded-lg p-12 bg-[#f0f8ff]">
          {/* Corner badges */}
          <div className="absolute top-2 left-2 w-8 h-8 bg-primary-blue text-white rounded flex items-center justify-center text-xs font-bold">
            20
          </div>
          <div className="absolute top-2 right-2 w-8 h-8 bg-primary-blue text-white rounded flex items-center justify-center text-xs font-bold">
            20
          </div>
          <div className="absolute bottom-2 left-2 w-8 h-8 bg-primary-blue text-white rounded flex items-center justify-center text-xs font-bold">
            20
          </div>
          <div className="absolute bottom-2 right-2 w-8 h-8 bg-primary-blue text-white rounded flex items-center justify-center text-xs font-bold">
            20
          </div>

          {/* Upload content */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Upload className="w-8 h-8 text-light-gray" />
            </div>
            <span className="text-light-gray text-sm font-normal">Add video</span>
          </div>
        </div>
      </div>
    </div>
  )
}

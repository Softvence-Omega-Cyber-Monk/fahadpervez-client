import { Upload } from "lucide-react";

export default function MediaUpload() {
  const imageSlots = [
    { id: "main", label: "Main image" },
    { id: "side1", label: "Side image" },
    { id: "side2", label: "Side" },
    { id: "last", label: "Last image" },
  ];

  return (
    <div className=" space-y-10">
    <div className="bg-light-background rounded-lg p-6 space-y-6">
      {/* Image Upload Section */}
      <div>
        <div className="flex items-center justify-between gap-1 py-4 mb-6 border-b-2 border-b-border ">
          <h3 className="">
            Add Image<span className=" text-base">*</span>
          </h3>
          <p className="p2">
            Upload an image or drag and drop PNG, JPG, PDF up to 2 mb.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {imageSlots.map((slot) => (
            <div
              key={slot.id}
              className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary-blue hover:bg-primary-blue/5 transition-colors cursor-pointer p-4"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload className="w-6 h-6 text-light-gray" />
              </div>
              <span className="p1 ">
                {slot.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Video Upload Section */}
      <div className="bg-light-background rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between gap-1 py-4 mb-6 border-b-2 border-border">
          <h3 className="">Add Video</h3>
        <p className="p2 ">
          Upload a video up to 10 mb.
        </p>
        </div>

        <div className="relative border-2 border-dashed border-border rounded-2xl px-20 py-12 bg-[#f0f8ff] w-fit">

          {/* Upload content */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Upload className="w-8 h-8 text-light-gray" />
            </div>
            <span className="p1">
              Add video
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

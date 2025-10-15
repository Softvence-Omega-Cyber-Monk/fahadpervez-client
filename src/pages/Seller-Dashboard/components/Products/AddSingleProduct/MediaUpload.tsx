import { MediaData, MediaUploadProps, UploadedImage, UploadedVideo } from "@/types/SellerDashboardTypes/MediaUpload";
import { Upload, X } from "lucide-react";
import { useState, useRef, ChangeEvent, useEffect } from "react";

export default function MediaUpload({ onMediaChange, defaultMedia }: MediaUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploadedVideo, setUploadedVideo] = useState<UploadedVideo | null>(null);
  const imageInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  // Load default media when component mounts
  useEffect(() => {
    if (defaultMedia?.images) {
      const defaultImages: UploadedImage[] = [];
      
      // Convert defaultMedia URLs to UploadedImage format
      const imageSlots = [
        { id: "mainImage", urlKey: "mainImageUrl" },
        { id: "sideImage", urlKey: "sideImageUrl" },
        { id: "sideImage2", urlKey: "sideImage2Url" },
        { id: "lastImage", urlKey: "lastImageUrl" },
      ];

      imageSlots.forEach(slot => {
        const imageUrl = defaultMedia.images[slot.urlKey as keyof MediaData["images"]];
        if (imageUrl) {
          defaultImages.push({
            id: slot.id,
            file: undefined, // Use undefined instead of null
            preview: imageUrl as string,
            isDefault: true
          });
        }
      });
      
      setUploadedImages(defaultImages);
    }

    if (defaultMedia?.videoUrl) {
      setUploadedVideo({
        file: undefined, // Use undefined instead of null
        preview: defaultMedia.videoUrl,
        isDefault: true
      });
    }
  }, [defaultMedia]);

  // Notify parent of media changes
  useEffect(() => {
    const images: MediaData["images"] = {};
    
    uploadedImages.forEach((img) => {
      if (img.file) {
        // Only send new files, not default URLs
        images[img.id as "mainImage" | "sideImage" | "sideImage2" | "lastImage"] = img.file ;
      }
    });
    onMediaChange({
      images,
      video: uploadedVideo?.file as File,
    });
  }, [uploadedImages, uploadedVideo, onMediaChange]);

  const imageSlots = [
    { id: "mainImage", label: "Main image" },
    { id: "sideImage", label: "Side image" },
    { id: "sideImage2", label: "Side" },
    { id: "lastImage", label: "Last image" },
  ];

  // Handle image upload
  const handleImageUpload = (slotId: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^image\/(png|jpg|jpeg|pdf)$/)) {
      alert("Please upload PNG, JPG, or PDF files only");
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    // Create preview URL
    const preview = URL.createObjectURL(file);

    // Update uploaded images
    setUploadedImages((prev) => {
      // Clean up old blob URL if it exists and is not a default URL
      const existing = prev.find((img) => img.id === slotId);
      if (existing && existing.preview.startsWith('blob:')) {
        URL.revokeObjectURL(existing.preview);
      }

      // Remove existing image for this slot
      const filtered = prev.filter((img) => img.id !== slotId);
      return [...filtered, { id: slotId, file, preview, isDefault: false }];
    });

    // Reset input to allow uploading the same file again
    event.target.value = "";
  };

  // Handle video upload
  const handleVideoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^video\//)) {
      alert("Please upload a valid video file");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Video size must be less than 10MB");
      return;
    }

    // Clean up old blob URL if exists
    if (uploadedVideo && uploadedVideo.preview.startsWith('blob:')) {
      URL.revokeObjectURL(uploadedVideo.preview);
    }

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setUploadedVideo({ file, preview, isDefault: false });

    // Reset input
    event.target.value = "";
  };

  // Remove image
  const removeImage = (slotId: string) => {
    setUploadedImages((prev) => {
      const image = prev.find((img) => img.id === slotId);
      // Only revoke blob URLs, not server URLs
      if (image && image.preview.startsWith('blob:')) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== slotId);
    });
  };

  // Remove video
  const removeVideo = () => {
    if (uploadedVideo) {
      // Only revoke blob URLs, not server URLs
      if (uploadedVideo.preview.startsWith('blob:')) {
        URL.revokeObjectURL(uploadedVideo.preview);
      }
      setUploadedVideo(null);
    }
  };

  // Get uploaded image for a slot
  const getImageForSlot = (slotId: string) => {
    return uploadedImages.find((img) => img.id === slotId);
  };

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      uploadedImages.forEach((img) => {
        if (img.preview.startsWith('blob:')) {
          URL.revokeObjectURL(img.preview);
        }
      });
      if (uploadedVideo && uploadedVideo.preview.startsWith('blob:')) {
        URL.revokeObjectURL(uploadedVideo.preview);
      }
    };
  }, [uploadedImages, uploadedVideo]);

  return (
    <div className="space-y-10">
      {/* Image Upload Section */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between gap-4 py-4 mb-6 border-b-2 border-gray-200">
            <h3 className="text-xl font-semibold">
              Add Image<span className="text-red-500 text-base">*</span>
            </h3>
            <p className="text-sm text-gray-600">
              Upload an image or drag and drop PNG, JPG, PDF up to 2 mb.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {imageSlots.map((slot) => {
              const uploadedImage = getImageForSlot(slot.id);

              return (
                <div key={slot.id} className="relative">
                  <input
                    ref={(el) => {imageInputRefs.current[slot.id] = el}}
                    type="file"
                    accept="image/png,image/jpg,image/jpeg,application/pdf"
                    onChange={(e) => handleImageUpload(slot.id, e)}
                    className="hidden"
                  />

                  {uploadedImage ? (
                    // Show uploaded image preview or default image
                    <div className="aspect-square border-2 border-gray-300 rounded-lg overflow-hidden relative group">
                      <img
                        src={uploadedImage.preview}
                        alt={slot.label}
                        className="w-full h-full object-cover"
                        
                      />
                      <button
                        onClick={() => removeImage(slot.id)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                      
                      {/* Show "Current" badge for default images */}
                      {uploadedImage.isDefault && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-md">
                          Current
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 px-2 text-center">
                        {slot.label}
                      </div>
                    </div>
                  ) : (
                    // Show upload placeholder
                    <div
                      onClick={() => imageInputRefs.current[slot.id]?.click()}
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer p-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                      <span className="text-sm text-gray-600 text-center">
                        {slot.label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Upload Section */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between gap-4 py-4 mb-6 border-b-2 border-gray-200">
          <h3 className="text-xl font-semibold">Add Video</h3>
          <p className="text-sm text-gray-600">Upload a video up to 10 mb.</p>
        </div>

        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="hidden"
        />

        {uploadedVideo ? (
          // Show uploaded video preview or default video
          <div className="relative border-2 border-gray-300 rounded-2xl overflow-hidden w-fit max-w-full">
            <video
              src={uploadedVideo.preview}
              controls
              className="max-w-full h-auto max-h-[400px]"
            />
            <button
              onClick={removeVideo}
              className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            {/* Show "Current" badge for default video */}
            {uploadedVideo.isDefault && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md">
                Current Video
              </div>
            )}
          </div>
        ) : (
          // Show upload placeholder
          <div
            onClick={() => videoInputRef.current?.click()}
            className="relative border-2 border-dashed border-gray-300 rounded-2xl px-12 sm:px-20 py-12 bg-blue-50 w-fit hover:border-blue-500 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <span className="text-base text-gray-600">Add video</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
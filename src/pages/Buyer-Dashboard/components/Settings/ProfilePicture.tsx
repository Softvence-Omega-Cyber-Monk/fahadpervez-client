import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface IProps {
  previewProfileImage?: string;
  previewName?: string;
  previewRole?: string;
  setImageFile?: Dispatch<SetStateAction<File | undefined>>;
}

export default function ProfilePicture(props: IProps) {
  const [imagePreview, setImagePreview] = useState<string>(
    props?.previewProfileImage || "/user-placeholder-profile.jpg"
  );
  useEffect(() => {
    if (props?.previewProfileImage) {
      setImagePreview(props?.previewProfileImage);
    }
  }, [props?.previewProfileImage]);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      props.setImageFile?.(file as File); // Pass file to parent if provided
    }
  };

  return (
    <div className="w-full bg-white sm:p-6 lg:p-8 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Profile Picture</h2>
        <label
          htmlFor="profileImageUpload"
          className="cursor-pointer text-blue-600 hover:text-blue-700 font-normal text-md underline"
        >
          Upload Image
        </label>
        <input
          type="file"
          id="profileImageUpload"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={imagePreview}
            alt={props.previewName || "User"}
            className="w-16 h-16 sm:w-28 sm:h-28 rounded-full object-cover bg-gray-100 border border-gray-300"
          />
        </div>

        {/* Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {props.previewName || "John Doe"}
          </h3>
          <p className="text-base text-gray-600 font-normal">
            {props.previewRole || "User Role"}
          </p>
        </div>
      </div>
    </div>
  );
}

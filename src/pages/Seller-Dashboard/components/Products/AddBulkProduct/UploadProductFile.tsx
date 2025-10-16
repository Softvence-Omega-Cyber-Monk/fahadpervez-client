import type React from "react";
import { Upload } from "lucide-react";
import { useState, useRef } from "react";
import PrimaryButton from "@/common/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function UploadProductFile({
  onFileUpload,
}: {
  onFileUpload: (file: File) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle drag-and-drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
      onFileUpload(file);
    } else {
      alert("Please upload a valid CSV file");
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      navigate("/seller-dashboard/products/bulk-validation"); // fixed
    }
  };

  // Trigger hidden file input
  const handleBrowseFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h2 className="text-dark-blue font-semibold text-xl mb-6">
        Upload Your Product File
      </h2>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Upload className="w-8 h-8 text-light-gray" />
          </div>

          <div>
            <h3 className="mb-1">Drag and drop your file here</h3>
            <p className="p2">or click to browse and select a file</p>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-gray-100 text-light-gray text-xs font-medium rounded">
              Excel (.xlsx)
            </span>
            <span className="px-3 py-1 bg-gray-100 text-light-gray text-xs font-medium rounded">
              CSV (.csv)
            </span>
          </div>

          <p className="p2 ">Maximum file size: 10MB</p>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />

          <PrimaryButton
            type="Primary"
            title="Browse File"
            className="px-10"
            onClick={handleBrowseFile} // triggers hidden input
          />
        </div>
      </div>
    </div>
  );
}

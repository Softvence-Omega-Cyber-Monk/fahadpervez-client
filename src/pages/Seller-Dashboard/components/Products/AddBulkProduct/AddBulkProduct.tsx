import PrimaryButton from "@/common/PrimaryButton";
import { MdOutlineFileDownload } from "react-icons/md";
import BulkUploadHeader from "./BulkUploadHeader";
import UploadProductFile from "./UploadProductFile";

const AddBulkProduct = () => {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <h2>Bulk Product Upload</h2>
          <p className="p2 text-base">
            Upload and manage multiple products at once
          </p>
        </div>
        <PrimaryButton
          type="Outline"
          title="Download Template"
          leftIcon={<MdOutlineFileDownload className="size-6" />}
        />
      </div>
      <BulkUploadHeader />
      <UploadProductFile/>
    </div>
  );
};

export default AddBulkProduct;

import { useUpdateProfileMutation } from "@/Redux/Features/user/user.api";

import { useCallback } from "react";
import { toast } from "sonner";

interface UseUpdateProfileReturn {
  handleUpdate: (data: unknown) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | unknown;
}

const useUpdateProfile = (): UseUpdateProfileReturn => {
  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation();
  const handleUpdate = useCallback(
    async (updateData: unknown) => {
      const toastId = toast.loading("Updating profile...");
      try {
        console.log(updateData,"Update Data")
        const result = await updateProfile(updateData).unwrap();
        console.log("Result",result)
        if (result?.success) {
          toast.success("Profile updated successfully!", { id: toastId });
        } else {
          toast.error("Update failed. Please try again.", { id: toastId });
        }
      } catch (err) {
        toast.error("An unexpected error occurred" + err , { id: toastId });
      }
    },
    [updateProfile]
  );

  return {
    handleUpdate,
    isLoading,
    isSuccess,
    error,
  };
};

export default useUpdateProfile;

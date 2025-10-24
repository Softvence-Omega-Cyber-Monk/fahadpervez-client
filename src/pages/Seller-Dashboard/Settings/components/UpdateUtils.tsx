// import { useUpdateProfileMutation } from "@/Redux/Features/user/user.api";
// import toast from "react-hot-toast";
// import { useCallback } from "react";

// interface UseUpdateProfileReturn {
//   handleUpdate: (data: any) => Promise<void>;
//   isLoading: boolean;
//   isSuccess: boolean;
//   error: any;
// }

// const useUpdateProfile = (): UseUpdateProfileReturn => {
//   const [updateProfile, { isLoading, isSuccess, error }] = useUpdateProfileMutation();

//   const handleUpdate = useCallback(async (updateData: any) => {
//     try {
//       const result = await updateProfile(updateData);
      
//       if ('error' in result) {
//         const errorData = result.error as any;
//         const message = errorData?.data?.message || errorData?.message || 'Update failed';
//         toast.error(message);
//         throw new Error(message);
//       }
      
//       if (result.data?.success) {
//         toast.success("Profile updated successfully!");
//       } else {
//         toast.error("Update failed. Please try again.");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "An unexpected error occurred");
//       throw err;
//     }
//   }, [updateProfile]);

//   return {
//     handleUpdate,
//     isLoading,
//     isSuccess,
//     error
//   };
// };

// export default useUpdateProfile;
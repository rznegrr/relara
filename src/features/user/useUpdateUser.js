import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrUpdateUser } from "@/services/apiAuth";

export default function useUpdateUser() {
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: ({ data, id }) => createOrUpdateUser({ data, id }),
    mutationKey: ["update-user"],
    onSuccess: () => {
        toast.success('User updated successfully');
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage);
      },
  });
  return { updateUser, isPending };
}

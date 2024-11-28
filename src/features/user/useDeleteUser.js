import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "@/services/apiAuth";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteUser,
    isPending,
    isIdle,
  } = useMutation({
    mutationFn: (id) => deleteUserApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });
  return { deleteUser, isPending, isIdle };
};

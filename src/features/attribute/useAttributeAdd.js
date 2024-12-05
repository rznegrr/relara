import { createOrUpdateAttribute } from "@/services/apiAttribute";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAttributeAdd() {
  const { mutate: addAttribute , isPending} = useMutation({
    mutationKey: ["add-attribute"],
    mutationFn: (data) => createOrUpdateAttribute({ data }),
    onSuccess: () => {
      toast.success("Attribute added successfully");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return {addAttribute, isPending}
}
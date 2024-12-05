import { createOrUpdateAttributeValue } from "@/services/apiAttribute";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddAttributeValue() {
 const {mutate: addAttributeValue , isPending} = useMutation({
   mutationKey: ["add-attribute-value"],
   mutationFn: (data) => createOrUpdateAttributeValue({ data }),
   onSuccess: () => {
     toast.success("Attribute value added successfully");
   },
   onError: (error) => {
     const errorMessage =
       error?.response?.data?.message || "An unexpected error occurred";
     toast.error(errorMessage);
   },
 })

 return {addAttributeValue, isPending}
}
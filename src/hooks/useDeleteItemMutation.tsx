import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { Item } from "@/pages/item/data/schema";

export default function useDeleteItemMutation(itemId: string) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<void, unknown>({
  mutationFn: async (): Promise<void> => {
   try {
    await kyInstance.delete(`items/${itemId}`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });

    toast({
     description: "Success to Delete Item",
    });
    return;
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Delete Item",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async () => {
   const queryFilter: QueryFilters = { queryKey: ["items"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Item[]>(["items"], (oldData) => {
    console.log("🚀 ~ onSuccess: ~ oldData:", oldData);
    if (oldData?.length) {
     return oldData.filter((item) => item.id !== itemId);
    } else {
     return [];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to Delete Item",
   });
  },
 });
}

import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { z } from "zod";

import { Item } from "@/pages/item/data/schema";
import { editItemFormSchema } from "@/pages/item/EditItemForm";

export interface UseEditItemResponse {
 data: Item;
}

// Definisikan tipe respons login

export default function useEditItemMutation(itemId: string) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseEditItemResponse,
  unknown,
  z.infer<typeof editItemFormSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof editItemFormSchema>
  ): Promise<UseEditItemResponse> => {
   try {
    const response = await kyInstance.put(`items/${itemId}`, {
     json: {
      ...data,
     },
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseEditItemResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to Edit Item",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Edit Item",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async (newItem) => {
   console.log("🚀 ~ onSuccess: ~ newItem:", newItem);
   const queryFilter: QueryFilters = { queryKey: ["items"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Item[]>(["items"], (oldData) => {
    console.log("🚀 ~ onSuccess: ~ oldData:", oldData);
    if (oldData?.length) {
     return oldData.map((item) => {
      if (item.id === itemId) {
       return newItem.data;
      }
      return item;
     });
    } else {
     return [newItem.data];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to Edit Item",
   });
  },
 });
}

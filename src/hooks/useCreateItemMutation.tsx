import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { z } from "zod";

import { Item } from "@/pages/item/data/schema";
import { createItemFormSchema } from "@/pages/item/CreateItemForm";

export interface UseCreateItemResponse {
 data: Item;
}

// Definisikan tipe respons login

export default function useCreateItemMutation() {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseCreateItemResponse,
  unknown,
  z.infer<typeof createItemFormSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof createItemFormSchema>
  ): Promise<UseCreateItemResponse> => {
   try {
    const response = await kyInstance.post(`items`, {
     json: {
      ...data,
     },
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseCreateItemResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to Create Item",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Create Item",
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
     return [...oldData, newItem.data];
    } else {
     return [newItem.data];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to create Item",
   });
  },
 });
}

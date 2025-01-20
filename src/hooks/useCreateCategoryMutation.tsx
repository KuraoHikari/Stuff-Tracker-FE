import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { z } from "zod";
import { createCategoryFormSchema } from "@/pages/category/CreateCategoryForm";

export interface Category {
 id: string;
 name: string;
 description: string | null;
 userId: string;
 createdAt: string;
 updatedAt: string;
}

export interface UseCreateCategoryResponse {
 data: Category;
}

// Definisikan tipe respons login

export default function useCreateCategoryMutation() {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseCreateCategoryResponse,
  unknown,
  z.infer<typeof createCategoryFormSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof createCategoryFormSchema>
  ): Promise<UseCreateCategoryResponse> => {
   try {
    const response = await kyInstance.post(`categories`, {
     json: {
      name: data.name,
      description: data.description,
     },
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseCreateCategoryResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to Create Category",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Create Category",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async (newCategory) => {
   console.log("🚀 ~ onSuccess: ~ newCategory:", newCategory);
   const queryFilter: QueryFilters = { queryKey: ["categories"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Category[]>(["categories"], (oldData) => {
    console.log("🚀 ~ onSuccess: ~ oldData:", oldData);
    if (oldData?.length) {
     return [...oldData, newCategory.data];
    } else {
     return [newCategory.data];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to create Category",
   });
  },
 });
}

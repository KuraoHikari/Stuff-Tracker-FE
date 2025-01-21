import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { z } from "zod";
import { editCategoryFormSchema } from "@/pages/category/EditCategoryForm";

export interface Category {
 id: string;
 name: string;
 description: string | null;
 userId: string;
 createdAt: string;
 updatedAt: string;
}

export interface UseEditCategoryResponse {
 data: Category;
}

// Definisikan tipe respons login

export default function useEditCategoryMutation(categoryId: string) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseEditCategoryResponse,
  unknown,
  z.infer<typeof editCategoryFormSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof editCategoryFormSchema>
  ): Promise<UseEditCategoryResponse> => {
   try {
    const response = await kyInstance.put(`categories/${categoryId}`, {
     json: {
      ...data,
     },
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseEditCategoryResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to Edit Category",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Edit Category",
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
     return oldData.map((category) => {
      if (category.id === categoryId) {
       return newCategory.data;
      }
      return category;
     });
    } else {
     return [newCategory.data];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to Edit Category",
   });
  },
 });
}

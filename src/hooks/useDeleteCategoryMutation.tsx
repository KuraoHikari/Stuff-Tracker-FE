import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";

export interface Category {
 id: string;
 name: string;
 description: string | null;
 userId: string;
 createdAt: string;
 updatedAt: string;
}

export default function useDeleteCategoryMutation(categoryId: string) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<void, unknown>({
  mutationFn: async (): Promise<void> => {
   try {
    await kyInstance.delete(`categories/${categoryId}`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });

    toast({
     description: "Success to Delete Category",
    });
    return;
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Delete Category",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async () => {
   const queryFilter: QueryFilters = { queryKey: ["categories"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Category[]>(["categories"], (oldData) => {
    console.log("🚀 ~ onSuccess: ~ oldData:", oldData);
    if (oldData?.length) {
     return oldData.filter((category) => category.id !== categoryId);
    } else {
     return [];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to Delete Category",
   });
  },
 });
}

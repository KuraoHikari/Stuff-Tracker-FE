import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { Condition } from "@/pages/condition/data/schema";

export default function useDeleteConditionMutation(conditionId: string) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<void, unknown>({
  mutationFn: async (): Promise<void> => {
   try {
    await kyInstance.delete(`conditions/${conditionId}`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });

    toast({
     description: "Success to Delete Condition",
    });
    return;
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Delete Condition",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async () => {
   const queryFilter: QueryFilters = { queryKey: ["conditions"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Condition[]>(["conditions"], (oldData) => {
    if (oldData?.length) {
     return oldData.filter((condition) => condition.id !== conditionId);
    } else {
     return [];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to Delete Condition",
   });
  },
 });
}

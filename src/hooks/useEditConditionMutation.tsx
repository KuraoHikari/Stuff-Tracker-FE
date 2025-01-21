import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { z } from "zod";
import { editConditionFormSchema } from "@/pages/condition/EditConditionForm";
import { Condition } from "@/pages/condition/data/schema";

export interface UseEditConditionResponse {
 data: Condition;
}

// Definisikan tipe respons login

export default function useEditConditionMutation(conditionId: string) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseEditConditionResponse,
  unknown,
  z.infer<typeof editConditionFormSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof editConditionFormSchema>
  ): Promise<UseEditConditionResponse> => {
   try {
    const response = await kyInstance.put(`conditions/${conditionId}`, {
     json: {
      ...data,
     },
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseEditConditionResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to Edit Condition",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Edit Condition",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async (newCondition) => {
   console.log("🚀 ~ onSuccess: ~ newCondition:", newCondition);
   const queryFilter: QueryFilters = { queryKey: ["conditions"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Condition[]>(["conditions"], (oldData) => {
    console.log("🚀 ~ onSuccess: ~ oldData:", oldData);
    if (oldData?.length) {
     return oldData.map((condition) => {
      if (condition.id === conditionId) {
       return newCondition.data;
      }
      return condition;
     });
    } else {
     return [newCondition.data];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to Edit Condition",
   });
  },
 });
}

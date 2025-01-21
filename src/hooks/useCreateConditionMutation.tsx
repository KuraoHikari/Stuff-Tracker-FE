import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { z } from "zod";
import { createConditionFormSchema } from "@/pages/condition/CreateConditionForm";
import { Condition } from "@/pages/condition/data/schema";

export interface UseCreateConditionResponse {
 data: Condition;
}

// Definisikan tipe respons login

export default function useCreateConditionMutation() {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseCreateConditionResponse,
  unknown,
  z.infer<typeof createConditionFormSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof createConditionFormSchema>
  ): Promise<UseCreateConditionResponse> => {
   try {
    const response = await kyInstance.post(`conditions`, {
     json: {
      name: data.name,
      description: data.description,
     },
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseCreateConditionResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to Create Condition",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Create Condition",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async (newCondition) => {
   const queryFilter: QueryFilters = { queryKey: ["conditions"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Condition[]>(["conditions"], (oldData) => {
    if (oldData?.length) {
     return [...oldData, newCondition.data];
    } else {
     return [newCondition.data];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to Create Condition",
   });
  },
 });
}

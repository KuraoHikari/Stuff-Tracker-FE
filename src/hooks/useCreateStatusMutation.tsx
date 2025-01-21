import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { z } from "zod";
import { createStatusFormSchema } from "@/pages/status/CreateStatusForm";
import { Status } from "@/pages/status/data/schema";

export interface UseCreateStatusResponse {
 data: Status;
}

// Definisikan tipe respons login

export default function useCreateStatusMutation() {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseCreateStatusResponse,
  unknown,
  z.infer<typeof createStatusFormSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof createStatusFormSchema>
  ): Promise<UseCreateStatusResponse> => {
   try {
    const response = await kyInstance.post(`status`, {
     json: {
      name: data.name,
      description: data.description,
     },
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseCreateStatusResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to Create Status",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Create Status",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async (newStatus) => {
   console.log("🚀 ~ onSuccess: ~ newStatus:", newStatus);
   const queryFilter: QueryFilters = { queryKey: ["statuses"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Status[]>(["statuses"], (oldData) => {
    console.log("🚀 ~ onSuccess: ~ oldData:", oldData);
    if (oldData?.length) {
     return [...oldData, newStatus.data];
    } else {
     return [newStatus.data];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to create Status",
   });
  },
 });
}

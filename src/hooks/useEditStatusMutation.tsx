import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { z } from "zod";
import { editStatusFormSchema } from "@/pages/status/EditStatusForm";
import { Status } from "@/pages/status/data/schema";

export interface UseEditStatusResponse {
 data: Status;
}

// Definisikan tipe respons login

export default function useEditStatusMutation(statusId: string) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseEditStatusResponse,
  unknown,
  z.infer<typeof editStatusFormSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof editStatusFormSchema>
  ): Promise<UseEditStatusResponse> => {
   try {
    const response = await kyInstance.put(`status/${statusId}`, {
     json: {
      ...data,
     },
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseEditStatusResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to Edit Status",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Edit Status",
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
     return oldData.map((status) => {
      if (status.id === statusId) {
       return newStatus.data;
      }
      return status;
     });
    } else {
     return [newStatus.data];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to Edit Status",
   });
  },
 });
}

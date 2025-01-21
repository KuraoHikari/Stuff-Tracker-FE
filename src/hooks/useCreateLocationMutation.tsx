import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { z } from "zod";
import { createLocationFormSchema } from "@/pages/location/CreateLocationForm";
import { Location } from "@/pages/location/data/schema";

export interface UseCreateLocationResponse {
 data: Location;
}

// Definisikan tipe respons login

export default function useCreateLocationMutation() {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseCreateLocationResponse,
  unknown,
  z.infer<typeof createLocationFormSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof createLocationFormSchema>
  ): Promise<UseCreateLocationResponse> => {
   try {
    const response = await kyInstance.post(`locations`, {
     json: {
      ...data,
     },
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseCreateLocationResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to Create Location",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Create Location",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async (newLocation) => {
   const queryFilter: QueryFilters = { queryKey: ["locations"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Location[]>(["locations"], (oldData) => {
    if (oldData?.length) {
     return [...oldData, newLocation.data];
    } else {
     return [newLocation.data];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to create Location",
   });
  },
 });
}

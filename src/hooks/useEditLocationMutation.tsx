import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { z } from "zod";
import { editLocationFormSchema } from "@/pages/location/EditLocationForm";
import { Location } from "@/pages/location/data/schema";
// import { Location } from "@/pages/location/data/schema";

export interface UseEditLocationResponse {
 data: Location;
}

// Definisikan tipe respons login

export default function useEditLocationMutation(locationId: string) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseEditLocationResponse,
  unknown,
  z.infer<typeof editLocationFormSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof editLocationFormSchema>
  ): Promise<UseEditLocationResponse> => {
   try {
    const response = await kyInstance.put(`locations/${locationId}`, {
     json: {
      ...data,
     },
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseEditLocationResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to Edit Location",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Edit Location",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async (newLocation) => {
   console.log("🚀 ~ onSuccess: ~ newLocation:", newLocation);
   const queryFilter: QueryFilters = { queryKey: ["locations"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Location[]>(["locations"], (oldData) => {
    console.log("🚀 ~ onSuccess: ~ oldData:", oldData);
    if (oldData?.length) {
     return oldData.map((location) => {
      if (location.id === locationId) {
       return newLocation.data;
      }
      return location;
     });
    } else {
     return [newLocation.data];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to Edit Location",
   });
  },
 });
}

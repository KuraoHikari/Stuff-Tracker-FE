import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { Location } from "@/pages/location/data/schema";

export default function useDeleteLocationMutation(locationId: string) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<void, unknown>({
  mutationFn: async (): Promise<void> => {
   try {
    await kyInstance.delete(`locations/${locationId}`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });

    toast({
     description: "Success to Delete Location",
    });
    return;
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Delete Location",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async () => {
   const queryFilter: QueryFilters = { queryKey: ["locations"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Location[]>(["locations"], (oldData) => {
    console.log("🚀 ~ onSuccess: ~ oldData:", oldData);
    if (oldData?.length) {
     return oldData.filter((location) => location.id !== locationId);
    } else {
     return [];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to Delete Location",
   });
  },
 });
}

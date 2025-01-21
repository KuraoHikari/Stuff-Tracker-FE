import kyInstance, { isHTTPError } from "@/lib/ky";
import {
 QueryFilters,
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { Status } from "@/pages/status/data/schema";

export default function useDeleteStatusMutation(statusId: string) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<void, unknown>({
  mutationFn: async (): Promise<void> => {
   try {
    await kyInstance.delete(`status/${statusId}`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });

    toast({
     description: "Success to Delete Status",
    });
    return;
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Delete Status",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: async () => {
   const queryFilter: QueryFilters = { queryKey: ["statuses"] };
   await queryClient.cancelQueries(queryFilter);
   queryClient.setQueryData<Status[]>(["statuses"], (oldData) => {
    console.log("🚀 ~ onSuccess: ~ oldData:", oldData);
    if (oldData?.length) {
     return oldData.filter((status) => status.id !== statusId);
    } else {
     return [];
    }
   });
  },

  onError(error) {
   console.log("🚀 ~ onError ~ error:", error);
   toast({
    description: "Failed to Delete Status",
   });
  },
 });
}

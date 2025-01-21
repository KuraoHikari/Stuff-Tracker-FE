import kyInstance from "@/lib/ky";
import { Item } from "@/pages/item/data/schema";
import { useQuery } from "@tanstack/react-query";

export interface UseGetItemDetailResponse {
 data: Item;
}

export default function useGetItemDetail(itemId: string) {
 return useQuery({
  queryKey: [itemId],
  queryFn: () =>
   kyInstance
    .get(`items/${itemId}`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    })
    .json<UseGetItemDetailResponse>()
    .then((response) => response.data),
  staleTime: Infinity,
 });
}

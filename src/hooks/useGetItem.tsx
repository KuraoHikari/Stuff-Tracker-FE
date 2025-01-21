import kyInstance from "@/lib/ky";
import { Item } from "@/pages/item/data/schema";
import { useQuery } from "@tanstack/react-query";

export interface UseGetItemResponse {
 data: {
  items: Item[];
 };
}

export default function useGetItem() {
 return useQuery({
  queryKey: ["items"],
  queryFn: () =>
   kyInstance
    .get(`items`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    })
    .json<UseGetItemResponse>()
    .then((response) => response.data.items),
  staleTime: Infinity,
 });
}

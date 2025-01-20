import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";

export interface Category {
 id: string;
 name: string;
 description: string | null;
 userId: string;
 createdAt: string;
 updatedAt: string;
}

export interface UseGetCategoriesResponse {
 data: {
  categories: Category[];
 };
}

export default function useGetCategories() {
 return useQuery({
  queryKey: ["categories"],
  queryFn: () =>
   kyInstance
    .get(`categories`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    })
    .json<UseGetCategoriesResponse>()
    .then((response) => response.data.categories),
  staleTime: Infinity,
 });
}

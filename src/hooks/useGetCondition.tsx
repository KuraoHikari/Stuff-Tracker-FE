import kyInstance from "@/lib/ky";
import { Condition } from "@/pages/condition/data/schema";
import { useQuery } from "@tanstack/react-query";

export interface UseGetConditionResponse {
 data: {
  conditions: Condition[];
 };
}

export default function useGetCondition() {
 return useQuery({
  queryKey: ["conditions"],
  queryFn: () =>
   kyInstance
    .get(`conditions`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    })
    .json<UseGetConditionResponse>()
    .then((response) => response.data.conditions),
  staleTime: Infinity,
 });
}

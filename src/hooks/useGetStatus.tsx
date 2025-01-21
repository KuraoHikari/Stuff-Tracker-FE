import kyInstance from "@/lib/ky";
import { Status } from "@/pages/status/data/schema";
import { useQuery } from "@tanstack/react-query";

export interface UseGetStatusResponse {
 data: {
  statuses: Status[];
 };
}

export default function useGetStatus() {
 return useQuery({
  queryKey: ["statuses"],
  queryFn: () =>
   kyInstance
    .get(`status`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    })
    .json<UseGetStatusResponse>()
    .then((response) => response.data.statuses),
  staleTime: Infinity,
 });
}

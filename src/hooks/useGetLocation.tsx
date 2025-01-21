import kyInstance from "@/lib/ky";
import { Location } from "@/pages/location/data/schema";

import { useQuery } from "@tanstack/react-query";

export interface UseGetLocationResponse {
 data: {
  locations: Location[];
 };
}

export default function useGetLocation() {
 return useQuery({
  queryKey: ["locations"],
  queryFn: () =>
   kyInstance
    .get(`locations`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    })
    .json<UseGetLocationResponse>()
    .then((response) => response.data.locations),
  staleTime: Infinity,
 });
}

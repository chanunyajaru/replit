import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

type DashboardStatsInput = z.infer<NonNullable<typeof api.dashboard.getStats.input>>;

export function useDashboardStats(filters?: DashboardStatsInput) {
  // Create a query key that includes filter values to trigger refetch on change
  const queryKey = [api.dashboard.getStats.path, filters];

  return useQuery({
    queryKey,
    queryFn: async () => {
      // Build URL with query parameters if filters exist
      const url = filters 
        ? `${api.dashboard.getStats.path}?${new URLSearchParams(filters as Record<string, string>).toString()}`
        : api.dashboard.getStats.path;
        
      const res = await fetch(url, { credentials: "include" });
      
      if (!res.ok) {
        throw new Error("Failed to fetch dashboard stats");
      }
      
      return api.dashboard.getStats.responses[200].parse(await res.json());
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

import { useMutation } from "@tanstack/react-query";
import { api, type InsertResponse } from "@shared/routes";

export function useCreateResponse() {
  return useMutation({
    mutationFn: async (data: InsertResponse) => {
      const res = await fetch(api.response.create.path, {
        method: api.response.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error("Failed to submit response");
      }
      
      return api.response.create.responses[201].parse(await res.json());
    },
  });
}

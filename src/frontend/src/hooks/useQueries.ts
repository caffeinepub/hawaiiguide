import { useQuery } from "@tanstack/react-query";
import type { Island } from "../backend";
import { useActor } from "./useActor";

export function useAllIslands() {
  const { actor, isFetching } = useActor();

  return useQuery<Island[]>({
    queryKey: ["islands"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllIslands();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useIslandByName(name: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Island>({
    queryKey: ["island", name],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getIslandByName(name);
    },
    enabled: !!actor && !isFetching && !!name,
    staleTime: 1000 * 60 * 5,
  });
}

import { useQuery } from "@tanstack/react-query";
import HealthService from "./services/health-service";
import { useHealthStore } from "../router/use-health-store";

export function useCheckHealth() {
  const { setHealthy, setInit } = useHealthStore();
  return useQuery({
    queryKey: ["healths"],
    queryFn: async () => {
      await HealthService.checkApiHealth()
        .then(() => {
          setHealthy(true);
          setInit(true);
        })
        .catch(() => {
          setHealthy(false);
          setInit(true);
        });
      return 1;
    },
    refetchInterval: 10000,
    throwOnError: false,
  });
}

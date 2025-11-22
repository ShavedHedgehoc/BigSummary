import { useQuery } from "@tanstack/react-query";
import ConveyorService from "./services/conveyor-service";

export const useConveyors = () => {
  return useQuery({
    queryKey: ["conveyors"],
    queryFn: async () => {
      const data = await ConveyorService.getAllConveyors();
      return data;
    },
  });
};

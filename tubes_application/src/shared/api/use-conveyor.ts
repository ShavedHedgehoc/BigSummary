import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { useExtrusionConveyorStore } from "@/modules/extrusion/store/use-extrusion-conveyor-store";
import ConveyorService from "./services/conveyor-service";

export const useConveyor = (name: string | null) => {
  const setConveyor = useExtrusionConveyorStore(useShallow((state) => state.setExtrusionConveyor));
  const clearConveyor = useExtrusionConveyorStore(useShallow((state) => state.clearExtrusionConveyor));
  return useQuery({
    queryKey: ["conveyor"],
    queryFn: async () => {
      const data = await ConveyorService.getConveyorByName(name);
      if (data) {
        setConveyor(data);
      } else {
        clearConveyor();
      }
      return data;
    },
    enabled: !!name,
  });
};

import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { useExtrusionConveyorStore } from "@/modules/extrusion/store/use-extrusion-conveyor-store";
import ConveyorService from "./services/conveyor-service";
import { useOffsetConveyorStore } from "@/modules/offset/store/use-offset-conveyor-store";

export const useConveyor = (name: string | null) => {
  const setExtrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.setExtrusionConveyor));
  const setOffsetConveyor = useOffsetConveyorStore(useShallow((state) => state.setOffsetConveyor));
  const clearExtrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.clearExtrusionConveyor));
  const clearOffsetConveyor = useOffsetConveyorStore(useShallow((state) => state.clearOffsetConveyor));
  return useQuery({
    queryKey: ["conveyor"],
    queryFn: async () => {
      const data = await ConveyorService.getConveyorByName(name);
      if (data) {
        setExtrusionConveyor(data);
        setOffsetConveyor(data);
      } else {
        clearExtrusionConveyor();
        clearOffsetConveyor();
      }
      return data;
    },
    enabled: !!name,
  });
};

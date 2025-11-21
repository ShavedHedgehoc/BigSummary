import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { useExtrusionConveyorStore } from "@/modules/extrusion/store/use-extrusion-conveyor-store";
import ConveyorService from "./services/conveyor-service";
import { useOffsetConveyorStore } from "@/modules/offset/store/use-offset-conveyor-store";
import { useVarnishConveyorStore } from "@/modules/varnish/store/use-varnish-conveyor-store";
import { useSealantConveyorStore } from "@/modules/sealant/store/use-sealant-conveyor-store";

export const useConveyor = (name: string | null) => {
  const setExtrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.setExtrusionConveyor));
  const setVarnishConveyor = useVarnishConveyorStore(useShallow((state) => state.setVarnishConveyor));
  const setOffsetConveyor = useOffsetConveyorStore(useShallow((state) => state.setOffsetConveyor));
  const setSealantConveyor = useSealantConveyorStore(useShallow((state) => state.setSealantConveyor));
  const clearExtrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.clearExtrusionConveyor));
  const clearVarnishConveyor = useVarnishConveyorStore(useShallow((state) => state.clearVarnishConveyor));
  const clearOffsetConveyor = useOffsetConveyorStore(useShallow((state) => state.clearOffsetConveyor));
  const clearSealantConveyor = useSealantConveyorStore(useShallow((state) => state.clearSealantConveyor));
  return useQuery({
    queryKey: ["conveyor"],
    queryFn: async () => {
      const data = await ConveyorService.getConveyorByName(name);
      if (data) {
        setExtrusionConveyor(data);
        setVarnishConveyor(data);
        setOffsetConveyor(data);
        setSealantConveyor(data);
      } else {
        clearExtrusionConveyor();
        clearVarnishConveyor();
        clearOffsetConveyor();
        clearSealantConveyor();
      }
      return data;
    },
    enabled: !!name,
  });
};

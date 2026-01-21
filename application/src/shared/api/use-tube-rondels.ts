import { useQuery } from "@tanstack/react-query";

import { useTubeExtrusionTresholdsStore } from "../../modules/tube-tresholds/add-modal/store/use-tube-extrusion-tresholds-store";
import TubeRondelService from "./services/tube-rondel-service";

export const useTubeRondels = () => {
  const { fillRondelSelectorOptions } = useTubeExtrusionTresholdsStore();

  return useQuery({
    queryKey: ["tube_rondels"],
    queryFn: async () => {
      const data = await TubeRondelService.getRondels();
      if (data) {
        fillRondelSelectorOptions(data.rondels);
      }
      return data;
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { useTubeTresholdsFilterStore } from "../../modules/tube-tresholds/store/use-tube-tresholds-filter-store";
import TubeConveyorsService from "./services/tube-conveyors-service";
import { useTubeExtrusionTresholdsStore } from "../../modules/tube-tresholds/add-modal/store/use-tube-extrusion-tresholds-store";
import { useTubeVarnishTresholdsStore } from "../../modules/tube-tresholds/add-modal/store/use-tube-varnish-tresholds-store";
import { useTubeOffsetTresholdsStore } from "../../modules/tube-tresholds/add-modal/store/use-tube-offset-tresholds-store";
import { useTubeSealantTresholdsStore } from "../../modules/tube-tresholds/add-modal/store/use-tube-sealant-tresholds-store";
import { useTubeRecordsListFilterStore } from "../../modules/tube-records-list/store/use-tube-records-list-filter-store";

export const useTubeConveyors = () => {
  const { fillConveyorSelectorOptions: fillTresholdsFilter } = useTubeTresholdsFilterStore();
  const { fillConveyorSelectorOptions: fillTubeRecordsListFilter } = useTubeRecordsListFilterStore();
  const { fillConveyorSelectorOptions: fillExtrusionTresholdsConveyors } = useTubeExtrusionTresholdsStore();
  const { fillConveyorSelectorOptions: fillVarnishTresholdsConveyors } = useTubeVarnishTresholdsStore();
  const { fillConveyorSelectorOptions: fillOffsetTresholdsConveyors } = useTubeOffsetTresholdsStore();
  const { fillConveyorSelectorOptions: fillSealantTresholdsConveyors } = useTubeSealantTresholdsStore();

  return useQuery({
    queryKey: ["tube_conveyors"],
    queryFn: async () => {
      const data = await TubeConveyorsService.getConveyors();
      if (data) {
        fillTresholdsFilter(data);
        fillTubeRecordsListFilter(data);
        fillExtrusionTresholdsConveyors(data);
        fillVarnishTresholdsConveyors(data);
        fillOffsetTresholdsConveyors(data);
        fillSealantTresholdsConveyors(data);
      }
      return data;
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import PlantService from "../../services/PlantService";
import { useBoilsFilterStore } from "../boils/store/use-boils-filter-store";
import { BoilsFilterParams } from "../boils/boils-filter-params";
const { changeFilter, setSelectedPlant, fillPlantSelectorOptions } = useBoilsFilterStore();
export const usePlantsOptions = () =>
  useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const data = await PlantService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        setSelectedPlant(data[1].id);
        changeFilter({ key: BoilsFilterParams.PLANTS, value: "", values: [data[1].id] });
      }
    },
  });

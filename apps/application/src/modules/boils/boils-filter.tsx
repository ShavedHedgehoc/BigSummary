import PageFilterLayout from "../../shared/layouts/page-filter-layout";
import BoilsFilterPlantSelector from "./boils-filter-plant-selector";
import BoilsFilterStateSelector from "./boils-filter-state-selector";
import BoilsFilterBatchInput from "./boils-filter-batch-input";
import BoilsFilterMarkingInput from "./boils-filter-marking-input";
import BoilsFilterCodeInput from "./boils-filter-code-input";
import BoilsFilterClearButton from "./boils-filter-clear-button";
import { useAuthStore } from "../auth/store/auth-store";
import { useShallow } from "zustand/react/shallow";
import { useBoilsFilterStore } from "./store/use-boils-filter-store";
import { BoilsFilterParams } from "./boils-filter-params";

export default function BoilsFilter() {
  const user = useAuthStore(useShallow((state) => state.user));
  const changeFilter = useBoilsFilterStore(useShallow((state) => state.changeFilter));
  const plantSelectorOptions = useBoilsFilterStore(useShallow((state) => state.plantSelectorOptions));
  const setSelectedPlant = useBoilsFilterStore(useShallow((state) => state.setSelectedPlant));
  const plant_id = user?.settings?.plant_id || plantSelectorOptions[0].id;
  setSelectedPlant(plant_id);
  changeFilter({ key: BoilsFilterParams.PLANTS, value: "", values: plant_id === 999999 ? [] : [plant_id] });
  changeFilter({ key: BoilsFilterParams.STATES, value: "", values: [1] });
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <BoilsFilterBatchInput />
        <BoilsFilterMarkingInput />
        <BoilsFilterCodeInput />
        <BoilsFilterStateSelector />
        <BoilsFilterPlantSelector />
      </PageFilterLayout.Left>
      <BoilsFilterClearButton />
    </PageFilterLayout>
  );
}

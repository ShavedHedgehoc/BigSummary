import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import ForemanFilterCodeInput from "./foreman-filter-code-input";
import ForemanFilterClearButton from "./foreman-filter-clear-button";
import ForemanFilterPlantSelector from "./foreman-filter-plant-selector";
import ForemanFilterBatchInput from "./foreman-filter-batch-input";
import ForemanFilterMarkingInput from "./foreman-filter-marking-input";
import ForemanFilterStateSelector from "./foreman-filter-state-selector";
import ForemanFilterConveyorInput from "./foreman-filter-conveyor-input";
import MobileForemanFilter from "../foreman-mobile-filter";
import { useAuthStore } from "../../auth/store/auth-store";
import { useShallow } from "zustand/react/shallow";
import { useForemanFilterStore } from "../store/use-foreman-filter-store";
import { ForemanFilterParams } from "./foreman-filter-params";

export default function ForemanFilter() {
  const user = useAuthStore(useShallow((state) => state.user));
  const changeFilter = useForemanFilterStore(useShallow((state) => state.changeFilter));
  const plantSelectorOptions = useForemanFilterStore(useShallow((state) => state.plantSelectorOptions));
  const setSelectedPlant = useForemanFilterStore(useShallow((state) => state.setSelectedPlant));
  const plant_id = user?.settings?.plant_id || plantSelectorOptions[0].id;
  setSelectedPlant(plant_id);
  changeFilter({ key: ForemanFilterParams.PLANT, value: "", values: [plant_id] });
  return (
    <>
      <MobileForemanFilter />
      <PageFilterLayout>
        <PageFilterLayout.Left>
          <ForemanFilterCodeInput />
          <ForemanFilterMarkingInput />
          <ForemanFilterBatchInput />
          <ForemanFilterConveyorInput />
          <ForemanFilterStateSelector />
          <ForemanFilterPlantSelector />
        </PageFilterLayout.Left>
        <PageFilterLayout.Right>
          <ForemanFilterClearButton />
        </PageFilterLayout.Right>
      </PageFilterLayout>
    </>
  );
}

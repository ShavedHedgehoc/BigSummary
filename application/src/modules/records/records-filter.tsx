import PageFilterLayout from "../../shared/layouts/page-filter-layout";
import RecordsFilterCodeInput from "./records-filter-code-input";
import RecordsFilterMarkingInput from "./records-filter-marking-input";
import RecordsFilterBatchInput from "./records-filter-batch-input";
import RecordsFilterPlantSelector from "./records-filter-plant-selector";
import RecordsFilterStateSelector from "./records-filter-state-selector";
import RecordsFilterClearButton from "./records-filter-clear-button";
import RecordsFilterConveyorInput from "./record-filter-conveyor-input";
import { useAuthStore } from "../auth/store/auth-store";
import { useShallow } from "zustand/react/shallow";
import { useRecordsFilterStore } from "./store/use-record-filter-store";
import { RecordsFilterParams } from "./records-filter-params";

export default function RecordsFilter() {
  const user = useAuthStore(useShallow((state) => state.user));
  const changeFilter = useRecordsFilterStore(useShallow((state) => state.changeFilter));
  const plantSelectorOptions = useRecordsFilterStore(useShallow((state) => state.plantSelectorOptions));
  const setSelectedPlant = useRecordsFilterStore(useShallow((state) => state.setSelectedPlant));
  const plant_id = user?.settings?.plant_id || plantSelectorOptions[0].id;
  setSelectedPlant(plant_id);
  changeFilter({ key: RecordsFilterParams.PLANT, value: "", values: [plant_id] });
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <RecordsFilterCodeInput />
        <RecordsFilterMarkingInput />
        <RecordsFilterBatchInput />
        <RecordsFilterStateSelector />
        <RecordsFilterConveyorInput />
        <RecordsFilterPlantSelector />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <RecordsFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

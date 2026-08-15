import { useShallow } from "zustand/react/shallow";
import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import { useAuthStore } from "../../auth/store/auth-store";
import TimeReportFilterBatchInput from "./time-report-filter-batch-input";
import TimeReportFilterClearButton from "./time-report-filter-clear-button";
import TimeReportFilterCodeInput from "./time-report-filter-code-input";
import TimeReportFilterConveyorInput from "./time-report-filter-conveyor-input";
import TimeReportFilterDateInput from "./time-report-filter-date-selector";
import TimeReportFilterMarkingInput from "./time-report-filter-marking-input";
import TimeReportFilterPlantSelector from "./time-report-filter-plant-selector";
import TimeReportToXLSXButton from "./time-report-to-xlsx-button";
import { useTimeReportFilterStore } from "../store/use-time-report-filter-store";
import { TimeReportFilterParams } from "./time-report-filter-params";

export default function TimeReportFilter() {
  const changeFilter = useTimeReportFilterStore(useShallow((state) => state.changeFilter));

  const setSelectedPlant = useTimeReportFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useTimeReportFilterStore(useShallow((state) => state.plantSelectorOptions));
  const user = useAuthStore(useShallow((state) => state.user));
  if (user) {
    const plant_id = user?.settings?.plant_id || plantSelectorOptions[0].id;
    setSelectedPlant(plant_id);
    changeFilter({ key: TimeReportFilterParams.PLANT, value: "", values: [plant_id] });
  }
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <TimeReportFilterDateInput />
        <TimeReportFilterPlantSelector />
        <TimeReportFilterBatchInput />
        <TimeReportFilterCodeInput />
        <TimeReportFilterMarkingInput />
        <TimeReportFilterConveyorInput />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <TimeReportToXLSXButton />
        <TimeReportFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import TraceBatchsFilterClearButton from "./trace-batch-filter-clear-button";
import TraceBatchsFilterMarkingInput from "./trace-batch-filter-marking-input";
import TraceBatchsFilterTodayButton from "./trace-batch-filter-today-button";
import TraceBatchsFilterTomorrowButton from "./trace-batch-filter-tomorrow-button";
import TraceBatchsFilterBatchInput from "./trace-batchs-filter-batch-input";
import TraceBatchsFilterEndDateInput from "./trace-batchs-filter-end-date-input";
import TraceBatchsFilterPlantSelector from "./trace-batchs-filter-plant-selector";
import TraceBatchsFilterStartDateInput from "./trace-batchs-filter-start-date-input";

export default function TraceBatchsFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <TraceBatchsFilterBatchInput />
        <TraceBatchsFilterMarkingInput />
        <TraceBatchsFilterStartDateInput />
        <TraceBatchsFilterEndDateInput />
        <TraceBatchsFilterPlantSelector />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <TraceBatchsFilterTodayButton />
        <TraceBatchsFilterTomorrowButton />
        <TraceBatchsFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import TraceBatchWeightingsSummaryFilterClearButton from "./trace-batch-weightings-summary-filter-clear-button";
import TraceBatchWeightingsSummaryFilterEndDateInput from "./trace-batch-weightings-summary-filter-end-date-input";
import TraceBatchWeightingsSummaryFilterNameInput from "./trace-batch-weightings-summary-filter-name-input";
import TraceBatchWeightingsSummaryFilterPlantSelector from "./trace-batch-weightings-summary-filter-plant-selector";
import TraceBatchWeightingsSummaryFilterStartDateInput from "./trace-batch-weightings-summary-filter-start-date-input";
import TraceBatchWeightingsSummaryFilterToXLSXButton from "./trace-batch-weightings-summary-filter-to-xlsx-button";
import TraceBatchWeightingsFilterTodayButton from "./trace-batch-weightings-summary-filter-today-button";

export default function TraceBatchsWeightingsSummaryFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <TraceBatchWeightingsSummaryFilterStartDateInput />
        <TraceBatchWeightingsSummaryFilterEndDateInput />
        <TraceBatchWeightingsSummaryFilterPlantSelector />
        <TraceBatchWeightingsSummaryFilterNameInput />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <TraceBatchWeightingsSummaryFilterToXLSXButton />
        <TraceBatchWeightingsFilterTodayButton />
        <TraceBatchWeightingsSummaryFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import TraceBatchWghtReportFilterClearButton from "./trace-batch-wght-report-filter-clear-button";
import TraceBatchWghtReportFilterBatchInput from "./trace-batch-wght-report-filter-batch-input";
import TraceBatchWghtReportFilterPlantSelector from "./trace-batch-wght-report-filter-plant-selector";
import TraceBatchWghtReportFilterStartDateInput from "./trace-batch-wght-report-filter-date-input";
import TraceBatchWghtReportFilterProductIdInput from "./trace-batch-wght-report-filter-product-id-input";
import TraceBatchWghtReportCompareSwitch from "./trace-batch-wght-report-compare-switch";
import TraceBatchWghtReportFilterTodayButton from "./trace-batch-wght-report-today-button";
import TraceBatchWghtReportFilterTomorrowButton from "./trace-batch-wght-report-tomorrow-button";
import TraceBatchWghtReportFilterSortByBatchSwitch from "./trace-batch-wght-report-sort-by-batch-switch";

export default function TraceBatchWghtReportFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <TraceBatchWghtReportFilterStartDateInput />
        <TraceBatchWghtReportFilterPlantSelector />
        <TraceBatchWghtReportFilterBatchInput />
        <TraceBatchWghtReportFilterProductIdInput />
        <TraceBatchWghtReportCompareSwitch />
        <TraceBatchWghtReportFilterSortByBatchSwitch />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <TraceBatchWghtReportFilterTodayButton />
        <TraceBatchWghtReportFilterTomorrowButton />
        <TraceBatchWghtReportFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

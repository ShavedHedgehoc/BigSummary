import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import TraceBatchWghtReportFilterClearButton from "./trace-batch-wght-report-filter-clear-button";
import TraceBatchWghtReportFilterBatchInput from "./trace-batch-wght-report-filter-batch-input";
import TraceBatchWghtReportFilterPlantSelector from "./trace-batch-wght-report-filter-plant-selector";
import TraceBatchWghtReportFilterStartDateInput from "./trace-batch-wght-report-filter-start-date-input";
import TraceBatchWghtReportFilterProductIdInput from "./trace-batch-wght-report-filter-product-id-input";
import TraceBatchWghtReportCompareSwitch from "./trace-batch-wght-report-compare-switch";
import TraceBatchWghtReportFilterTodayButton from "./trace-batch-wght-report-today-button";
import TraceBatchWghtReportFilterTomorrowButton from "./trace-batch-wght-report-tomorrow-button";
import TraceBatchWghtReportFilterSortByBatchSwitch from "./trace-batch-wght-report-sort-by-batch-switch";
import TraceBatchWghtReportFilterEndDateInput from "./trace-batch-wght-report-filter-end-date-input";
import TraceBatchWghtReportFilterToXlsxButton from "./trace-batch-wght-report-filter-to-xlsx-button";

export default function TraceBatchWghtReportFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <TraceBatchWghtReportFilterStartDateInput />
        <TraceBatchWghtReportFilterEndDateInput />
        <TraceBatchWghtReportFilterPlantSelector />
        <TraceBatchWghtReportFilterBatchInput />
        <TraceBatchWghtReportFilterProductIdInput />
        <TraceBatchWghtReportCompareSwitch />
        <TraceBatchWghtReportFilterSortByBatchSwitch />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <TraceBatchWghtReportFilterToXlsxButton />
        <TraceBatchWghtReportFilterTodayButton />
        <TraceBatchWghtReportFilterTomorrowButton />
        <TraceBatchWghtReportFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

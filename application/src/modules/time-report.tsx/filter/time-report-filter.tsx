import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import TimeReportFilterBatchInput from "./time-report-filter-batch-input";
import TimeReportFilterClearButton from "./time-report-filter-clear-button";
import TimeReportFilterCodeInput from "./time-report-filter-code-input";
import TimeReportFilterConveyorInput from "./time-report-filter-conveyor-input";
import TimeReportFilterDateInput from "./time-report-filter-date-selector";
import TimeReportFilterMarkingInput from "./time-report-filter-marking-input";
import TimeReportFilterPlantSelector from "./time-report-filter-plant-selector";

export default function TimeReportFilter() {
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
        <TimeReportFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

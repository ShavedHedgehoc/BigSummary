import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import BoilsReportFilterBatchInput from "./boils-report-filter-batch-input";
import BoilsReportFilterClearButton from "./boils-report-filter-clear-button";
import BoilsReportFilterCodeInput from "./boils-report-filter-code-input";
import BoilsReportFilterMarkingInput from "./boils-report-filter-marking-input";
import BoilsReportFilterPlantSelector from "./boils-report-filter-plant-selector";
import BoilsReportFilterStateSelector from "./boils-report-filter-state-selector";

export default function BoilsReportFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <BoilsReportFilterBatchInput />
        <BoilsReportFilterMarkingInput />
        <BoilsReportFilterCodeInput />
        <BoilsReportFilterStateSelector />
        <BoilsReportFilterPlantSelector />
      </PageFilterLayout.Left>
      <BoilsReportFilterClearButton />
    </PageFilterLayout>
  );
}

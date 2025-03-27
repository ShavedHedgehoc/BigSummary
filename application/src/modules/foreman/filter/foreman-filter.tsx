import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import ForemanFilterCodeInput from "./foreman-filter-code-input";
import ForemanFilterClearButton from "./foreman-filter-clear-button";
import ForemanFilterPlantSelector from "./foreman-filter-plant-selector";
import ForemanFilterBatchInput from "./foreman-filter-batch-input";
import ForemanFilterMarkingInput from "./foreman-filter-marking-input";
import ForemanFilterStateSelector from "./foreman-filter-state-selector";
import ForemanFilterConveyorInput from "./foreman-filter-conveyor-input";
import MobileForemanFilter from "../foreman-mobile-filter";

export default function ForemanFilter() {
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

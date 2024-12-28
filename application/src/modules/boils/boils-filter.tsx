import PageFilterLayout from "../../shared/layouts/page-filter-layout";
import BoilsFilterPlantSelector from "./boils-filter-plant-selector";
import BoilsFilterStateSelector from "./boils-filter-state-selector";
import BoilsFilterBatchInput from "./boils-filter-batch-input";
import BoilsFilterMarkingInput from "./boils-filter-marking-input";
import BoilsFilterCodeInput from "./boils-filter-code-input";
import BoilsFilterClearButton from "./boils-filter-clear-button";

export default function BoilsFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <BoilsFilterBatchInput />
        <BoilsFilterMarkingInput />
        <BoilsFilterCodeInput />
        <BoilsFilterStateSelector />
        <BoilsFilterPlantSelector />
      </PageFilterLayout.Left>
      <BoilsFilterClearButton />
    </PageFilterLayout>
  );
}

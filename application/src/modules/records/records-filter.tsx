import PageFilterLayout from "../../shared/layouts/page-filter-layout";
import RecordsFilterCodeInput from "./records-filter-code-input";
import RecordsFilterMarkingInput from "./records-filter-marking-input";
import RecordsFilterBatchInput from "./records-filter-batch-input";
import RecordsFilterPlantSelector from "./records-filter-plant-selector";
import RecordsFilterStateSelector from "./records-filter-state-selector";
import RecordsFilterClearButton from "./records-filter-clear-button";
import RecordsFilterConveyorInput from "./record-filter-conveyor-input";

export default function RecordsFilter() {
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

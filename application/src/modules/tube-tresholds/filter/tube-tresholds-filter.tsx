import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import TubeTrsholdsFilterAddButton from "./tube-tresholds-add-button";
import TubeTresholdsFilterClearButton from "./tube-tresholds-clear-button";
import TubeTresholdsFilterConveyorSelector from "./tube-tresholds-conveyor-selector";
import TubeTresholdsFilterCodeInput from "./tube-tresholds-filter-code-input";
import TubeTresholdsFilterEmptySelector from "./tube-tresholds-filter-empty-selector";
import TubeTresholdsFilterMarkingInput from "./tube-tresholds-filter-marking-input";

export default function TubeTresholdsFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <TubeTresholdsFilterCodeInput />
        <TubeTresholdsFilterMarkingInput />
        <TubeTresholdsFilterConveyorSelector />
        <TubeTresholdsFilterEmptySelector />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <></>
        <TubeTrsholdsFilterAddButton />
        <TubeTresholdsFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import CansFilterCanInput from "./cans-filter-can-input";
import CansFilterClearButton from "./cans-filter-clear-button";
import CansFilterPlantSelector from "./cans-filter-plant-selector";
import CansFilterStateSelector from "./cans-filter-state-selector";
import CansFilterTransitSwitcher from "./cans-filter-transit-switcher";
import CansFilterVolumeSelector from "./cans-filter-volume-selector";

export default function CansFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <CansFilterCanInput />
        <CansFilterVolumeSelector />
        <CansFilterPlantSelector />
        <CansFilterStateSelector />
        <CansFilterTransitSwitcher />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <CansFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

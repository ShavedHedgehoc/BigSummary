import PageFilterLayout from "../../shared/layouts/page-filter-layout";
import CansListFilterClearButton from "./cans-list-filter-clear-button";
import CansListFilterEmptyBarcodeSwitcher from "./cans-list-filter-empty-barcode-switcher";
import CansListFilterPlantSelector from "./cans-list-filter-plant-selector";
import CansListFilterValueInput from "./cans-list-filter-value-input";

export default function CansListFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <CansListFilterValueInput />
        <CansListFilterPlantSelector />
        <CansListFilterEmptyBarcodeSwitcher />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <CansListFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

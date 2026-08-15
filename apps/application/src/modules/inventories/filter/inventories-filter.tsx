import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import InventoriesFilterClearButton from "./inventories-filter-clear-button";
import InventoriesFilterEndDateInput from "./inventories-filter-end-date-input";
import InventoriesFilterPlantSelector from "./inventories-filter-plant-selector";
import InventoriesFilterStartDateInput from "./inventories-filter-start-date-input";
import InventoriesFilterTodayButton from "./inventories-filter-today-button";

export default function InventoriesFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <InventoriesFilterStartDateInput />
        <InventoriesFilterEndDateInput />
        <InventoriesFilterPlantSelector />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <InventoriesFilterTodayButton />
        <InventoriesFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

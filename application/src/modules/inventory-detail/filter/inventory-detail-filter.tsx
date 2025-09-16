import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import InventoryDetailFilterClearButton from "./inventory-detail-filter-clear-button";
import InventoryDetailFilterCodeInput from "./inventory-detail-filter-code-input";
import InventoryDetailFilterExpDaysSelector from "./inventory-detail-filter-exp-days-selector";
import InventoryDetailFilterFilterSwitch from "./inventory-detail-filter-filterswitch";
import InventoryDetailToXLSXButton from "./inventory-detail-to-xlsx-button";

export default function InventoryDetailFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <InventoryDetailFilterCodeInput />
        <InventoryDetailFilterExpDaysSelector />
        <InventoryDetailFilterFilterSwitch />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <InventoryDetailToXLSXButton />
        <InventoryDetailFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}

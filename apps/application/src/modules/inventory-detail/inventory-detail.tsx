import * as React from "react";
import InventoryDetailHeader from "./inventory-detail-header";
import InventoryDetailTable from "./inventory-detail-table";
import InventoryDetailFilter from "./filter/inventory-detail-filter";

export default function InventoryDetail() {
  return (
    <React.Fragment>
      <InventoryDetailHeader />
      <InventoryDetailFilter />
      <InventoryDetailTable />
    </React.Fragment>
  );
}

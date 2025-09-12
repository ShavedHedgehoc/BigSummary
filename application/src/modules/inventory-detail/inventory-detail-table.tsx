import { useShallow } from "zustand/shallow";
import TableLayout from "../../shared/layouts/table-layout";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { useParams } from "react-router-dom";
import { Params } from "../../shared/router/params";
import { useInventoryRows } from "./use-inventory-rows";
import InventoryDetailRowComponent from "./inventory-detail-row";

import { useInventoryDetailFilterStore } from "./store/inventory-detail-filter-store";

const commonThead: TheadProperties[] = [
  { width: 40, align: "center", value: "Код 1С" },
  { width: 120, align: "center", value: "Наименование" },
  { width: 64, align: "center", value: "Партия" },
  { width: 50, align: "center", value: "Срок годносим" },
  { width: 50, align: "center", value: "Осталось дней" },
  { width: 40, align: "center", value: "Количество" },
  { width: 50, align: "center", value: "Внес" },
];

export default function InventoryDetailTable() {
  const params = useParams<Params.INVENTORY_PARAMS>();
  const inventory_id: string | undefined = params.inventory_id;

  const filter = useInventoryDetailFilterStore(useShallow((state) => state.filter));
  const { isPending, data, isSuccess } = useInventoryRows({ inventoryId: inventory_id, filter: filter });

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && data.length === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.map((row) => <InventoryDetailRowComponent row={row} key={row.id} />)}
    </TableLayout>
  );
}

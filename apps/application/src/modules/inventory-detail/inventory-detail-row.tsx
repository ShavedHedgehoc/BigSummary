import { InventoryRowsData } from "../../shared/api/services/inventory-rows-service";
import { formatDateToString } from "../../shared/helpers/date-time-formatters";
import { TableState } from "../../shared/ui/table-state";
import { useShallow } from "zustand/react/shallow";
import { useInventoryDetailFilterStore } from "./store/inventory-detail-filter-store";

export default function InventoryDetailRowComponent({ row }: { row: InventoryRowsData }) {
  const selectedDays = useInventoryDetailFilterStore(useShallow((state) => state.selectedDays));
  const isExpired = row.days_to_exp < selectedDays;
  const commonState = isExpired ? "fail" : "";
  return (
    <tr key={row.id}>
      <td style={{ width: 40, textAlign: "center", padding: "12px 6px" }}>
        <TableState text={row.product_id?.toString() ?? ""} state={commonState} />
      </td>
      <td style={{ width: 120, textAlign: "left", padding: "12px 6px" }}>
        <TableState text={row.product_name ?? ""} state={commonState} />
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <TableState text={row.lot_name ?? ""} state={commonState} />
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <TableState text={row.exp_date ? formatDateToString(row.exp_date) : ""} state={commonState} />
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <TableState text={row.days_to_exp?.toString() ?? "0"} state={isExpired ? "fail" : "success"} />
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 6px" }}>
        <TableState text={row.quantity?.toString() ?? "0"} state={commonState} />
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <TableState text={row.author_name ?? ""} state={commonState} />
      </td>
    </tr>
  );
}

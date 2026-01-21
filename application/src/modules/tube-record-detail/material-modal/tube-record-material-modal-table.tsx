import { useShallow } from "zustand/react/shallow";
import { useTubeRecordMaterialModalStore } from "../store/use-tube-record-detail-material-modal-store";
import TableLayout from "../../../shared/layouts/table-layout";
import TubeRecordMaterialModalTableRow from "./tube-record-material-modal-table-row";

export default function TubeRecordMaterialModalTable() {
  const data = useTubeRecordMaterialModalStore(useShallow((state) => state.data));

  const table_thead: TheadProperties[] = [
    { width: 10, padding: "12px 24px", value: "№", align: "center" },
    { width: 50, padding: "12px 24px", value: "Код 1С" },
    { width: 120, padding: "12px 24px", value: "Наименования", align: "left" },
    { width: 80, padding: "12px 24px", value: "Партия", align: "left" },
  ];
  return (
    <TableLayout thead={table_thead}>
      {data.map((row, index) => (
        <TubeRecordMaterialModalTableRow row={row} index={index} key={`mat_row_${index}`} />
      ))}
    </TableLayout>
  );
}

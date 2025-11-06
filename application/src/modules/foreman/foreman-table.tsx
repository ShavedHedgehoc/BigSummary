import { useShallow } from "zustand/react/shallow";
import TableLayout from "../../shared/layouts/table-layout";
import RowComponent from "./foreman-row";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { useCurrentRecords } from "../../shared/api/use-current-records";
import { useForemanFilterStore } from "./store/use-foreman-filter-store";

const commonThead: TheadProperties[] = [
  { width: 50, align: "center", value: "Код 1С" },
  { width: 64, align: "center", value: "Артикул" },
  { width: 50, align: "center", value: "Партия" },
  { width: 50, align: "center", value: "Конвейер" },
  { width: 110, align: "center", value: "Статус" },
  { width: 30, align: "center", value: "..." },
  { width: 80, align: "center", value: "Начало" },
  { width: 80, align: "center", value: "Окончание" },
];

export default function ForemanTable() {
  const filter = useForemanFilterStore(useShallow((state) => state.filter));
  const { isPending, data, isSuccess } = useCurrentRecords({ filter: filter });

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && data.records.length === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.records.map((row) => <RowComponent row={row} key={row.id} />)}
    </TableLayout>
  );
}

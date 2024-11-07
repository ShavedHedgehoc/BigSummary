import { useShallow } from "zustand/shallow";
import TableLayout from "../../shared/layouts/table-layout";
import RowComponent from "./records-row";
import TableLoaderComponent from "../../components/tables/TableLoaderComponent";
import TableNotFoundComponent from "../../components/tables/TableNotFoundComponent";
import { useRecordsFilterStore } from "./store/use-record-filter-store";
import { useCurrentRecords } from "./use-current-records";

const commonThead: TheadProperties[] = [
  { width: 50, align: "center", value: "Код 1С" },
  { width: 64, align: "center", value: "Артикул" },
  { width: 50, align: "center", value: "Партия" },
  { width: 50, align: "center", value: "Аппарат" },
  { width: 50, align: "center", value: "Емкость" },
  { width: 50, align: "center", value: "Конвейер" },
  { width: 110, align: "center", value: "Статус" },
  { width: 30, align: "center", value: "..." },
  // { width: 80, align: "center", value: "Корректировка" },
  { width: 80, align: "center", value: "Доработка" },
  { width: 70, align: "center", value: "Допуск" },
  { width: 60, align: "center", value: "Брак" },
];

export default function RecordsTable() {
  // const id = usePlantSelectorStore(useShallow((state) => state.selectedPlant));
  const filter = useRecordsFilterStore(useShallow((state) => state.filter));
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

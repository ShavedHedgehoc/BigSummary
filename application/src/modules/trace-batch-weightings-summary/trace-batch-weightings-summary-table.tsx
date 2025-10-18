import TableLayout from "../../shared/layouts/table-layout";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import TraceBatchWeightingsSummaryTableRow from "./trace-batch-weightings-summary-table-row";
import { useTraceBatchWeightingsSummary } from "./use-trace-batch-weightings-summary";
import { useTraceBatchWeightingsSummaryFilterStore } from "./store/use-trace-batch-weightings-summary-filter-store";
import { useShallow } from "zustand/shallow";

const commonThead: TheadProperties[] = [
  { width: 60, value: "Сотрудник", align: "left", padding: "12px 6px 12px 40px" },
  { width: 30, value: "Строк всего" },
  { width: 30, value: "Взвешено всего" },
  { width: 50, value: "Первое взвешивание" },
  { width: 50, value: "Последнее взвешивание" },
  { width: 20, value: "" },
];

export default function TraceBatchWeightingsSummaryTable() {
  const filter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.filter));
  const { isPending, data, isSuccess } = useTraceBatchWeightingsSummary({ filter: filter });

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && data.length === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.map((row) => <TraceBatchWeightingsSummaryTableRow row={row} key={row.w_author_id} />)}
    </TableLayout>
  );
}

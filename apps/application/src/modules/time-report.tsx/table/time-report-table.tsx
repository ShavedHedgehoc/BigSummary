import { useShallow } from "zustand/react/shallow";
import TableLayout from "../../../shared/layouts/table-layout";
import TableLoaderComponent from "../../../shared/components/table-loader";
import TableNotFoundComponent from "../../../shared/components/table-not-found";
import { useTimeReportFilterStore } from "../store/use-time-report-filter-store";
import { useTimeReport } from "../use-time-report";
import TimeReportRow from "./time-report-row";

const commonThead: TheadProperties[] = [
  { width: 50, value: "Конвейер" },
  { width: 50, value: "Код 1C" },
  { width: 100, value: "Артикул" },
  { width: 50, value: "Партия" },
  { width: 50, value: "План" },
  { width: 20, value: "..." },

  { width: 100, value: "Основа на пробе" },
  { width: 100, value: "Допуск на подключение" },
  { width: 80, value: "Продукт на пробе" },
  { width: 80, value: "Допуск на фасовку" },
  { width: 80, value: "Фасуется" },
  { width: 100, value: "Фасовка завершена" },
];

export default function TimeReportTable() {
  const filter = useTimeReportFilterStore(useShallow((state) => state.filter));

  const { isPending, data, isSuccess } = useTimeReport({ filter: filter });

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && !data.length) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.length && data.map((row) => <TimeReportRow row={row} key={row.id} />)}
    </TableLayout>
  );
}

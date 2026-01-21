import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";

import { useTubeEmployeesFilterStore } from "./store/use-tube-employees-filter-store";
import { useTubeEmployeesPaginationStore } from "./store/use-tube-employees-pagination-store";
import { useTubeEmployees } from "./use-tube-employees";
import TubeEmployeesRow from "./tube-employees-row";

const commonThead: TheadProperties[] = [
  { width: 64, value: "ФИО", align: "left", padding: " 12px 36px" },
  { width: 64, value: "Штрихкод" },
  { width: 64, value: "Разряд" },
  { width: 64, value: "Доступ" },
  { width: 50, value: "Действия" },
];

export default function TubeEmployeesTable() {
  const filter = useTubeEmployeesFilterStore(useShallow((state) => state.filter));
  const page = useTubeEmployeesPaginationStore(useShallow((state) => state.page));
  const limit = useTubeEmployeesPaginationStore(useShallow((state) => state.limit));
  const total = useTubeEmployeesPaginationStore(useShallow((state) => state.total));
  const setTotal = useTubeEmployeesPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useTubeEmployeesPaginationStore(useShallow((state) => state.setPage));

  const { isPending, data, isSuccess } = useTubeEmployees({ filter: filter, limit: limit, page: page });

  //REmove useeffects

  React.useEffect(() => {
    if (data && data.total !== total) {
      setTotal(data.total);
      setPage(1);
    }
  }, [data?.total]);

  React.useEffect(() => {
    if (limit) {
      setPage(1);
    }
  }, [limit]);

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && data.total === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.employees.map((row) => <TubeEmployeesRow row={row} key={row.id} />)}
    </TableLayout>
  );
}

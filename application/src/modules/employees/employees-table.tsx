import * as React from "react";
import { useShallow } from "zustand/shallow";
import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";

import { useEmployees } from "./use-employees";
import { useEmployeesFilterStore } from "./store/use-employees-filter-store";
import { useEmployeesPaginationStore } from "./store/use-employees-pagination-store";
import EmployeesRow from "./employees-row";

const commonThead: TheadProperties[] = [
  { width: 64, value: "ФИО", align: "left", padding: " 12px 36px" },
  { width: 64, value: "Штрихкод" },
  { width: 64, value: "Роль" },
  { width: 50, value: "Действия" },
];

export default function EmployeesTable() {
  const filter = useEmployeesFilterStore(useShallow((state) => state.filter));
  const page = useEmployeesPaginationStore(useShallow((state) => state.page));
  const limit = useEmployeesPaginationStore(useShallow((state) => state.limit));
  const total = useEmployeesPaginationStore(useShallow((state) => state.total));
  const setTotal = useEmployeesPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useEmployeesPaginationStore(useShallow((state) => state.setPage));

  const { isPending, data, isSuccess } = useEmployees({ filter: filter, limit: limit, page: page });

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
      {isSuccess && data.rows.map((row) => <EmployeesRow row={row} key={row.id} />)}
    </TableLayout>
  );
}

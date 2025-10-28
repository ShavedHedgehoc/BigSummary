import * as React from "react";

import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";

import { useShallow } from "zustand/react/shallow";
import { useUsers } from "./use-users";

import { useUsersFilterStore } from "./store/use-users-filter-store";
import { useUsersPaginationStore } from "./store/use-users-pagination-store";
import TableLayout from "../../shared/layouts/table-layout";
import UsersRow from "./users-row";

export default function UsersTable() {
  const filter = useUsersFilterStore(useShallow((state) => state.filter));
  const page = useUsersPaginationStore(useShallow((state) => state.page));
  const limit = useUsersPaginationStore(useShallow((state) => state.limit));
  const total = useUsersPaginationStore(useShallow((state) => state.total));
  const setTotal = useUsersPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useUsersPaginationStore(useShallow((state) => state.setPage));
  const { isPending, data, isSuccess } = useUsers({ filter: filter, limit: limit, page: page });

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

  const commonThead: TheadProperties[] = [
    { width: 48, value: "Имя", align: "left", padding: "12px 6px 12px 40px" },
    { width: 48, value: "Email", align: "left", padding: "12px 6px" },
    { width: 160, value: "Роли", align: "left" },
    { width: 32, value: "Доступ" },
    { width: 48, value: "Действия" },
  ];
  if (isPending) {
    return <TableLoaderComponent />;
  }
  if (isSuccess && data.total === 0) {
    return <TableNotFoundComponent />;
  }
  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.rows.map((row) => <UsersRow row={row} key={row.id} />)}
    </TableLayout>
  );
}

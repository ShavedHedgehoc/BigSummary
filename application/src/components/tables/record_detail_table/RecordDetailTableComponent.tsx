import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import RecordDetailRowComponent from "./RecordDetailRowComponent";
import TableSkeleton from "../TableLayout";
import { DbRoles } from "../../../shared/db-roles";

const RecordDetailTableComponent = () => {
  const { store } = React.useContext(Context);
  return (
    <React.Fragment>
      <TableSkeleton>
        <thead>
          <tr>
            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Дата
            </th>
            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Время
            </th>
            <th scope="col" style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
              Статус записи
            </th>
            <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
              Автор записи
            </th>
            {store.AuthStore.user && store.AuthStore.user.roles.includes(DbRoles.GODMODE) && (
              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Действия
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {store.RecordDetailStore.histories
            .slice()
            .sort((a, b) => a.id - b.id)
            .map((row) => (
              <RecordDetailRowComponent row={{ ...row }} key={row.id} />
            ))}
        </tbody>
      </TableSkeleton>
    </React.Fragment>
  );
};

export default observer(RecordDetailTableComponent);

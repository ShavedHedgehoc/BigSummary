import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import TableSkeleton from "../TableSkeleton";
import SummaryListRowComponent from "./SummaryListRowComponent";
import { SummaryListTableProps } from "./SummaryListTable";

const SummaryListTableComponent = (props: SummaryListTableProps) => {
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
              Площадка
            </th>
            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Строк сводки
            </th>
            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Записей
            </th>
            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Действия
            </th>
          </tr>
        </thead>
        <tbody>
          {store.DocStore.docs.map((row) => (
            <SummaryListRowComponent row={{ ...row }} role={props.role} key={row.id} />
          ))}
        </tbody>
      </TableSkeleton>
    </React.Fragment>
  );
};
export default observer(SummaryListTableComponent);

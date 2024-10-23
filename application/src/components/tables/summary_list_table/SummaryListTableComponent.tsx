import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import TableLayout from "../TableLayout";
import SummaryListRowComponent from "./SummaryListRowComponent";
import { SummaryListTableProps } from "./SummaryListTable";

const SummaryListTableComponent = (props: SummaryListTableProps) => {
  const { store } = React.useContext(Context);
  const commonThead = [
    { width: 64, value: "Дата" },
    { width: 64, value: "Площадка" },
    { width: 64, value: "Строк сводки" },
    { width: 64, value: "Записей" },
    { width: 64, value: "Действия" },
  ];
  return (
    <React.Fragment>
      <TableLayout>
        <thead>
          <tr>
            {[...commonThead].map((item, key) => (
              <th key={key} scope="col" style={{ width: item.width, textAlign: "center", padding: "12px 6px" }}>
                {item.value}
              </th>
            ))}
            {/*  */}
          </tr>
        </thead>
        <tbody>
          {store.DocStore.docs.map((row) => (
            <SummaryListRowComponent row={{ ...row }} role={props.role} key={row.id} />
          ))}
        </tbody>
      </TableLayout>
    </React.Fragment>
  );
};
export default observer(SummaryListTableComponent);

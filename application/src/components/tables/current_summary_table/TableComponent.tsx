import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import { CurrentSummaryTableProps } from "./CurrentSummaryTable";
import RowComponent from "./RowComponent";
import TableSkeleton from "../TableLayout";

const TableComponent = (props: CurrentSummaryTableProps) => {
  const { store } = React.useContext(Context);
  return (
    <React.Fragment>
      <TableSkeleton>
        <thead>
          <tr>
            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Код 1С
            </th>
            <th scope="col" style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
              Артикул
            </th>
            <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
              Партия
            </th>
            {/* For test */}
            <th scope="col" style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
              Набор
            </th>
            {/* For test */}
            <th scope="col" style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
              План
            </th>
            <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
              Аппарат
            </th>
            <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
              Емкость
            </th>
            <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
              Конвейер
            </th>
            {props.role === "user" && (
              <th scope="col" style={{ width: 200, textAlign: "center", padding: "12px 6px" }}>
                Примечание
              </th>
            )}

            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Статус
            </th>
            {/* {props.role === "technologist" && (
              <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                Допуск
              </th>
            )} */}
            {props.role === "laboratory" && (
              <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                Допуск
              </th>
            )}
            {props.role === "laboratory" && (
              <th scope="col" style={{ width: 160, textAlign: "center", padding: "12px 6px" }}>
                Карантин
              </th>
            )}
            {props.role === "foreman" && (
              <th scope="col" style={{ width: 160, textAlign: "center", padding: "12px 6px" }}>
                Действия
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {store.SummaryStore.records.map((row) => (
            <RowComponent row={{ ...row }} role={props.role} key={row.id} />
          ))}
        </tbody>
      </TableSkeleton>
    </React.Fragment>
  );
};

export default observer(TableComponent);

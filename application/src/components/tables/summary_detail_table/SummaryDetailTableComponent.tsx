import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import SummaryDetailRowComponent from "./SummaryDetailRowComponent";
import TableSkeleton from "../TableSkeleton";

const SummaryDetailTableComponent = () => {
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

            <th scope="col" style={{ width: 200, textAlign: "center", padding: "12px 6px" }}>
              Примечание
            </th>

            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Статус
            </th>
            <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
              Действия
            </th>
          </tr>
        </thead>
        <tbody>
          {store.SummaryStore.records.map((row) => (
            <SummaryDetailRowComponent row={{ ...row }} key={row.id} />
          ))}
        </tbody>
      </TableSkeleton>
    </React.Fragment>
  );
};

export default observer(SummaryDetailTableComponent);

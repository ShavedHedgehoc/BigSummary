import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import BoilsListRowComponent from "./BoilsListRowComponent";
import { BoilListTableProps } from "./BoilsListTable";
import { IBoilsListItem } from "../../../types";
import TableSkeleton from "../TableSkeleton";

interface BoilListTableComponentProps extends BoilListTableProps {
  makeRecord({ boil, state }: { boil: IBoilsListItem; state: string }): void;
  showStatesList(boil: IBoilsListItem): void;
}

const BoilsListTableComponent = (props: BoilListTableComponentProps) => {
  const { store } = React.useContext(Context);
  const firstlabThead = [{ width: 30, value: "..." }];
  const commonThead = [
    { width: 64, value: "Партия" },
    { width: 64, value: "Артикул" },
    { width: 64, value: "Код 1C" },
    { width: 50, value: "В сводках" },
    { width: 50, value: "Записей" },
    { width: 96, value: "Статус" },
  ];

  const labThead = [
    { width: 80, value: "Продолжение" },
    { width: 80, value: "Корректировка" },
    { width: 70, value: "Допуск" },
    { width: 60, value: "Брак" },
  ];

  const reportThead = [
    { width: 80, value: "Сводки" },
    { width: 80, value: "Действия" },
  ];

  return (
    <React.Fragment>
      <TableSkeleton>
        <thead>
          <tr>
            {props.role === "laboratory" &&
              [...commonThead, ...firstlabThead, ...labThead].map((item, key) => (
                <th key={key} scope="col" style={{ width: item.width, textAlign: "center", padding: "12px 6px" }}>
                  {item.value}
                </th>
              ))}
            {props.role === "reports" &&
              [...commonThead, ...reportThead].map((item, key) => (
                <th key={key} scope="col" style={{ width: item.width, textAlign: "center", padding: "12px 6px" }}>
                  {item.value}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {store.BoilStore.state.data.rows.map((row) => (
            <BoilsListRowComponent
              row={{ ...row }}
              key={row.id}
              role={props.role}
              makeRecord={({ boil, state }: { boil: IBoilsListItem; state: string }) =>
                props.makeRecord({ boil, state })
              }
              showStatesList={(boil: IBoilsListItem) => props.showStatesList(boil)}
            />
          ))}
        </tbody>
      </TableSkeleton>
    </React.Fragment>
  );
};

export default observer(BoilsListTableComponent);

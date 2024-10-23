import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import TableSkeleton from "../TableLayout";
import EmployeeRowComponent from "./EmployeeRowComponent";
import { IEmployee } from "../../../types";

// interface BoilListTableComponentProps extends BoilListTableProps {
//   makeRecord({ boil, state }: { boil: IBoilsListItem; state: string }): void;
//   showStatesList(boil: IBoilsListItem): void;
// }

// const EmployeeTableComponent = (props: BoilListTableComponentProps) => {

// const Component = observer((props) => (
//   <div>
//     {props.user.name}
//     <TodosView todos={props.todos} />
//   </div>
// ));

// const TodosView = observer(({ todos }) => (
//   <ul>
//     {todos.map((todo) => (
//       <TodoView todo={todo} key={todo.id} />
//     ))}
//   </ul>
// ));

const RowsView = observer(({ rows }: { rows: IEmployee[] }) => (
  <React.Fragment>
    {rows.map((row) => (
      <EmployeeRowComponent row={{ ...row }} key={row.id} />
    ))}
  </React.Fragment>
));

export interface EmployeeTableProps {
  rows: IEmployee[];
}

const EmployeeTableComponent = observer((props: EmployeeTableProps) => {
  // const { store } = React.useContext(Context);

  const commonThead = [
    { width: 64, value: "ФИО" },
    { width: 64, value: "Штрихкод" },
    { width: 64, value: "Роль" },
    { width: 50, value: "Действия" },
  ];
  React.useEffect(() => {
    console.log("EmpTableComp");
  }, []);
  return (
    <React.Fragment>
      <TableSkeleton>
        <thead>
          <tr>
            {[...commonThead].map((item, key) => (
              <th key={key} scope="col" style={{ width: item.width, textAlign: "center", padding: "12px 6px" }}>
                {item.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <RowsView rows={props.rows} />
          {/* <RowsView rows={store.EmployeeStore.employees} /> */}
          {/* {store.EmployeeStore.employees.map((row) => (
            <EmployeeRowComponent row={{ ...row }} key={row.id} />
          ))} */}
        </tbody>
      </TableSkeleton>
    </React.Fragment>
  );
});

// export default observer(EmployeeTableComponent);
export default EmployeeTableComponent;

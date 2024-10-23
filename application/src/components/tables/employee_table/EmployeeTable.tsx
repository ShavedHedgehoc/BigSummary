import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import withVisible from "../../common/WithVisible";
import TableLoaderComponent from "../TableLoaderComponent";
import TableNotFoundComponent from "../TableNotFoundComponent";
import EmployeeTableFiltercomponent from "./EmployeeTableFiltercomponent";
import PaginationComponent, { PaginationComponentProps } from "../PaginationComponent";
import EmployeeTableComponent, { EmployeeTableProps } from "./EmployeeTableComponent";

function EmployeeTable() {
  const { store } = React.useContext(Context);

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const Loader = withVisible(TableLoaderComponent);
  const NotFound = withVisible(TableNotFoundComponent);
  const paginationProps: PaginationComponentProps = {
    firstRecord: store.EmployeePaginationStore.firstRecord,
    lastRecord: store.EmployeePaginationStore.lastRecord,
    total: store.EmployeePaginationStore.total,
    limit: store.EmployeePaginationStore.limit,
    page: store.EmployeePaginationStore.page,
    pages: store.EmployeePaginationStore.pages,
    changeLimit: (val) => store.EmployeePaginationStore.changeLimit(val),
    firstPage: () => store.EmployeePaginationStore.firstPage(),
    lastPage: () => store.EmployeePaginationStore.lastPage(),
    prevPage: () => store.EmployeePaginationStore.prevPage(),
    nextPage: () => store.EmployeePaginationStore.nextPage(),
  };

  const tableProps: EmployeeTableProps = {
    rows: store.EmployeeStore.employees,
  };

  return (
    <React.Fragment>
      <EmployeeTableFiltercomponent />
      <Loader visible={store.EmployeeStore.renderLoader} />
      <NotFound visible={store.EmployeeStore.noRecordsFound} />
      {store.EmployeeStore.renderTable && <EmployeeTableComponent {...tableProps} />}
      <PaginationComponent {...paginationProps} />
    </React.Fragment>
  );
}

export default observer(EmployeeTable);

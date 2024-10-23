import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import MainPageHeaderWithRenewProp from "../headers/MainPageHeaderWithRenewProp";
import TableLoaderComponent from "../tables/TableLoaderComponent";
import withVisible from "../common/WithVisible";
import TableNotFoundComponent from "../tables/TableNotFoundComponent";
import { Box, Button, Sheet, Table, Typography } from "@mui/joy";
import { IEmployee } from "../../types";
import MainPageHeader from "../headers/MainPageHeader";
import EmployeeTableFiltercomponent from "../tables/employee_table/EmployeeTableFiltercomponent";
import PaginationComponent, { PaginationComponentProps } from "../tables/PaginationComponent";
import EmployeeTableComponent, { EmployeeTableProps } from "../tables/employee_table/EmployeeTableComponent";
import EmployeeTable from "../tables/employee_table/EmployeeTable";

const Employees = () => {
  const [initial, setInitial] = React.useState(false);
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    store.EmployeeStore.fetchEmployees().then(() => setInitial(true));
    console.log("render");
  }, []);

  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Пользователи рабочей станции"]} />
      <MainPageHeader pageTitle={"Пользователи рабочей станции"} />
      {store.EmployeeStore.renderTable && <EmployeeTable />}
    </React.Fragment>
  );
};

export default Employees;

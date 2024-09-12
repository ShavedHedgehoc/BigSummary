import * as React from "react";
import BreadCrumbHeader from "./BreadCrumbHeader";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import MainPageHeaderWithRenewProp from "./MainPageHeaderWithRenewProp";
import TableLoaderComponent from "./common/TableLoaderComponent";
import withVisible from "./WithVisible";
import TableNotFoundComponent from "./common/TableNotFoundComponent";
import { Box, Button, Sheet, Table, Typography } from "@mui/joy";
import { IEmployee } from "../types";

function EmployeeTableComponent() {
  const { store } = React.useContext(Context);
  return (
    <Sheet
      className="CurrenSummaryTableContainer"
      variant="outlined"
      sx={{
        display: { xs: "none", xl: "initial" },
        width: "100%",
        borderRadius: "sm",
        flexShrink: 1,
        overflow: "auto",
        minHeight: 0,
      }}
    >
      <Table
        aria-labelledby="tableTitle"
        stickyHeader
        hoverRow
        sx={[
          {
            "--TableCell-headBackground": "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          },
        ]}
        variant="soft"
      >
        <thead>
          <tr>
            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Сотрудник
            </th>
            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Штрихкод
            </th>
            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Роль
            </th>
            <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
              Информация
            </th>
          </tr>
        </thead>
        <tbody>
          {store.EmployeeStore.employees.map((row) => (
            <EmployeeRowComponent row={{ ...row }} />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}

function RenderEmployeeTable() {
  const { store } = React.useContext(Context);
  const Loader = withVisible(TableLoaderComponent);
  const NotFound = withVisible(TableNotFoundComponent);
  const EmpTable = observer(EmployeeTableComponent);

  return (
    <React.Fragment>
      <Loader visible={store.EmployeeStore.renderLoader} />
      <NotFound visible={store.EmployeeStore.noRecordsFound} />
      {store.EmployeeStore.renderTable && <EmpTable />}
    </React.Fragment>
  );
}

function EmployeeRowComponent({ row }: { row: IEmployee }) {
  return (
    <tr key={row.id}>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.name}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.barcode}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.occupation.description}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Button
          // variant="outlined"
          // color="neutral"
          size="sm"
          sx={{ fontWeight: "normal", fontSize: "small" }}
          onClick={() => alert("Здесь будет модалка изменения пользователя")}
        >
          Изменить
        </Button>
      </td>
    </tr>
  );
}
function AddUserButtonComponent() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
      <Button
        size="sm"
        sx={{ fontWeight: "normal", fontSize: "small" }}
        onClick={() => alert("Здесь будет модалка добавления пользователя")}
      >
        Добавить нового пользователя
      </Button>
    </Box>
  );
}
function Employees() {
  const [initial, setInitial] = React.useState(false);
  const { store } = React.useContext(Context);
  React.useEffect(() => {
    store.EmployeeStore.fetchEmployees().then(() => setInitial(true));
  }, []);

  const AddUser = withVisible(AddUserButtonComponent);
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Пользователи рабочей станции"]} />
      <MainPageHeaderWithRenewProp
        title={"Пользователи рабочей станции"}
        renewData={() => store.EmployeeStore.fetchEmployees()}
      />
      {initial && <RenderEmployeeTable />}
      {initial && <AddUser visible={!store.EmployeeStore.pending} />}
    </React.Fragment>
  );
}

export default observer(Employees);

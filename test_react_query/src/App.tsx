// import AppRouter from "./router/AppRouter";

import React from "react";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EmployeeService from "./services/EmployeeService";
import TableLoaderComponent from "./TableLoaderComponent";
import TableLayout from "./TableLayout";
import EmployeeRowComponent from "./EmployeeRowComponent";
import {
  Box,
  Input,
  Sheet,
  Button,
  IconButton,
  FormControl,
  useColorScheme,
  FormHelperText,
  Select,
  Option,
  Checkbox,
  SelectStaticProps,
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CachedIcon from "@mui/icons-material/Cached";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";

const queryClient = new QueryClient();

const EmployeeTableFilterComponent = () => {
  const { mode, systemMode } = useColorScheme();
  // const action: SelectStaticProps["action"] = React.useRef(null);
  const client = useQueryClient();
  return (
    <React.Fragment>
      <Sheet
        className="BoilsListTableFilterContainer"
        variant="outlined"
        sx={[
          {
            display: { xs: "none", xl: "flex" },
            width: "100%",
            borderRadius: "sm",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            px: 2,
            py: 1,
            borderWidth: "1px",
            mb: 1,
          },
          (theme) => ({
            backgroundColor: theme.variants.soft.neutral,
          }),
        ]}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
          <Button
            color={mode === "dark" ? "neutral" : "neutral"}
            variant="outlined"
            startDecorator={<CachedIcon />}
            size={"sm"}
            sx={{ fontWeight: "normal", fontSize: "small" }}
            onClick={() => client.invalidateQueries({ queryKey: ["employees"] })}
          >
            Обновить
          </Button>
          <Button
            color={mode === "dark" ? "neutral" : "neutral"}
            variant="outlined"
            startDecorator={<DeleteOutlineIcon />}
            size={"sm"}
            sx={{ fontWeight: "normal", fontSize: "small" }}
            // disabled={store.BoilStore.clearFilterDisabled}
            // onClick={() => {
            //   store.EmployeeFilterStore.clearFilter();
            // }}
          >
            Сбросить
          </Button>
        </Box>
      </Sheet>
    </React.Fragment>
  );
};

const TableComponent = () => {
  const { isPending, data, isSuccess } = useQuery({
    queryKey: ["employees"],
    queryFn: () => EmployeeService.getEmployees(),
  });

  const commonThead = [
    { width: 64, value: "ФИО" },
    { width: 64, value: "Штрихкод" },
    { width: 64, value: "Роль" },
    { width: 50, value: "Действия" },
  ];
  if (isPending) {
    return <TableLoaderComponent />;
  }

  return (
    <TableLayout>
      <thead>
        <tr>
          {[...commonThead].map((item, key) => (
            <th key={key} scope="col" style={{ width: item.width, textAlign: "center", padding: "12px 6px" }}>
              {item.value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{isSuccess && data.map((row) => <EmployeeRowComponent row={row} key={row.id} />)}</tbody>
    </TableLayout>
  );
};

function App() {
  // const router = AppRouter(); // return router;
  return (
    <QueryClientProvider client={queryClient}>
      <React.Fragment>
        <EmployeeTableFilterComponent />
        <TableComponent />
      </React.Fragment>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

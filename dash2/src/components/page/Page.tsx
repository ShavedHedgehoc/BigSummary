import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { IRecord } from "../../services/SummaryService";
import StatusLedDash from "../status-led-dash/StatusLedDash";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Fab, Typography } from "@mui/material";
import SideMenu from "../sideMenu/SideMenu";

export default function Page() {
  const params = useParams<"plant_id">();
  const plant_id: string | undefined = params.plant_id;

  const { store } = React.useContext(Context);
  const [records, setRecords] = React.useState({} as IRecord[]);

  const setData = (plant_id: string | undefined) => {
    store.SummaryStore.fetchRecords(plant_id).then(() => setRecords([...store.SummaryStore.records]));
  };

  interface Column {
    id: "conveyor" | "marking" | "batch" | "status";
    label: string;
    minWidth?: number;
    align?: "right" | "center";
    format?: (value: number) => string;
  }
  const columns: readonly Column[] = [
    { id: "conveyor", align: "center", label: "Конв.", minWidth: 20 },
    { id: "marking", align: "center", label: "Арт.", minWidth: 20 },
    { id: "batch", align: "center", label: "Партия", minWidth: 20 },
    { id: "status", align: "center", label: "Статус", minWidth: 20 },
  ];

  const selClass = (item: IRecord) => {
    if (item.histories.length == 0) {
      return "list-group-item list-group-item-light";
    }
    const status = item.histories[item.histories.length - 1]?.historyType.value;
    switch (status) {
      case "base_fail":
        return "#FEE1E8";
      case "product_fail":
        return "#FEE1E8";
      case "base_check":
        return "#FFD8BE";
      case "product_check":
        return "#FFD8BE";

      case "plug_pass":
        return "#CCE2CB";
      case "product_pass":
        return "#CCE2CB";

      default:
        break;
    }
  };

  React.useEffect(() => {
    setData(plant_id);
  }, []);
  const navigate = useNavigate();

  if (store.SummaryStore.pending) {
    return <>"Загружаю..."</>;
  }

  if (store.SummaryStore.pendingComplete && store.SummaryStore.records.length == 0) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" textAlign={"end"}>
          Записей не найдено...
        </Typography>
        <Fab
          color="warning"
          style={{ margin: "0", top: "auto", right: "20px", bottom: "20px", left: "auto", position: "fixed" }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon />
        </Fab>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "start",
        justifyContent: "center",
      }}
    >
      {records.length > 0 ? (
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((item) => (
                <TableRow onClick={() => navigate(`/detail/${item.id}`)} style={{ backgroundColor: selClass(item) }}>
                  <TableCell align="center">{item.conveyor.value}</TableCell>
                  <TableCell align="center">{item.product.marking}</TableCell>
                  <TableCell align="center">{item.boil.value}</TableCell>
                  <TableCell align="center">
                    <StatusLedDash item={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}

      <Fab
        color="warning"
        style={{ margin: "0", top: "auto", right: "20px", bottom: "20px", left: "auto", position: "fixed" }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNewIcon />
      </Fab>
      {/* <SideMenu /> */}
    </Box>
  );
}

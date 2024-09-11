import * as React from "react";
import { Button, Sheet, Table, Typography, Box } from "@mui/joy";
import { IDoc } from "../types";
import { formatDateToString } from "../utils";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { Store } from "@mui/icons-material";

function SummaryListTable() {
  const { store } = React.useContext(Context);

  const navigate = useNavigate();
  const selClass = (item: IDoc) => {
    if (item.histories_count === "0") {
      return "list-group-item list-group-item-light";
    } else {
      return "success";
    }
  };

  const renderTable = () => (
    <React.Fragment>
      <Sheet
        className="CurrenSummaryTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", lg: "initial" },
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
            (theme) => ({
              "& td[scope='fail'] ": { bgcolor: "danger.softBg" },
              "& td[scope='wait'] ": { bgcolor: "warning.softBg" },
              "& td[scope='success'] ": { bgcolor: "success.softBg" },
              "& td[scope='und'] ": { bgcolor: `rgba(${theme.vars.palette.success.lightChannel}/0.6)` },
              '& th[scope="col"]': theme.variants.soft.neutral,
              //   "& td": theme.variants.soft.neutral,
            }),
          ]}
          variant="soft"
        >
          <thead>
            <tr>
              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Дата
              </th>
              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Площадка
              </th>
              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Строк сводки
              </th>
              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Записей
              </th>
              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {store.DocStore.docs.map((row) => (
              <tr key={row.id}>
                <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">{formatDateToString(row.date)}</Typography>
                </td>
                <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">{row.plants.value}</Typography>
                </td>
                <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">{row.records_count}</Typography>
                </td>
                <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">{row.histories_count}</Typography>
                </td>

                <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="danger"
                      size="sm"
                      // onClick={() => props.makeHistoryRecord(row.boil.value, null, "product_fail")}
                      disabled={row.histories_count !== "0"}
                    >
                      <Typography
                        level="body-xs"
                        variant="plain"
                        color={row.histories_count === "0" ? "danger" : "neutral"}
                      >
                        Удалить
                      </Typography>
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      size="sm"
                      onClick={() => navigate(`/summary/` + `${row.id}`)}
                    >
                      <Typography level="body-xs" variant="plain" color="success">
                        Просмотр
                      </Typography>
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
  if (!store.DocStore.docs.length) {
    return <></>;
  }

  return <React.Fragment>{renderTable()}</React.Fragment>;
}

export default observer(SummaryListTable);

import * as React from "react";
import { Sheet, Table, useColorScheme } from "@mui/joy";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { CurrentSummaryTableProps } from "./CurrentSummaryTable";
import RowComponent from "./RowComponent";

const TableComponent = (props: CurrentSummaryTableProps) => {
  const { mode, systemMode } = useColorScheme();
  systemMode;
  const { store } = React.useContext(Context);
  React.useEffect(() => console.log("Render table"), []);
  return (
    <React.Fragment>
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
            (theme) => ({
              "& td[scope='fail'] ": { bgcolor: mode === "light" ? "danger.softBg" : "neutral.softBg" },
              "& td[scope='wait'] ": { bgcolor: mode === "light" ? "warning.softBg" : "neutral.softBg" },
              "& td[scope='success'] ": { bgcolor: mode === "light" ? "success.softBg" : "neutral.softBg" },
              "& td[scope='cancelled'] ": {
                // bgcolor: mode === "light" ? `rgba(${theme.vars.palette.neutral.lightChannel})` : "neutral.softBg",
                bgcolor: mode === "light" ? "danger.softBg" : "neutral.softBg",
              },
              //   "& td[scope='und'] ": { bgcolor: `rgba(${theme.vars.palette.success.lightChannel}/0.6)` },
              '& th[scope="col"]': theme.variants.soft.neutral,
              //   "& td": theme.variants.soft.neutral,
            }),
          ]}
          variant="soft"
        >
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
              {props.role === "user" && (
                <th scope="col" style={{ width: 200, textAlign: "center", padding: "12px 6px" }}>
                  Примечание
                </th>
              )}

              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Статус
              </th>
              {props.role === "technologist" && (
                <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                  Допуск
                </th>
              )}
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
            </tr>
          </thead>
          <tbody>
            {store.SummaryStore.records.map((row) => (
              <RowComponent row={{ ...row }} role={props.role} key={row.id} />
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
};

export default observer(TableComponent);

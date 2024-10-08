import * as React from "react";
import { Sheet, Table, useColorScheme } from "@mui/joy";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import RecordDetailRowComponent from "./RecordDetailRowComponent";
// import SummaryDetailRowComponent from "./SummaryDetailRowComponent";

const RecordDetailTableComponent = () => {
  const { mode, systemMode } = useColorScheme();
  systemMode;
  const { store } = React.useContext(Context);
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
                Дата
              </th>
              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Время
              </th>
              <th scope="col" style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
                Статус записи
              </th>
              <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                Автор записи
              </th>
            </tr>
          </thead>
          <tbody>
            {store.RecordDetailStore.record?.histories
              .slice()
              .sort((a, b) => a.id - b.id)
              .map((row) => (
                <RecordDetailRowComponent row={{ ...row }} key={row.id} />
              ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
};

export default observer(RecordDetailTableComponent);

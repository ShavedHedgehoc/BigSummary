import * as React from "react";
import { Sheet, Table, useColorScheme } from "@mui/joy";
import { observer } from "mobx-react-lite";

function TableSkeleton({ children }: { children: React.ReactNode }) {
  const { mode, systemMode } = useColorScheme();
  systemMode;
  return (
    <Sheet
      className="CurrenSummaryTableContainer"
      variant="outlined"
      sx={[
        {
          display: { xs: "none", xl: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
          height: "100%",
          mb: 1,
        },
        // (theme) => ({
        //   backgroundColor: theme.variants.soft.neutral,
        // }),
      ]}
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
        {children}
      </Table>
    </Sheet>
  );
}
export default observer(TableSkeleton);

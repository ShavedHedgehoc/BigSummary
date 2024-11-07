import * as React from "react";
import { Sheet, Table, TableProps, useColorScheme } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

export default function TableLayout({ thead, children }: { thead: TheadProperties[]; children: React.ReactNode }) {
  const { mode } = useColorScheme();
  const sheetSxProps: SxProps = [
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
  ];

  const tableProps: TableProps = {
    variant: "soft",
    stickyHeader: true,
    hoverRow: true,
    "aria-labelledby": "tableTitle",
  };

  const tableSxProps: SxProps = [
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
        bgcolor: mode === "light" ? "danger.softBg" : "neutral.softBg",
      },
      '& th[scope="col"]': theme.variants.soft.neutral,
    }),
  ];

  return (
    <Sheet variant="outlined" sx={sheetSxProps}>
      <Table {...tableProps} sx={tableSxProps}>
        <thead>
          <tr>
            {thead.map((item, key) => (
              <th
                key={key}
                scope="col"
                style={{
                  width: item.width,
                  textAlign: item.align ? item.align : "center",
                  padding: item.padding ? item.padding : "12px 6px",
                }}
              >
                {item.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </Sheet>
  );
}

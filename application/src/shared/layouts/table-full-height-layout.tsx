import * as React from "react";
import { Sheet, Table, TableProps, Typography, useColorScheme } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

export default function TableFullHeightLayout({
  thead,
  children,
}: {
  thead: TheadFullHeightProperties[];
  children: React.ReactNode;
}) {
  const { mode } = useColorScheme();
  const sheetSxProps: SxProps = [
    {
      display: { xs: "none", xl: "initial" },
      width: "100%",
      maxWidth: "100%",
      borderRadius: "sm",
      //   flexShrink: 0,

      overflowY: "none",
      overflowX: "auto",
      minHeight: 0,
      minWidth: 0,

      // height: "100%",
      mb: 1,
    },
  ];

  const tableProps: TableProps = {
    variant: "soft",
    stickyHeader: true,
    size: "lg",
    hoverRow: true,
    "aria-labelledby": "tableTitle",
  };

  const tableSxProps: SxProps = [
    { minWidth: "1000px" },
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
                  verticalAlign: "middle",
                }}
              >
                <Typography
                  level="body-xs"
                  sx={{
                    writingMode: item.rotate && item.rotate === true ? "vertical-rl" : "none", // Vertical right-to-left
                    transform: item.rotate && item.rotate === true ? "rotate(180deg)" : "none", // To read top-to-bottom
                    whiteSpace: "normal",
                    margin: item.rotate && item.rotate === true ? "auto" : "none",
                  }}
                >
                  {item.value}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </Sheet>
  );
}

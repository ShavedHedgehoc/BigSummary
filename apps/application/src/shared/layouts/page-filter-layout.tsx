import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import { SxProps } from "@mui/joy/styles/types";
import { Box } from "@mui/joy";

const sheetSXProps: SxProps = [
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
];

function Left({ children }: { children: React.ReactNode }) {
  return <Box sx={{ display: "flex", gap: 2, alignItems: "center", pl: 2 }}>{children}</Box>;
}

function Right({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", pr: 2, justifyContent: "flex-end" }}>{children}</Box>
  );
}

PageFilterLayout.Left = Left;
PageFilterLayout.Right = Right;

export default function PageFilterLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Sheet variant="outlined" sx={sheetSXProps}>
        {children}
      </Sheet>
    </React.Fragment>
  );
}

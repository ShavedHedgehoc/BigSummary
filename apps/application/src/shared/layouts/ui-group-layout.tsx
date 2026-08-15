import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import { SxProps } from "@mui/joy/styles/types";
import { Box, Typography } from "@mui/joy";

const sheetSXProps: SxProps = [
  {
    display: { xs: "none", xl: "flex" },
    flexDirection: "column",
    width: "100%",
    borderRadius: "sm",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    px: 2,
    py: 2,
    borderWidth: "1px",
    mt: 2,
    mb: 1,
  },
];

function Header({ children }: { children: string }) {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", pl: 2 }}>
      <Typography level="h4">{children}</Typography>
    </Box>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        py: 2,
        justifyContent: "flex-start",
      }}
    >
      {children}
    </Box>
  );
}

UiGroupLayout.Header = Header;
UiGroupLayout.Main = Main;
export default function UiGroupLayout({ children }: { children: React.ReactNode | string }) {
  return (
    <React.Fragment>
      <Sheet variant="outlined" sx={sheetSXProps}>
        {children}
      </Sheet>
    </React.Fragment>
  );
}

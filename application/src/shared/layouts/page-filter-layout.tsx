import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import { SxProps } from "@mui/joy/styles/types";

export default function PageFilterLayout({ children }: { children: React.ReactNode }) {
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
  return (
    <React.Fragment>
      <Sheet variant="outlined" sx={sheetSXProps}>
        {children}
      </Sheet>
    </React.Fragment>
  );
}

import * as React from "react";
import { SxProps } from "@mui/joy/styles/types";
import { Sheet, useColorScheme } from "@mui/joy";

export default function ListLayout({ children }: { children: React.ReactNode }) {
  const { mode } = useColorScheme();

  const sheetSxProps: SxProps = [
    {
      gap: 2,
      width: "100%",
      borderRadius: "sm",
      flexShrink: 1,
      overflow: "auto",
      minHeight: 0,
      height: "100%",
      mb: 1,
      backgroundColor: "background.body",
      "&::-webkit-scrollbar": {
        width: { xs: "0", sm: "0.5rem" },
        backgroundColor: mode === "light" ? "var(--joy-palette-common-white)" : "var(--joy-palette-common-black)",
      },
      "&::-webkit-scrollbar-track": {
        borderRadius: "lg",
        backgroundColor: mode === "light" ? "var(--joy-palette-common-white)" : "var(--joy-palette-common-black)",
        border:
          mode === "light"
            ? "0.5px solid var(--joy-palette-neutral-300)"
            : "0.5px solid var(--joy-palette-neutral-700)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: mode === "light" ? "var(--joy-palette-neutral-300)" : "var(--joy-palette-neutral-700)",
        borderRadius: "lg",
      },
    },
  ];

  return (
    <Sheet variant="plain" sx={sheetSxProps}>
      <Sheet
        sx={{
          borderRadius: "sm",
          display: { xs: "grid", sm: "none" },
          gap: 1,
          gridTemplateColumns: "repeat(auto-fill, 100%)",
          backgroundColor: "background.body",
        }}
      >
        {children}
      </Sheet>
    </Sheet>
  );
}

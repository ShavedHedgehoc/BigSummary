import * as React from "react";
import { Box, Sheet, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

export default function TableNotFoundComponent() {
  const sheetSxProps: SxProps = [
    {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      flexShrink: 1,
      overflow: "auto",
      minHeight: 0,
      gap: 2,
      p: 1,
      borderWidth: { xs: 0, sm: "1px" },
      borderRadius: "sm",
      mb: { xs: 0, sm: 1 },
    },
    (theme) => ({
      backgroundColor: { xs: "var(--joy-palette-background-body)", sm: theme.variants.soft.neutral },
    }),
  ];
  return (
    <React.Fragment>
      <Sheet className="NoRecordsFoundContainer" variant={"outlined"} sx={sheetSxProps}>
        <Box>
          <Typography color="neutral" level="title-md" variant="plain">
            Записей не найдено
          </Typography>
        </Box>
      </Sheet>
    </React.Fragment>
  );
}

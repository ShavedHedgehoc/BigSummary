import * as React from "react";
import { Box, CircularProgress, Sheet, Typography } from "@mui/joy";

export default function NotFoundComponent() {
  return (
    <React.Fragment>
      <Sheet
        variant="soft"
        sx={{
          display: "flex",
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
          minHeight: "100%",
          gap: 2,
        }}
      >
        <Box>
          <Typography>Записей не найдено...</Typography>
        </Box>
      </Sheet>
    </React.Fragment>
  );
}

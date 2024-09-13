import * as React from "react";
import { Box, Typography } from "@mui/joy";

export default function TableLoaderComponent() {
  return (
    <React.Fragment>
      <Box
        className="PendingInfoContainer"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Typography color="neutral" level="title-md" variant="plain">
          Загружаю...
        </Typography>
      </Box>
    </React.Fragment>
  );
}

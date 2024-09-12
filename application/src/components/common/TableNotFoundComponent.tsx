import * as React from "react";
import { Box, Typography } from "@mui/joy";

export default function TableNotFoundComponent() {
  return (
    <React.Fragment>
      <Box
        className="NoRecordsFoundContainer"
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
          Записей не найдено
        </Typography>
      </Box>
    </React.Fragment>
  );
}

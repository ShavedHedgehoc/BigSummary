import * as React from "react";
// import { Box, Typography } from "@mui/joy";
import { Box, CircularProgress, Sheet, Typography } from "@mui/joy";

export default function TableLoaderComponent() {
  return (
    <React.Fragment>
      <Sheet
        className="PendingInfoContainer"
        variant="outlined"
        sx={[
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
            borderWidth: "1px",
            borderRadius: "sm",
            mb: 1,
          },
          (theme) => ({
            backgroundColor: theme.variants.soft.neutral,
          }),
        ]}
      >
        <Box>
          <CircularProgress color="neutral" variant="solid" />
        </Box>
        <Box>
          <Typography color="neutral">Загрузка...</Typography>
        </Box>
      </Sheet>
      {/* <Sheet
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
          <CircularProgress color="warning" variant="solid" />
        </Box>
        <Box>
          <Typography color="warning">Загрузка...</Typography>
        </Box>
      </Sheet> */}
    </React.Fragment>
  );
}

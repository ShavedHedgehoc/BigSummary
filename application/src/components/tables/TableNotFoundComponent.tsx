import * as React from "react";
import { Box, Sheet, Typography } from "@mui/joy";

export default function TableNotFoundComponent() {
  return (
    <React.Fragment>
      <Sheet
        className="NoRecordsFoundContainer"
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
          <Typography color="neutral" level="title-md" variant="plain">
            Записей не найдено
          </Typography>
        </Box>
      </Sheet>
      {/* <Box
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
      > */}

      {/* </Box> */}
    </React.Fragment>
  );
}

import * as React from "react";
import { Box, Typography } from "@mui/joy";
import WarningIcon from "./icons/warning-icon";

export default function NotMobileVersion() {
  return (
    <React.Fragment>
      <Box
        sx={{
          height: "100%",
          display: { xs: "flex", sm: "none" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            width: "20%",
            color: "var(--joy-palette-warning-400)",
          }}
        >
          <WarningIcon />
        </Box>
        <Typography level="body-md" sx={{ textAlign: "center", mx: 2 }}>
          К сожалению, мобильная версия этой страницы недоступна...
        </Typography>
      </Box>
    </React.Fragment>
  );
}

import { Box, Typography } from "@mui/joy";
import * as React from "react";
// import NotInterestedRoundedIcon from "@mui/icons-material/NotInterestedRounded";

export default function ServerFalldown() {
  return (
    <React.Fragment>
      <Box
        sx={{
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          flex: 1,
        }}
      >
        {/* <NotInterestedRoundedIcon sx={{ fontSize: 60, color: "red" }} /> */}
        <Typography level="h1"> ¯\_(ツ)_/¯</Typography>
        <Typography level="body-lg" sx={{ textAlign: "justify", mx: 8 }}>
          Сервер упал и давай валяться...
        </Typography>
      </Box>
    </React.Fragment>
  );
}

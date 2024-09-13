import { Box, Typography } from "@mui/joy";
import { observer } from "mobx-react-lite";
import * as React from "react";
import NotInterestedRoundedIcon from "@mui/icons-material/NotInterestedRounded";

function Forbidden() {
  return (
    <React.Fragment>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <NotInterestedRoundedIcon sx={{ fontSize: 60, color: "red" }} />
        <Typography level="h1">403</Typography>
        <Typography level="body-lg" sx={{ textAlign: "justify", mx: 8 }}>
          К сожалению, Ваших прав для посещения этой страницы недостаточно...
        </Typography>
      </Box>
    </React.Fragment>
  );
}

export default observer(Forbidden);

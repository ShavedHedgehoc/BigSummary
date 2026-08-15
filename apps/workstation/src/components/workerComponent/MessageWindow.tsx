import * as React from "react";
import { Box, Typography } from "@mui/joy";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface MessageWindowProps {
  severity: "fail" | "success";
  infoMessage: string;
}

export default function MessageWindow(props: MessageWindowProps) {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography level="h1" color="warning">
          {props.severity === "fail" ? "Ошибка" : "Успех"}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", ml: 10, mr: 10 }}>
        <Typography level="h3" color="warning" textAlign={"center"}>
          {props.infoMessage}
        </Typography>
      </Box>
    </React.Fragment>
  );
}

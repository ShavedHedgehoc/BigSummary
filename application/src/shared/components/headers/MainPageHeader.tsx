// import * as React from "react";
import { Box, Typography } from "@mui/joy";

export interface MainPageHeaderProps {
  pageTitle: string;
}

export default function MainPageHeader(props: MainPageHeaderProps) {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        mb: 1,
        gap: 1,
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "start", sm: "center" },
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Typography level="h2" component="h1">
        {props.pageTitle}
      </Typography>
    </Box>
  );
}

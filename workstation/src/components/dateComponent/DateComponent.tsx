import * as React from "react";
import { useDate } from "../../helpers/UseDate";
import { Box, Typography } from "@mui/joy";

export default function DateComponent() {
  const { date } = useDate();
  return (
    <React.Fragment>
      <Box>
        <Typography color="warning" level="h2">
          {date}
        </Typography>
      </Box>
    </React.Fragment>
  );
}

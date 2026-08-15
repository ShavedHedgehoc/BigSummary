import * as React from "react";
import { useDate } from "../../helpers/UseDate";
import { Box, Typography } from "@mui/joy";

export default function TimeComponent() {
  const { time } = useDate();
  return (
    <React.Fragment>
      <Box>
        <Typography color="warning" level="h2">
          {time}
        </Typography>
      </Box>
    </React.Fragment>
  );
}

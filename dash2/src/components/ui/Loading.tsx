import { Grid, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Grid direction={"column"} container gap={5} alignItems={"center"}>
      <CircularProgress color="warning" />
      <Typography variant="h5" textAlign={"center"}>
        Загружаю...
      </Typography>
    </Grid>
  );
}

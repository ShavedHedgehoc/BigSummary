import { Grid, Typography, Icon } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";

export default function NotFound() {
  return (
    <Grid direction={"column"} container gap={5} alignItems={"center"}>
      <Icon fontSize="large">
        <BlockIcon fontSize="large" color={"error"} />
      </Icon>
      <Typography variant="h5" textAlign={"center"}>
        Записей не найдено...
      </Typography>
    </Grid>
  );
}

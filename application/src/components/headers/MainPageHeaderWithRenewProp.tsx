import { Box, Button, Typography } from "@mui/joy";
import CachedIcon from "@mui/icons-material/Cached";

export interface MainPageHeaderWithRenewPropProps {
  title: string;
  renewData(): void;
}

export default function MainPageHeaderWithRenewProp(props: MainPageHeaderWithRenewPropProps) {
  return (
    <Box
      sx={{
        display: "flex",
        mb: 1,
        gap: 1,
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "start", sm: "center" },
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Typography level="h2" component="h1">
        {props.title}
      </Typography>
      <Box sx={{ display: { xs: "flex", sm: "none" }, width: "100%" }}>
        <Button
          color="primary"
          startDecorator={<CachedIcon />}
          size={"lg"}
          sx={{ display: "flex", minWidth: "100%" }}
          onClick={() => props.renewData()}
        >
          Обновить
        </Button>
      </Box>
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        <Button
          color="primary"
          startDecorator={<CachedIcon />}
          size={"sm"}
          sx={{ fontWeight: "normal", fontSize: "small" }}
          onClick={() => props.renewData()}
        >
          Обновить
        </Button>
      </Box>
    </Box>
  );
}

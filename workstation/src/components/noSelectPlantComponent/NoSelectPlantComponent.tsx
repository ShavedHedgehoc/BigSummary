import * as React from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/joy";
import { Context } from "../../main";

interface NoSelectPlantComponentProps {
  msg: string;
}

function NoSelectPlantComponent(props: NoSelectPlantComponentProps) {
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    const interval = setInterval(() => {
      store.HealthStore.checkHealth();
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100dvh",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Typography level="h1" color="warning">
        ¯\_(ツ)_/¯
      </Typography>
      <Typography level="h1" color="warning">
        {props.msg}
      </Typography>
    </Box>
  );
}

export default observer(NoSelectPlantComponent);

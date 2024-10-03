import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { Box, Sheet, Typography } from "@mui/joy";

const healthMessage = () => {
  const { store } = React.useContext(Context);
  React.useEffect(() => {
    store.HealthStore.checkHealth();
  }, []);
  React.useEffect(() => {
    const interval = setInterval(() => {
      store.HealthStore.checkHealth();
    }, 39 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <React.Fragment>
      {store.HealthStore.pending && (
        <Typography level="body-xs" color="neutral">
          Запрос...
        </Typography>
      )}

      {store.HealthStore.serverOk && (
        <Typography level="body-xs" color="warning">
          В порядке
        </Typography>
      )}
    </React.Fragment>
  );
};

const ObservedHeathMessage = observer(healthMessage);

function HealthComponent() {
  return (
    <React.Fragment>
      <Sheet
        className="Header"
        variant="soft"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          borderRadius: "10px",
          height: "var(--Footer-height)",
          width: "calc(100% - 2 * var(--Global-margin))",
          position: "fixed",
          bottom: "var(--Global-margin)",
          left: 0,
          mx: "var(--Global-margin)",
          px: "var(--Global-margin)",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
              width: "180px",
            }}
          >
            <Box
              sx={{
                display: "flex",

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography level="body-xs">Здоровье сервера:</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ObservedHeathMessage />
            </Box>
          </Box>
        </Box>
      </Sheet>
    </React.Fragment>
  );
}
export default HealthComponent;

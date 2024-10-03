import * as React from "react";
import InfoComponent from "../infoComponent/InfoComponent";
import TimeComponent from "../timeComponent/TimeComponent";
import DateComponent from "../dateComponent/DateComponent";
import MainFormComponent from "../workerComponent/MainFormComponent";
import { Box, Sheet, Typography, useColorScheme, GlobalStyles } from "@mui/joy";
import HealthComponent from "../healthComponent/HealthComponent";
import { observer } from "mobx-react-lite";
import HeaderComponent from "../headerComponent/HeaderComponent";
import FalldownComponent from "../falldownComponent/FalldownComponent";
import { Context } from "../../main";

function App() {
  const { setMode } = useColorScheme();
  setMode("dark");
  const { store } = React.useContext(Context);

  if (store.HealthStore.serverFalldown) {
    return <FalldownComponent />;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh", width: "100%" }}>
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Header-height": "100px",
            "--Footer-height": "40px",
            "--Global-margin": "20px",
            "--Border-radius": "10px",
          },
        })}
      />
      <HeaderComponent />
      <HealthComponent />

      <Box
        component="main"
        className="MainContent"
        sx={{
          mt: "calc(var(--Header-height) + 2 * var(--Global-margin))",
          mb: "calc(var(--Footer-height) + 2 * var(--Global-margin))",
          mx: "var(--Global-margin)",
          display: "flex",
          flex: 1,
          borderRadius: "var(--Border-radius)",
          height: "calc(100dvh - var(--Header-height) - var(--Footer-height) - 4 * var(--Global-margin))",
          gap: "var(--Global-margin)",
        }}
      >
        <Sheet
          variant="soft"
          sx={{
            display: "flex",
            height: "100%",
            flex: 1,
            flexDirection: "column",
            borderRadius: "var(--Border-radius)",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <MainFormComponent />
        </Sheet>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "700px",
            gap: 2,
            borderRadius: "var(--Border-radius)",
            flex: 1,
          }}
        >
          <Sheet
            variant="soft"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: "var(--Global-margin)",
              borderRadius: "var(--Border-radius)",
            }}
          >
            <Typography level="h3" color="warning">
              Последние записи
            </Typography>
          </Sheet>
          <Sheet
            variant="soft"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              borderRadius: "var(--Border-radius)",
              minHeight: 0,
              flexDirection: "column",
              height: "100%",
              pt: "var(--Global-margin)",
              pb: "var(--Global-margin)",
              px: "var(--Global-margin)",
            }}
          >
            <InfoComponent />
          </Sheet>
          <Sheet
            variant="soft"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              borderRadius: "var(--Border-radius)",
              pt: "var(--Global-margin)",
              pb: "var(--Global-margin)",
              px: "var(--Global-margin)",
            }}
          >
            <DateComponent />
          </Sheet>
          <Sheet
            variant="soft"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              borderRadius: "var(--Border-radius)",
              pt: "var(--Global-margin)",
              pb: "var(--Global-margin)",
              px: "var(--Global-margin)",
            }}
          >
            <TimeComponent />
          </Sheet>
        </Box>
      </Box>
    </Box>
  );
}

export default observer(App);

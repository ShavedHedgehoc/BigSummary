import { Box, Sheet, useColorScheme } from "@mui/joy";
import { keyframes } from "@emotion/react";

import { ITraceCanData } from "../../shared/api/services/trace-cans-service";

const pulse = keyframes`
    0% {
            transform: scale(0.95);        
        }
    70% {
        transform: scale(1);        
    }
    100% {
        transform: scale(0.95);        
    }
`;

export default function CanDashCard({ row }: { row: ITraceCanData }) {
  const { mode } = useColorScheme();

  return (
    <Sheet
      variant="outlined"
      sx={[
        {
          borderRadius: "sm",
          display: "flex",
          gap: 0.5,
          px: 2,
          py: 1, //1
          width: "80px",
          ...(row.isUpdated && { animation: `${pulse} 1s infinite` }),
        },

        () => ({
          // bgcolor: "neutral.softBg",
          bgcolor: mode === "light" ? "common.white" : "neutral.softBg",
          color: mode === "light" ? "var(--joy-palette-neutral-400)" : "white",
          //can_from_product slate-100
          ...(row.stateValue === "can_from_product" && {
            color: "#020617",
            bgcolor: mode === "light" ? "#F1F5F9" : "#F1F5F9",
          }),
          //can_washed blue
          ...(row.stateValue === "can_washed" && {
            // color: mode === "light" ? "#020617" : "common.white",
            color: "common.white",
            bgcolor: mode === "light" ? "#38bdf8" : "#0369a1",
          }),
          //can_ready green
          ...(row.stateValue === "can_ready" && {
            // color: "common.white",
            color: mode === "light" ? "#020617" : "common.white",
            bgcolor: mode === "light" ? "#BBF7D0" : "#15803d",
          }),
          //can_carantine red
          ...(row.stateValue === "can_carantine" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#f87171" : "#b91c1c",
          }),

          //can_desinfected fuchsia
          ...(row.stateValue === "can_desinfected" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#e879f9" : "#a21caf",
          }),

          //can_need_wash brown
          ...(row.stateValue === "can_need_wash" && {
            color: "common.white",
            // bgcolor: mode === "light" ? "#A16207" : "#B45309", // первый вариант
            // bgcolor: mode === "light" ? "#A16207" : "#451A03", //говно с кровью
            bgcolor: mode === "light" ? "#A16207" : "#78350F", //просто говно
          }),

          //can_correct yellow
          ...(row.stateValue === "can_correct" && {
            color: "#020617",
            bgcolor: mode === "light" ? "#FEF08A" : "#FACC15",
          }),
        }),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1rem",
        }}
      >
        {row.name}
      </Box>
    </Sheet>
  );
}

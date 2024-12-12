import { Box, Sheet, useColorScheme } from "@mui/joy";
import { keyframes } from "@emotion/react";
import { formatTimeToString } from "../../shared/helpers/date-time-formatters";

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

export default function DashCard({ row }: { row: IDocRow }) {
  const { mode } = useColorScheme();

  return (
    <Sheet
      variant="outlined"
      sx={[
        {
          borderRadius: "sm",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          px: 2,
          py: 1,
          ...(row.isUpdated && { animation: `${pulse} 1s infinite` }),
        },
        () => ({
          bgcolor: "neutral.softBg",
          color: mode === "light" ? "var(--joy-palette-neutral-400)" : "white",
          ...(row.stateValue === "product_pass" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#4ade80" : "#15803d",
          }),
          ...(row.stateValue === "product_finished" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#e879f9" : "#a21caf",
          }),
          ...(row.stateValue === "product_in_progress" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#38bdf8" : "#0369a1",
          }),
          ...(row.stateValue === "product_fail" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#f87171" : "#b91c1c",
          }),
          ...(row.stateValue === "product_check" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#facc15" : "#a16207",
          }),
          ...(!row.stateValue &&
            row.isSet && {
              color: "common.white",
              bgcolor: mode === "light" ? "#94a3b8" : "#475569",
            }),
          ...(row.stateValue === "product_correct" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#facc15" : "#a16207",
          }),
          ...(row.stateValue === "plug_pass" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#94a3b8" : "#475569",
          }),
          ...(row.stateValue === "base_check" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#94a3b8" : "#475569",
          }),
          ...(row.stateValue === "base_correct" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#94a3b8" : "#475569",
          }),
          ...(row.stateValue === "base_continue" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#94a3b8" : "#475569",
          }),
        }),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          fontSize: "1.125rem",
        }}
      >
        {row.conveyor}
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "0.75rem",
          }}
        >
          {row.product}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",

            fontSize: "0.75rem",
          }}
        >
          {row.boil}
        </Box>
      </Box>
      <Box
        sx={[
          {
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "0.75rem",
          },
          () => ({
            ...(row.stateValue === "base_check" && {
              color: mode === "light" ? "#fef08a" : "#fde047",
            }),
            ...(row.stateValue === "base_correct" && {
              color: mode === "light" ? "#fef08a" : "#fde047",
            }),
            ...(row.stateValue === "base_continue" && {
              color: mode === "light" ? "#fef08a" : "#fde047",
            }),
            ...(row.stateValue === "plug_pass" && {
              color: mode === "light" ? "#bbf7d0" : "#86efac",
            }),
            ...(row.stateValue === "base_fail" && {
              color: mode === "light" ? "#fecaca" : "#fca5a5",
            }),
          }),
        ]}
      >
        {row.state}
      </Box>
      {row.state !== "-" && (
        <Box
          sx={{
            position: "absolute",
            top: "0.75rem",
            right: "1rem",
            display: "flex",
            justifyContent: "flex-start",
            color: "white",
            fontSize: "0.75rem",
          }}
        >
          {formatTimeToString(row.stateTime)}
        </Box>
      )}
    </Sheet>
  );
}

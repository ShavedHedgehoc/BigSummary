import { Box, Sheet, useColorScheme } from "@mui/joy";
import { keyframes } from "@emotion/react";
import { formatDateToString, formatTimeToString } from "../../shared/helpers/date-time-formatters";
import { ITraceCanData } from "../../shared/api/services/trace-cans-service";
import { useCansHistoryModalStore } from "./store/use-cans-history-modal-store";
import { useShallow } from "zustand/shallow";

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

export default function CanCard({ row }: { row: ITraceCanData }) {
  const { mode } = useColorScheme();

  const setOpen = useCansHistoryModalStore(useShallow((state) => state.setOpen));
  const setCanId = useCansHistoryModalStore(useShallow((state) => state.setCanId));
  const setTitle = useCansHistoryModalStore(useShallow((state) => state.setTitle));

  const handleClick = () => {
    setCanId(row.id);
    setTitle("История записей");
    setOpen(true);
  };

  return (
    <Sheet
      slotProps={{ root: { onClick: () => handleClick() } }}
      variant="outlined"
      sx={[
        {
          borderRadius: "sm",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          px: 2,
          py: 1, //1
          minHeight: "166px",
          ...(row.isUpdated && { animation: `${pulse} 1s infinite` }),
        },
        () => ({
          "&&:hover": {
            cursor: "pointer",
            bgcolor: mode === "light" ? "var(--joy-palette-neutral-800)" : "var(--joy-palette-neutral-500)",
          },
        }),

        () => ({
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
          justifyContent: "flex-start",
          fontSize: "2rem",
        }}
      >
        {row.name}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          fontSize: "1rem",
          flexGrow: 1,
        }}
      >
        <Box>{row.baseContainMarking}</Box>
        <Box>{row.baseContain}</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          fontSize: "1rem",
          // flexGrow: 1,
          // backgroundColor: "red",
        }}
      >
        {row.state !== "-" ? row.state : ""}
      </Box>
      <Box
        sx={[
          {
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "0.75rem",
          },
        ]}
      >
        {row.author}
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        V - {row.volume} м<sup>3</sup>
      </Box>

      {row.state !== "-" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: "0.75rem",
          }}
        >
          <Box>{formatDateToString(row.stateTime)}</Box>
          <Box>{formatTimeToString(row.stateTime)}</Box>
        </Box>
      )}
    </Sheet>
  );
}

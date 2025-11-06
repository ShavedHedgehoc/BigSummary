import { Box, Sheet, useColorScheme } from "@mui/joy";
import { keyframes } from "@emotion/react";
import { formatTimeToString } from "../../shared/helpers/date-time-formatters";
import { useShallow } from "zustand/react/shallow";
import { useForemanActionModalStore } from "./store/use-foreman-action-modal-store";

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

export default function ForemanCard({ row }: { row: IDocRow }) {
  const { mode } = useColorScheme();
  const setOpen = useForemanActionModalStore(useShallow((state) => state.setOpen));
  const setRecord = useForemanActionModalStore(useShallow((state) => state.setRecord));

  const setStartButtonEnabled = useForemanActionModalStore(useShallow((state) => state.setStartButtonEnabled));
  const setFinishButtonEnabled = useForemanActionModalStore(useShallow((state) => state.setFinishButtonEnabled));
  const setCancelStartButtonEnabled = useForemanActionModalStore(
    useShallow((state) => state.setCancelStartButtonEnabled)
  );
  const setCancelFinishButtonEnabled = useForemanActionModalStore(
    useShallow((state) => state.setCancelFinishButtonEnabled)
  );

  const handleOpenHistoryModalButtonClick = () => {
    setCancelFinishButtonEnabled(row.stateValue === "product_finished");
    setFinishButtonEnabled(row.stateValue === "product_in_progress");
    setStartButtonEnabled(row.stateValue === "product_pass");

    if (row.stateValue === "product_in_progress") {
      setCancelStartButtonEnabled(true);
    } else {
      setCancelStartButtonEnabled(false);
    }
    setRecord(row);

    setOpen(true);
  };

  return (
    <Sheet
      variant="outlined"
      slotProps={{ root: { onClick: () => handleOpenHistoryModalButtonClick() } }}
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
          //   bgcolor: "neutral.softBg",
          //   color: mode === "light" ? "var(--joy-palette-neutral-400)" : "white",
          color: mode === "light" ? "common.white" : "common.black",
          bgcolor: mode === "light" ? "#94a3b8" : "#1f2937",
          ...(row.stateValue === "product_pass" && {
            // color: "common.white",
            // bgcolor: mode === "light" ? "#4ade80" : "#15803d",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#16a34a" : "#bbf7d0",
          }),
          ...(row.stateValue === "product_finished" && {
            // color: "common.white",
            // bgcolor: mode === "light" ? "#e879f9" : "#a21caf",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#c026d3" : "#f5d0fe",
          }),
          ...(row.stateValue === "product_in_progress" && {
            // color: "common.white",
            // bgcolor: mode === "light" ? "#38bdf8" : "#0369a1",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#0284c7" : "#bae6fd",
          }),
          ...(row.stateValue === "product_fail" && {
            // color: "common.white",
            // bgcolor: mode === "light" ? "#f87171" : "#b91c1c",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#dc2626" : "#fecaca",
          }),
          ...(row.stateValue === "product_check" && {
            // color: "common.white",
            // bgcolor: mode === "light" ? "#facc15" : "#a16207",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#ca8a04" : "#fef08a",
          }),
          ...(row.stateValue === "product_correct" && {
            // color: "common.white",
            // bgcolor: mode === "light" ? "#facc15" : "#a16207",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#ca8a04" : "#fef08a",
          }),
          ...(!row.stateValue &&
            row.isSet && {
              //   color: "common.white",
              //   bgcolor: mode === "light" ? "#94a3b8" : "#475569",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
            }),

          ...(row.stateValue === "plug_pass" && {
            // color: "common.white",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
          }),
          ...(row.stateValue === "base_check" && {
            // color: "common.white",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
          }),
          ...(row.stateValue === "base_correct" && {
            // color: "common.white",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
          }),
          ...(row.stateValue === "base_continue" && {
            // color: "common.white",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
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
          //   () => ({
          //     ...(row.stateValue === "base_check" && {
          //       color: mode === "light" ? "#fef08a" : "#fde047",
          //     }),
          //     ...(row.stateValue === "base_correct" && {
          //       color: mode === "light" ? "#fef08a" : "#fde047",
          //     }),
          //     ...(row.stateValue === "base_continue" && {
          //       color: mode === "light" ? "#fef08a" : "#fde047",
          //     }),
          //     ...(row.stateValue === "plug_pass" && {
          //       color: mode === "light" ? "#bbf7d0" : "#86efac",
          //     }),
          //     ...(row.stateValue === "base_fail" && {
          //       color: mode === "light" ? "#fecaca" : "#fca5a5",
          //     }),
          //   }),
        ]}
      >
        {row.state}
      </Box>
      {row.state !== "-" &&
        row.stateValue !== "base_check" &&
        row.stateValue !== "base_correct" &&
        row.stateValue !== "base_continue" &&
        row.stateValue !== "plug_pass" &&
        row.stateValue !== "base_fail" && (
          <Box
            sx={{
              position: "absolute",
              top: "0.75rem",
              right: "1rem",
              display: "flex",
              justifyContent: "flex-start",
              color: mode === "light" ? "common.white" : "common.black",
              fontSize: "0.75rem",
            }}
          >
            {formatTimeToString(row.stateTime)}
          </Box>
        )}
    </Sheet>
  );
}

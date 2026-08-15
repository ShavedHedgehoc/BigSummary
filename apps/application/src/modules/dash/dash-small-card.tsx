import { Box, Sheet, useColorScheme } from "@mui/joy";
import { keyframes } from "@emotion/react";
import { useDashHistoryModalStore } from "./store/use-dash-history-modal-store";
import { useShallow } from "zustand/react/shallow";
import { DbRoles } from "../../shared/db-roles";
import { useAuthStore } from "../auth/store/auth-store";

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

export default function DashSmallCard({ row }: { row: IDocRow }) {
  const { mode } = useColorScheme();

  const setOpen = useDashHistoryModalStore(useShallow((state) => state.setOpen));
  const setRecordId = useDashHistoryModalStore(useShallow((state) => state.setRecordId));
  const setTitle = useDashHistoryModalStore(useShallow((state) => state.setTitle));
  const user = useAuthStore(useShallow((state) => state.user));

  const handleClick = () => {
    if (user?.roles?.includes(DbRoles.CARDS)) {
      setRecordId(row.id);
      setTitle(`Историй статусов по продукту ${row.product}, партия - ${row.boil}`);
      setOpen(true);
    }
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
          justifyContent: "center",
          //   gap: 1,
          px: 1,
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
          justifyContent: "center",
          fontSize: "1.125rem",
        }}
      >
        {row.conveyor}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",

          fontSize: "0.75rem",
        }}
      >
        {row.boil}
      </Box>
    </Sheet>
  );
}

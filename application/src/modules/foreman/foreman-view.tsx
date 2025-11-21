import { useShallow } from "zustand/react/shallow";

import { useCurrentRecords } from "../../shared/api/use-current-records";
import { SxProps } from "@mui/joy/styles/types";
import { Sheet, useColorScheme } from "@mui/joy";
import { useForemanFilterStore } from "./store/use-foreman-filter-store";
import ForemanCard from "./foreman-card";

export default function ForemanView() {
  const { mode } = useColorScheme();
  const filter = useForemanFilterStore(useShallow((state) => state.filter));
  const { isPending, data, isSuccess } = useCurrentRecords({ filter: filter });

  const sheetSxProps: SxProps = [
    {
      gap: 2,
      width: "100%",
      borderRadius: "sm",
      flexShrink: 1,
      overflow: "auto",
      minHeight: 0,
      height: { xs: "100%", sm: 0 },
      mb: 1,
      backgroundColor: "background.body",
      "&::-webkit-scrollbar": {
        width: { xs: "0", sm: "0.5rem" },
        backgroundColor: mode === "light" ? "var(--joy-palette-common-white)" : "var(--joy-palette-common-black)",
      },
      "&::-webkit-scrollbar-track": {
        borderRadius: "lg",
        backgroundColor: mode === "light" ? "var(--joy-palette-common-white)" : "var(--joy-palette-common-black)",
        border:
          mode === "light"
            ? "0.5px solid var(--joy-palette-neutral-300)"
            : "0.5px solid var(--joy-palette-neutral-700)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: mode === "light" ? "var(--joy-palette-neutral-300)" : "var(--joy-palette-neutral-700)",
        borderRadius: "lg",
      },
    },
  ];

  if (isPending) {
    return;
  }

  if (isSuccess && data.records.length === 0) {
    return;
  }
  return (
    <Sheet variant="plain" sx={sheetSxProps}>
      <Sheet
        sx={{
          borderRadius: "sm",
          display: { xs: "grid", sm: "none" },
          gap: 1,
          gridTemplateColumns: "repeat(auto-fill, 100%)",
          backgroundColor: "background.body",
        }}
      >
        {isSuccess && data.records.map((row) => <ForemanCard key={`Card_${row.id}`} row={row} />)}
      </Sheet>
    </Sheet>
  );
}

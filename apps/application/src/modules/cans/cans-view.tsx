import { SxProps } from "@mui/joy/styles/types";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { Sheet, useColorScheme } from "@mui/joy";

import { useCans } from "./use-cans";
import CanCard from "./can-card";
import { useCansFilterStore } from "./filter/store/use-cans-filter-store";
import { useShallow } from "zustand/react/shallow";

export default function CansView() {
  const { mode } = useColorScheme();
  const filter = useCansFilterStore(useShallow((state) => state.filter));
  const { isPending, data, isSuccess } = useCans({ filter: filter });

  const sheetSxProps: SxProps = [
    {
      gap: 2,
      width: "100%",
      borderRadius: "sm",
      flexShrink: 1,
      overflow: "auto",
      minHeight: 0,
      height: "100%",
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
    return <TableLoaderComponent />;
  }

  if (isSuccess && data.length === 0) {
    return <TableNotFoundComponent />;
  }
  return (
    <Sheet variant="plain" sx={sheetSxProps}>
      <Sheet
        sx={{
          borderRadius: "sm",
          display: "grid",
          gap: 1,
          gridTemplateColumns: {
            xs: `${"repeat(auto-fill, 100%)"}`,
            sm: `repeat(auto-fill, [col-start] minmax(${250}px, 1fr) [col-end])`,
          },
          backgroundColor: "background.body",
        }}
      >
        {isSuccess && data.map((row) => <CanCard key={`Card_${row.id}`} row={row} />)}
      </Sheet>
    </Sheet>
  );
}

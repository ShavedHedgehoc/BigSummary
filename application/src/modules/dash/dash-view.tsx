import { useShallow } from "zustand/shallow";
import DashCard from "./dash-card";
import { useDashFilterStore } from "./store/dash-filter-store";
import { useCurrentRecords } from "../../shared/api/use-current-records";
import { SxProps } from "@mui/joy/styles/types";
import TableLoaderComponent from "../../components/tables/TableLoaderComponent";
import TableNotFoundComponent from "../../components/tables/TableNotFoundComponent";
import { Sheet, useColorScheme } from "@mui/joy";

export default function DashView() {
  const { mode } = useColorScheme();
  const filter = useDashFilterStore(useShallow((state) => state.filter));
  const { isPending, data, isSuccess } = useCurrentRecords({ filter: filter });

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

  if (isSuccess && data.records.length === 0) {
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
            xs: "repeat(auto-fill, 100%)",
            sm: "repeat(auto-fill, [col-start] minmax(200px, 1fr) [col-end])",
          },
          backgroundColor: "background.body",
        }}
      >
        {isSuccess && data.records.map((row) => <DashCard key={`Card_${row.id}`} row={row} />)}
      </Sheet>
    </Sheet>
  );
}

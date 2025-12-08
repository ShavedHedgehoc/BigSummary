// import { useShallow } from "zustand/react/shallow";
// import DashCard from "./dash-card";
// import { useDashFilterStore } from "./store/use-dash-filter-store";
// import { useCurrentRecords } from "../../shared/api/use-current-records";
import { SxProps } from "@mui/joy/styles/types";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { Sheet, useColorScheme } from "@mui/joy";
import { useTubeConveyorsData } from "../../shared/api/use-tube-conveyors-data";
import DashTubeConveyorCard from "./dash-tube-conveyor-card";

function ConveyorCard() {}

export default function DashTubeView() {
  const { mode } = useColorScheme();

  //   const smallCardView = useDashFilterStore(useShallow((state) => state.smallCardView));
  const { isPending, data, isSuccess } = useTubeConveyorsData();

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

  if (isSuccess && data.conveyors.length === 0) {
    return <TableNotFoundComponent />;
  }
  return (
    <Sheet variant="plain" sx={sheetSxProps}>
      <Sheet
        sx={{
          borderRadius: "sm",
          display: "grid",
          height: "100%",
          gap: 2,
          gridTemplateColumns: {
            // xs: "repeat(auto-fill, 100%)",`repeat(auto-fill, [col-start] minmax(${smallCardView ? 80 : 250}px, 1fr) [col-end])`,
            // xs: `${
            //   smallCardView ? "repeat(auto-fill, [col-start] minmax(80px, 1fr) [col-end])" : "repeat(auto-fill, 100%)"
            // }`,
            sm: `repeat(2, 1fr)`,
          },
          gridTemplateRows: { sm: `repeat(2, 1fr)` },
          backgroundColor: "background.body",
        }}
      >
        {isSuccess &&
          data.conveyors.map((conveyor) => (
            <DashTubeConveyorCard key={`ConveyorCard_${conveyor.id}`} conveyor={conveyor} />
          ))}
      </Sheet>
    </Sheet>
  );
}

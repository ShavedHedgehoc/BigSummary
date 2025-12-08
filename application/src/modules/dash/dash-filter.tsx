import { useDashFilterStore } from "./store/use-dash-filter-store";
import { DashFilterParams } from "./dash-filter-params";
import { Box, Sheet } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import DashFilterPlantSelector from "./dash-filter-plant-selector";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../auth/store/auth-store";
import DashFilterSwitcher from "./dash-filter-switcher";
import MobileDashFilter from "./dash-mobile-switcher";
import DashFilterModeSelector from "./dash-filter-mode-selector";
import { useDashModeStore } from "./store/use-dash-mode-store";

export default function DashFilter() {
  const mode = useDashModeStore(useShallow((state) => state.mode));
  const user = useAuthStore(useShallow((state) => state.user));
  const plantSelectorOptions = useDashFilterStore(useShallow((state) => state.plantSelectorOptions));
  const setSelectedPlant = useDashFilterStore(useShallow((state) => state.setSelectedPlant));
  const changeFilter = useDashFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useDashFilterStore(useShallow((state) => state.selectedPlant));

  if (user && plantSelectorOptions.length && !selectedPlant) {
    const plant_id = user?.settings?.plant_id || plantSelectorOptions[0].id;
    setSelectedPlant(plant_id);
    changeFilter({ key: DashFilterParams.PLANT, value: "", values: [plant_id] });
  }

  const sheetSXProps: SxProps = [
    {
      display: { xs: "none", sm: "flex" },
      width: "100%",
      borderRadius: "sm",
      // justifyContent: "flex-end",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 2,
      py: 1,
      borderWidth: "1px",
      mb: 1,
      backgroundColor: "background.body",
    },
  ];
  return (
    <>
      <MobileDashFilter />
      <Sheet variant="plain" sx={sheetSXProps}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <DashFilterModeSelector />
        </Box>
        {mode === "packaging" && (
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <DashFilterSwitcher />
            <DashFilterPlantSelector />
          </Box>
        )}
      </Sheet>
    </>
  );
}

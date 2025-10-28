import { useDashFilterStore } from "./store/dash-filter-store";
import { DashFilterParams } from "./dash-filter-params";
import { Box, Dropdown, IconButton, Menu, MenuButton, MenuItem, Sheet } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DashFilterPlantSelector from "./dash-filter-plant-selector";
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "../auth/store/auth-store";
import DashFilterSwitcher from "./dash-filter-switcher";

function MobileDashFilter() {
  const { plantSelectorOptions, setSelectedPlant, changeFilter } = useDashFilterStore();
  const handleChange = (newValue: number | null) => {
    newValue && setSelectedPlant(newValue);
    newValue && changeFilter({ key: DashFilterParams.PLANT, value: "", values: [newValue] });
  };
  return (
    <Box
      sx={{ display: { xs: "initial", sm: "none" }, position: "absolute", right: "1rem", top: "4rem", zIndex: 99999 }}
    >
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "soft", color: "neutral", size: "md" } }}
        >
          <FilterAltOutlinedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          {plantSelectorOptions.map((plant) => (
            <MenuItem key={`Record_filter_plant_option_${plant.id}`} onClick={() => handleChange(plant.id)}>
              {plant.value}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    </Box>
  );
}

export default function DashFilter() {
  const user = useAuthStore(useShallow((state) => state.user));
  const plantSelectorOptions = useDashFilterStore(useShallow((state) => state.plantSelectorOptions));
  const setSelectedPlant = useDashFilterStore(useShallow((state) => state.setSelectedPlant));
  const changeFilter = useDashFilterStore(useShallow((state) => state.changeFilter));
  if (user && plantSelectorOptions.length) {
    const plant_id = user?.settings?.plant_id || plantSelectorOptions[0].id;
    setSelectedPlant(plant_id);
    changeFilter({ key: DashFilterParams.PLANT, value: "", values: [plant_id] });
  }

  const sheetSXProps: SxProps = [
    {
      display: { xs: "none", sm: "flex" },
      width: "100%",
      borderRadius: "sm",
      justifyContent: "flex-end",
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
          <DashFilterSwitcher />
          <DashFilterPlantSelector />
        </Box>
      </Sheet>
    </>
  );
}

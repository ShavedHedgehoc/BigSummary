import { Box, Dropdown, MenuButton, IconButton, Menu, MenuItem } from "@mui/joy";
import { useShallow } from "zustand/react/shallow";
import { DashFilterParams } from "./dash-filter-params";
import { useDashFilterStore } from "./store/use-dash-filter-store";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

export default function MobileDashFilter() {
  // const { plantSelectorOptions, setSelectedPlant, changeFilter } = useDashFilterStore();
  const plantSelectorOptions = useDashFilterStore(useShallow((state) => state.plantSelectorOptions));
  const setSelectedPlant = useDashFilterStore(useShallow((state) => state.setSelectedPlant));
  const changeFilter = useDashFilterStore(useShallow((state) => state.changeFilter));
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

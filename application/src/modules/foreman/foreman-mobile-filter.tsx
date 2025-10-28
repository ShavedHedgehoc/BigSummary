import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import { useForemanFilterStore } from "./store/use-foreman-filter-store";
import { Dropdown, Menu, MenuItem, MenuButton } from "@mui/joy";
import { ForemanFilterParams } from "./filter/foreman-filter-params";
import { useQuery } from "@tanstack/react-query";
import PlantService from "../../shared/api/services/plant-service";
import { useShallow } from "zustand/react/shallow";

export default function MobileForemanFilter() {
  const changeFilter = useForemanFilterStore(useShallow((state) => state.changeFilter));

  const setSelectedPlant = useForemanFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useForemanFilterStore(useShallow((state) => state.plantSelectorOptions));

  // useQuery({
  //   queryKey: ["plants_options", "foreman"],
  //   queryFn: async () => {
  //     const data = await PlantService.getAllPlants();
  //     if (data) {
  //       fillPlantSelectorOptions(data);
  //       setSelectedPlant(data[1].id);
  //       changeFilter({ key: ForemanFilterParams.PLANT, value: "", values: [data[1].id] });
  //       return data;
  //     }
  //   },
  // });

  const handleChange = (newValue: number | null) => {
    newValue && setSelectedPlant(newValue);
    newValue && changeFilter({ key: ForemanFilterParams.PLANT, value: "", values: [newValue] });
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

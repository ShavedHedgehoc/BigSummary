import * as React from "react";
import { useDashFilterStore } from "./store/dash-filter-store";
import { usePlants } from "../../shared/api/use-plants";
import { DashFilterParams } from "./store/dash-filter-params";
import { Box, Dropdown, IconButton, Menu, MenuButton, MenuItem, Sheet } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DashFilterPlantSelector from "./dash-filter-plant-selector";
import FilterSwitchButton, { FilterSwitchButtonProps } from "../../shared/ui/filter-switch-button";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useShallow } from "zustand/shallow";

function MobileDashFilter() {
  const { data, isSuccess } = usePlants();
  const { plantSelectorOptions, setSelectedPlant, fillPlantSelectorOptions, changeFilter } = useDashFilterStore();

  React.useEffect(() => {
    if (isSuccess) {
      fillPlantSelectorOptions(data);
      setSelectedPlant(data[1].id);
      changeFilter({ key: DashFilterParams.PLANT, value: "", values: [data[1].id] });
    }
  }, [data]);

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

function DashFilterSwitcher() {
  const smallCardView = useDashFilterStore(useShallow((state) => state.smallCardView));
  const setSmallCardView = useDashFilterStore(useShallow((state) => state.setSmallCardView));
  const switchButtonProps: FilterSwitchButtonProps = {
    falseDecorator: <AddCircleOutlineIcon />,
    trueDecorator: <RemoveCircleOutlineIcon />,
    condition: smallCardView,
    onClick: () => setSmallCardView(!smallCardView),
  };
  return <FilterSwitchButton {...switchButtonProps} />;
}

export default function DashFilter() {
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
      {/* <DashFilterSwitcher /> */}
      <Sheet variant="plain" sx={sheetSXProps}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <DashFilterSwitcher />
          <DashFilterPlantSelector />
        </Box>
      </Sheet>
    </>
  );
}

import * as React from "react";
import { useDashFilterStore } from "./store/dash-filter-store";
import { usePlants } from "../../shared/api/use-plants";
import { DashFilterParams } from "./store/dash-filter-params";
import {
  Box,
  Dropdown,
  FormControl,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Option,
  Select,
  SelectStaticProps,
  Sheet,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const DashPlantSelector = () => {
  const { data, isSuccess } = usePlants();
  const { selectedPlant, plantSelectorOptions, setSelectedPlant, fillPlantSelectorOptions, changeFilter } =
    useDashFilterStore();

  React.useEffect(() => {
    if (isSuccess) {
      fillPlantSelectorOptions(data);
      setSelectedPlant(data[1].id);
      changeFilter({ key: DashFilterParams.PLANT, value: "", values: [data[1].id] });
    }
  }, [data]);

  const action: SelectStaticProps["action"] = React.useRef(null);
  const handleChange = (newValue: number | null) => {
    newValue && setSelectedPlant(newValue);
    newValue && changeFilter({ key: DashFilterParams.PLANT, value: "", values: [newValue] });
  };
  return (
    <Box sx={{ display: "flex", py: 0.5 }}>
      <FormControl size="sm" id={"plants"}>
        <Select
          action={action}
          size="sm"
          placeholder="Выберите площадку"
          value={selectedPlant}
          slotProps={{
            button: { sx: { whiteSpace: "nowrap" } },
            listbox: { sx: { zIndex: 999999 } },
          }}
          sx={{
            minWidth: "220px",
            maxWidth: "220px",
            display: "flex",
            flexShrink: 1,
          }}
          onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
            event && newValue && handleChange(newValue);
          }}
        >
          {plantSelectorOptions.map((plant) => (
            <Option value={plant.id} key={`Record_filter_plant_option_${plant.id}`}>
              <FormControl size="sm">{plant.value}</FormControl>
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

function MobileDashFilter() {
  const { data, isSuccess } = usePlants();
  const { plantSelectorOptions, selectedPlant, setSelectedPlant, fillPlantSelectorOptions, changeFilter } =
    useDashFilterStore();

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
      <Sheet variant="plain" sx={sheetSXProps}>
        <DashPlantSelector />
      </Sheet>
    </>
  );
}

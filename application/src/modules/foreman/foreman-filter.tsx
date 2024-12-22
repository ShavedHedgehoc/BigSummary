import * as React from "react";

import Box from "@mui/joy/Box";

import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import FormHelperText from "@mui/joy/FormHelperText";
import Select, { SelectStaticProps } from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { usePlants } from "../../shared/api/use-plants";

import SearchIcon from "@mui/icons-material/Search";
import { useShallow } from "zustand/shallow";
import PageFilterLayout from "../../shared/layouts/page-filter-layout";
import { useForemanFilterStore } from "./store/use-foreman-filter-store";

import { Dropdown, Menu, MenuItem, MenuButton, useColorScheme } from "@mui/joy";
import { useProductsHistoryTypes } from "../../shared/api/use-products-history-types";
import { ForemanFilterParams } from "./foreman-filter-params";
import ForemanFilterCodeInput from "./foreman-filter-code-input";
import ForemanFilterClearButton from "./foreman-filter-clear-button";
import ForemanFilterPlantSelector from "./foreman-filter-plant-selector";
import ForemanFilterBatchInput from "./foreman-filter-batch-input";
import ForemanFilterMarkingInput from "./foreman-filter-marking-input";
import ForemanFilterStateSelector from "./foreman-filter-state-selector";

const StateSelector = () => {
  const { data, isSuccess } = useProductsHistoryTypes();
  const { changeFilter, filter, stateSelectorOptions, fillStateSelectorOptions } = useForemanFilterStore();
  const action: SelectStaticProps["action"] = React.useRef(null);
  React.useEffect(() => {
    if (isSuccess) {
      fillStateSelectorOptions(data);
      // changeFilter({ key: ForemanFilterParams.STATES, value: "", values: [1] });
    }
  }, [data]);
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={ForemanFilterParams.STATES}>
        <Select
          action={action}
          size="sm"
          multiple
          placeholder="Выберите статус"
          value={[...filter.states]}
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
          onChange={(event: React.SyntheticEvent | null, newValue: number[] | null) => {
            event && newValue && changeFilter({ key: ForemanFilterParams.STATES, value: "", values: newValue });
          }}
          {...(filter.states.length > 0 && {
            endDecorator: (
              <IconButton
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  changeFilter({ key: ForemanFilterParams.STATES, value: "", values: [] });
                  action.current?.focusVisible();
                }}
              >
                <CloseRounded />
              </IconButton>
            ),
            indicator: null,
          })}
        >
          {stateSelectorOptions.map((historyType) => (
            <Option value={historyType.id} key={historyType.id}>
              <FormControl size="sm">
                <Checkbox
                  color="neutral"
                  checked={[...filter.states].includes(historyType.id)}
                  label={historyType.description}
                />
              </FormControl>
            </Option>
          ))}
        </Select>
        <FormHelperText>Поиск по статусу</FormHelperText>
      </FormControl>
    </Box>
  );
};

function MobileForemanFilter() {
  const { data, isSuccess } = usePlants();
  const { plantSelectorOptions, setSelectedPlant, fillPlantSelectorOptions, changeFilter } = useForemanFilterStore();

  React.useEffect(() => {
    if (isSuccess) {
      fillPlantSelectorOptions(data);
      setSelectedPlant(data[1].id);
      changeFilter({ key: ForemanFilterParams.PLANT, value: "", values: [data[1].id] });
    }
  }, [data]);

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

export default function ForemanFilter() {
  return (
    <>
      <MobileForemanFilter />
      <PageFilterLayout>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", pl: 2 }}>
          <ForemanFilterCodeInput />
          <ForemanFilterMarkingInput />
          <ForemanFilterBatchInput />
          <ForemanFilterStateSelector />

          <ForemanFilterPlantSelector />
        </Box>
        <ForemanFilterClearButton />
      </PageFilterLayout>
    </>
  );
}

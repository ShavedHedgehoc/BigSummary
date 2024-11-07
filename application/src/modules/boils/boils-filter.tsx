import * as React from "react";
import {
  Box,
  Input,
  Button,
  IconButton,
  FormControl,
  useColorScheme,
  FormHelperText,
  Select,
  Option,
  Checkbox,
  SelectStaticProps,
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { BoilsFilterParams } from "./boils-filter-params";
import { useBoilsFilterStore } from "./store/use-boils-filter-store";

import { usePlants } from "../../shared/api/use-plants";
import { useBoilsHistoryTypes } from "../../shared/api/use-boils-history-types";
import PageFilterLayout from "../../shared/layouts/page-filter-layout";
import { useShallow } from "zustand/shallow";

const BoilsFilterPlantSelector = () => {
  const { data, isSuccess } = usePlants();
  const { changeFilter, selectedPlant, setSelectedPlant, plantSelectorOptions, fillPlantSelectorOptions } =
    useBoilsFilterStore();

  React.useEffect(() => {
    if (isSuccess) {
      fillPlantSelectorOptions(data);
      setSelectedPlant(data[1].id);
      changeFilter({ key: BoilsFilterParams.PLANTS, value: "", values: [data[1].id] });
    }
  }, [data]);

  const action: SelectStaticProps["action"] = React.useRef(null);
  const handleChange = (newValue: number | null) => {
    newValue && setSelectedPlant(newValue);
    newValue &&
      changeFilter({ key: BoilsFilterParams.PLANTS, value: "", values: newValue === 999999 ? [] : [newValue] });
  };
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
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
            <Option value={plant.id} key={`Boils_filter_plant_option_${plant.id}`}>
              <FormControl size="sm">{plant.value}</FormControl>
            </Option>
          ))}
        </Select>
        <FormHelperText>Выбор площадки</FormHelperText>
      </FormControl>
    </Box>
  );
};

const StateSelector = () => {
  const { data, isSuccess } = useBoilsHistoryTypes();
  const { changeFilter, filter, stateSelectorOptions, fillStateSelectorOptions } = useBoilsFilterStore();
  const action: SelectStaticProps["action"] = React.useRef(null);
  React.useEffect(() => {
    if (isSuccess) {
      fillStateSelectorOptions(data);
      changeFilter({ key: BoilsFilterParams.STATES, value: "", values: [1] });
    }
  }, [data]);
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={BoilsFilterParams.STATES}>
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
            event && newValue && changeFilter({ key: BoilsFilterParams.STATES, value: "", values: newValue });
          }}
          {...(filter.states.length > 0 && {
            endDecorator: (
              <IconButton
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  changeFilter({ key: BoilsFilterParams.STATES, value: "", values: [] });
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

const BatchInput = () => {
  const { mode } = useColorScheme();
  const filter = useBoilsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsFilterStore(useShallow((state) => state.changeFilter));
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={BoilsFilterParams.BOIL}>
        <Input
          sx={{
            "&:focus-within": {
              "--Input-focusedHighlight":
                mode === "light" ? "var(--joy-palette-neutral-400)" : "var(--joy-palette-neutral-400)",
            },
            minWidth: "150px",
            maxWidth: "150px",
            display: "flex",
            flexShrink: 1,
          }}
          autoComplete="false"
          value={filter.boil}
          onChange={(e) => changeFilter({ key: e.target.id, value: e.target.value })}
          placeholder="Партия"
          startDecorator={
            <IconButton
              variant="plain"
              onClick={() => {
                changeFilter({
                  key: BoilsFilterParams.BOIL_ASC,
                  value: filter.boilAsc ? "false" : "true",
                });
              }}
              sx={[
                filter.boilAsc
                  ? { "& svg": { transform: "rotate(0deg)" } }
                  : { "& svg": { transform: "rotate(180deg)" } },
              ]}
            >
              <FilterListOutlinedIcon />
            </IconButton>
          }
          endDecorator={
            <React.Fragment>
              <IconButton
                color={mode === "dark" ? "neutral" : "neutral"}
                disabled={filter.boil === ""}
                onClick={() => {
                  changeFilter({ key: BoilsFilterParams.BOIL, value: "" });
                }}
              >
                <ClearOutlinedIcon />
              </IconButton>
            </React.Fragment>
          }
        />
        <FormHelperText>Поиск по партии</FormHelperText>
      </FormControl>
    </Box>
  );
};

const MarkingInput = () => {
  const { mode } = useColorScheme();
  const filter = useBoilsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsFilterStore(useShallow((state) => state.changeFilter));
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={BoilsFilterParams.MARKING}>
        <Input
          sx={{
            "&:focus-within": {
              "--Input-focusedHighlight":
                mode === "light" ? "var(--joy-palette-neutral-400)" : "var(--joy-palette-neutral-400)",
            },
            minWidth: "150px",
            maxWidth: "150px",
            display: "flex",
            flexShrink: 1,
          }}
          autoComplete="false"
          value={filter.marking}
          onChange={(e) => changeFilter({ key: e.target.id, value: e.target.value })}
          placeholder="Артикул"
          startDecorator={<SearchIcon />}
          endDecorator={
            <React.Fragment>
              <IconButton
                color={mode === "dark" ? "neutral" : "neutral"}
                disabled={filter.marking === ""}
                onClick={() => {
                  changeFilter({ key: BoilsFilterParams.MARKING, value: "" });
                }}
              >
                <ClearOutlinedIcon />
              </IconButton>
            </React.Fragment>
          }
        />
        <FormHelperText>Поиск по артикулу</FormHelperText>
      </FormControl>
    </Box>
  );
};

const CodeInput = () => {
  const { mode } = useColorScheme();
  const filter = useBoilsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsFilterStore(useShallow((state) => state.changeFilter));
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={BoilsFilterParams.BASE}>
        <Input
          sx={{
            "&:focus-within": {
              "--Input-focusedHighlight":
                mode === "light" ? "var(--joy-palette-neutral-400)" : "var(--joy-palette-neutral-400)",
            },
            minWidth: "150px",
            maxWidth: "150px",
            display: "flex",
            flexShrink: 1,
          }}
          autoComplete="false"
          value={filter.baseCode}
          onChange={(e) => changeFilter({ key: e.target.id, value: e.target.value })}
          placeholder="Код 1С"
          startDecorator={<SearchIcon />}
          endDecorator={
            <React.Fragment>
              <IconButton
                color={mode === "dark" ? "neutral" : "neutral"}
                disabled={filter.baseCode === ""}
                onClick={() => {
                  changeFilter({ key: BoilsFilterParams.BASE, value: "" });
                }}
              >
                <ClearOutlinedIcon />
              </IconButton>
            </React.Fragment>
          }
        />
        <FormHelperText>Поиск по коду 1С</FormHelperText>
      </FormControl>
    </Box>
  );
};
const ClearButton = () => {
  const { mode } = useColorScheme();
  const clearFilter = useBoilsFilterStore(useShallow((state) => state.clearFilter));
  const filter = useBoilsFilterStore(useShallow((state) => state.filter));
  const disableBoilClearFilterButton =
    filter.boil === "" &&
    filter.marking === "" &&
    filter.baseCode === "" &&
    filter.states.length === 0 &&
    filter.plants.length === 0;

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
      <Button
        color={mode === "dark" ? "neutral" : "neutral"}
        variant="outlined"
        startDecorator={<DeleteOutlineIcon />}
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        disabled={disableBoilClearFilterButton}
        onClick={() => clearFilter()}
      >
        Сбросить
      </Button>
    </Box>
  );
};
export default function BoilsFilter() {
  return (
    <PageFilterLayout>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", pl: 2 }}>
        <BatchInput />
        <MarkingInput />
        <CodeInput />
        <StateSelector />
        <BoilsFilterPlantSelector />
      </Box>
      <ClearButton />
    </PageFilterLayout>
  );
}

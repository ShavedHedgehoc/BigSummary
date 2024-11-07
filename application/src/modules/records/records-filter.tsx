import * as React from "react";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import FormHelperText from "@mui/joy/FormHelperText";
import Select, { SelectStaticProps } from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { usePlants } from "../../shared/api/use-plants";

import SearchIcon from "@mui/icons-material/Search";
import { useShallow } from "zustand/shallow";
import PageFilterLayout from "../../shared/layouts/page-filter-layout";
import { useRecordsFilterStore } from "./store/use-record-filter-store";
import { RecordsFilterParams } from "./records-filter-params";
import { useColorScheme } from "@mui/joy";
import { useProductsHistoryTypes } from "../../shared/api/use-products-history-types";

const RecordsPlantSelector = () => {
  const { data, isSuccess } = usePlants();
  const { selectedPlant, plantSelectorOptions, setSelectedPlant, fillPlantSelectorOptions, changeFilter } =
    useRecordsFilterStore();

  React.useEffect(() => {
    if (isSuccess) {
      fillPlantSelectorOptions(data);
      setSelectedPlant(data[1].id);
      changeFilter({ key: RecordsFilterParams.PLANT, value: "", values: [data[1].id] });
    }
  }, [data]);

  const action: SelectStaticProps["action"] = React.useRef(null);
  const handleChange = (newValue: number | null) => {
    newValue && setSelectedPlant(newValue);
    newValue && changeFilter({ key: RecordsFilterParams.PLANT, value: "", values: [newValue] });
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
            <Option value={plant.id} key={`Record_filter_plant_option_${plant.id}`}>
              <FormControl size="sm">{plant.value}</FormControl>
            </Option>
          ))}
        </Select>
        <FormHelperText>Выбор площадки</FormHelperText>
      </FormControl>
    </Box>
  );
};

const BatchInput = () => {
  const { mode } = useColorScheme();
  const filter = useRecordsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useRecordsFilterStore(useShallow((state) => state.changeFilter));
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={RecordsFilterParams.BOIL}>
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
          startDecorator={<SearchIcon />}
          // startDecorator={
          //   <IconButton
          //     variant="plain"
          //     onClick={() => {
          //       changeFilter({
          //         key: RecordsFilterParams.BOIL_ASC,
          //         value: filter.boilAsc ? "false" : "true",
          //       });
          //     }}
          //     sx={[
          //       filter.boilAsc
          //         ? { "& svg": { transform: "rotate(0deg)" } }
          //         : { "& svg": { transform: "rotate(180deg)" } },
          //     ]}
          //   >
          //     <FilterListOutlinedIcon />
          //   </IconButton>
          // }
          endDecorator={
            <React.Fragment>
              <IconButton
                color={mode === "dark" ? "neutral" : "neutral"}
                disabled={filter.boil === ""}
                onClick={() => {
                  changeFilter({ key: RecordsFilterParams.BOIL, value: "" });
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

const StateSelector = () => {
  const { data, isSuccess } = useProductsHistoryTypes();
  const { changeFilter, filter, stateSelectorOptions, fillStateSelectorOptions } = useRecordsFilterStore();
  const action: SelectStaticProps["action"] = React.useRef(null);
  React.useEffect(() => {
    if (isSuccess) {
      fillStateSelectorOptions(data);
      // changeFilter({ key: RecordsFilterParams.STATES, value: "", values: [1] });
    }
  }, [data]);
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={RecordsFilterParams.STATES}>
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
            event && newValue && changeFilter({ key: RecordsFilterParams.STATES, value: "", values: newValue });
          }}
          {...(filter.states.length > 0 && {
            endDecorator: (
              <IconButton
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  changeFilter({ key: RecordsFilterParams.STATES, value: "", values: [] });
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

const CodeInput = () => {
  const { mode } = useColorScheme();
  const filter = useRecordsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useRecordsFilterStore(useShallow((state) => state.changeFilter));
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={RecordsFilterParams.PRODUCT}>
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
          value={filter.productCode}
          onChange={(e) => changeFilter({ key: e.target.id, value: e.target.value })}
          placeholder="Код 1С"
          startDecorator={<SearchIcon />}
          endDecorator={
            <React.Fragment>
              <IconButton
                color={mode === "dark" ? "neutral" : "neutral"}
                disabled={filter.productCode === ""}
                onClick={() => {
                  changeFilter({ key: RecordsFilterParams.PRODUCT, value: "" });
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

const MarkingInput = () => {
  const { mode } = useColorScheme();
  const filter = useRecordsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useRecordsFilterStore(useShallow((state) => state.changeFilter));
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={RecordsFilterParams.MARKING}>
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
                  changeFilter({ key: RecordsFilterParams.MARKING, value: "" });
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

const ClearButton = () => {
  const { mode } = useColorScheme();
  const clearFilter = useRecordsFilterStore(useShallow((state) => state.clearFilter));
  const filter = useRecordsFilterStore(useShallow((state) => state.filter));
  const disableRecordClearFilterButton =
    filter.boil === "" && filter.marking === "" && filter.productCode === "" && filter.states.length === 0;
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
      <Button
        color={mode === "dark" ? "neutral" : "neutral"}
        variant="outlined"
        startDecorator={<DeleteOutlineIcon />}
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        disabled={disableRecordClearFilterButton}
        onClick={() => clearFilter()}
      >
        Сбросить
      </Button>
    </Box>
  );
};

export default function RecordsFilter() {
  return (
    <PageFilterLayout>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", pl: 2 }}>
        <CodeInput />
        <MarkingInput />
        <BatchInput />
        <StateSelector />
        <RecordsPlantSelector />
      </Box>
      <ClearButton />
    </PageFilterLayout>
  );
}
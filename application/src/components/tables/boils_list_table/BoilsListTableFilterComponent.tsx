import * as React from "react";
import {
  Box,
  Input,
  Sheet,
  Typography,
  Button,
  IconButton,
  FormControl,
  useColorScheme,
  FormHelperText,
  RadioGroup,
  Radio,
  Select,
  Option,
  Checkbox,
  SelectStaticProps,
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { BoilFilterParams } from "../../../store/BoilStore";
import CachedIcon from "@mui/icons-material/Cached";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

import CloseRounded from "@mui/icons-material/CloseRounded";

// interface InputFieldComponentProps {
//   filterParameter: string;
//   helperText: string;
//   value: string;
// }

function BoilsListTableFilterComponent() {
  const { store } = React.useContext(Context);
  const { mode, systemMode } = useColorScheme();
  const action: SelectStaticProps["action"] = React.useRef(null);

  return (
    <React.Fragment>
      <Sheet
        className="BoilsListTableFolterContainer"
        variant="outlined"
        sx={[
          {
            display: { xs: "none", xl: "flex" },
            width: "100%",
            borderRadius: "sm",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            px: 2,
            py: 1,
            borderWidth: "1px",
            mb: 1,
          },
          (theme) => ({
            backgroundColor: theme.variants.soft.neutral,
          }),
        ]}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", pl: 2 }}>
          <Box sx={{ display: "flex", pt: 1 }}>
            <FormControl size="sm" id={BoilFilterParams.BOIL}>
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
                value={store.BoilStore.state.filter.boil}
                onChange={(e) => store.BoilStore.changeFilter({ key: e.target.id, value: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    store.BoilStore.fetchBoils();
                  }
                }}
                placeholder="Партия"
                startDecorator={
                  <IconButton
                    variant="plain"
                    // color={mode === "dark" ? "warning" : "neutral"}

                    onClick={() => {
                      store.BoilStore.changeFilter({
                        key: BoilFilterParams.BOIL_ASC,
                        value: store.BoilStore.state.filter.boilAsc ? "false" : "true",
                      });
                      store.BoilStore.fetchBoils();
                    }}
                    sx={[
                      store.BoilStore.state.filter.boilAsc
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
                      disabled={store.BoilStore.state.filter.boil === ""}
                      onClick={() => {
                        store.BoilStore.changeFilter({ key: BoilFilterParams.BOIL, value: "" });
                        store.BoilStore.fetchBoils();
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

          <Box sx={{ display: "flex", pt: 1 }}>
            <FormControl size="sm" id={BoilFilterParams.MARKING}>
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
                value={store.BoilStore.state.filter.marking}
                onChange={(e) => store.BoilStore.changeFilter({ key: e.target.id, value: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    store.BoilStore.fetchBoils();
                  }
                }}
                placeholder="Артикул"
                startDecorator={<SearchIcon />}
                endDecorator={
                  <React.Fragment>
                    <IconButton
                      color={mode === "dark" ? "neutral" : "neutral"}
                      disabled={store.BoilStore.state.filter.marking === ""}
                      onClick={() => {
                        store.BoilStore.changeFilter({ key: BoilFilterParams.MARKING, value: "" });
                        store.BoilStore.fetchBoils();
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

          <Box sx={{ display: "flex", pt: 1 }}>
            <FormControl size="sm" id={BoilFilterParams.BASE}>
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
                value={store.BoilStore.state.filter.baseCode}
                onChange={(e) => store.BoilStore.changeFilter({ key: e.target.id, value: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    store.BoilStore.fetchBoils();
                  }
                }}
                placeholder="Код 1С"
                startDecorator={<SearchIcon />}
                endDecorator={
                  <React.Fragment>
                    <IconButton
                      color={mode === "dark" ? "neutral" : "neutral"}
                      disabled={store.BoilStore.state.filter.baseCode === ""}
                      onClick={() => {
                        store.BoilStore.changeFilter({ key: BoilFilterParams.BASE, value: "" });
                        store.BoilStore.fetchBoils();
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
          <Box sx={{ display: "flex", pt: 1 }}>
            <FormControl size="sm" id={BoilFilterParams.STATES}>
              <Select
                action={action}
                size="sm"
                multiple
                placeholder="Выберите статус"
                value={[...store.BoilStore.state.filter.states]}
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
                  event &&
                    newValue &&
                    store.BoilStore.changeFilter({ key: BoilFilterParams.STATES, value: "", values: newValue });
                  // store.BoilStore.fetchBoils();
                }}
                {...(store.BoilStore.state.filter.states.length > 0 && {
                  endDecorator: (
                    <IconButton
                      color="neutral"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onClick={() => {
                        console.log("try");
                        store.BoilStore.clearStates();
                        store.BoilStore.fetchBoils();
                        action.current?.focusVisible();
                      }}
                    >
                      <CloseRounded />
                    </IconButton>
                  ),
                  indicator: null,
                })}
              >
                {store.HistoryTypeStore.baseSelectorOptions.map((historyType) => (
                  <Option value={historyType.id} key={historyType.id}>
                    <FormControl size="sm">
                      <Checkbox
                        color="neutral"
                        checked={[...store.BoilStore.state.filter.states].includes(historyType.id)}
                        label={historyType.description}
                      />
                    </FormControl>
                  </Option>
                ))}
              </Select>
              <FormHelperText>Поиск по статусу. Чтобы применить изменения - нажмите "Обновить"</FormHelperText>
            </FormControl>
          </Box>
          {/* <Box sx={{ display: "flex", pl: 2 }}>
            <FormControl>
              <RadioGroup
                value={store.BoilStore.state.filter.haveRecord}
                onChange={(e) => {
                  store.BoilStore.changeFilter({ key: BoilFilterParams.HAVE_RECORD, value: e.target.value });
                  store.BoilStore.fetchBoils();
                }}
              >
                <Radio
                  value={true}
                  label={<Typography level="body-xs">Только с записями</Typography>}
                  variant="plain"
                  size="sm"
                  color={mode === "dark" ? "neutral" : "neutral"}
                />
                <Radio
                  value={false}
                  label={<Typography level="body-xs">Не важно</Typography>}
                  variant="plain"
                  size="sm"
                  color={mode === "dark" ? "neutral" : "neutral"}
                />
              </RadioGroup>
          
            </FormControl>
          </Box> */}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
          <Button
            color={mode === "dark" ? "neutral" : "neutral"}
            variant="outlined"
            startDecorator={<CachedIcon />}
            size={"sm"}
            sx={{ fontWeight: "normal", fontSize: "small" }}
            onClick={() => {
              store.BoilStore.fetchBoils();
            }}
          >
            Обновить
          </Button>

          <Button
            color={mode === "dark" ? "neutral" : "neutral"}
            variant="outlined"
            startDecorator={<DeleteOutlineIcon />}
            size={"sm"}
            sx={{ fontWeight: "normal", fontSize: "small" }}
            disabled={store.BoilStore.clearFilterDisabled}
            onClick={() => {
              store.BoilStore.clearFilter();
              store.BoilStore.fetchBoils();
            }}
          >
            Сбросить
          </Button>
          {/* <IconButton>
            <DeleteOutlineIcon />
          </IconButton> */}
        </Box>
      </Sheet>
    </React.Fragment>
  );
}
export default observer(BoilsListTableFilterComponent);
// export default BoilsListTableFilterComponent;

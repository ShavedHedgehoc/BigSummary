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
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { BoilFilterParams } from "../../../store/BoilStore";
import CachedIcon from "@mui/icons-material/Cached";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

interface InputFieldComponentProps {
  filterParameter: string;
  helperText: string;
  value: string;
}

const InputFieldComponent = observer((props: InputFieldComponentProps) => {
  const { store } = React.useContext(Context);
  const { mode, systemMode } = useColorScheme();
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", pt: 1 }}>
        <FormControl size="sm" id={props.filterParameter}>
          <Input
            sx={{
              "&:focus-within": {
                "--Input-focusedHighlight":
                  mode === "light" ? "var(--joy-palette-primary-400)" : "var(--joy-palette-warning-400)",
              },
            }}
            autoComplete="false"
            value={props.value}
            onChange={(e) => store.BoilStore.changeFilter({ key: e.target.id, value: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                store.BoilStore.fetchBoils();
              }
            }}
            placeholder="Партия"
            startDecorator={<SearchIcon />}
            endDecorator={
              <React.Fragment>
                <IconButton
                  color={mode === "dark" ? "warning" : "primary"}
                  disabled={store.BoilStore.state.filter.boil === ""}
                  onClick={() => {
                    store.BoilStore.changeFilter({ key: props.filterParameter, value: "" });
                    store.BoilStore.fetchBoils();
                  }}
                >
                  <ClearOutlinedIcon />
                </IconButton>
              </React.Fragment>
            }
          />
          <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
      </Box>
    </React.Fragment>
  );
});

function BoilsListTableFilterComponent() {
  const { store } = React.useContext(Context);
  const { mode, systemMode } = useColorScheme();

  // interface InputFieldComponentProps {
  //   filterParameter: string;
  //   helperText: string;
  //   value: string;
  // }

  // const InputFieldComponent = observer((props: InputFieldComponentProps) => {
  //   return (
  //     <React.Fragment>
  //       <Box sx={{ display: "flex", pt: 1 }}>
  //         <FormControl size="sm" id={props.filterParameter}>
  //           <Input
  //             sx={{
  //               "&:focus-within": {
  //                 "--Input-focusedHighlight":
  //                   mode === "light" ? "var(--joy-palette-primary-400)" : "var(--joy-palette-warning-400)",
  //               },
  //             }}
  //             autoComplete="false"
  //             value={props.value}
  //             onChange={(e) => store.BoilStore.changeFilter({ key: e.target.id, value: e.target.value })}
  //             onKeyDown={(e) => {
  //               if (e.key === "Enter") {
  //                 store.BoilStore.fetchBoils();
  //               }
  //             }}
  //             placeholder="Партия"
  //             startDecorator={<SearchIcon />}
  //             endDecorator={
  //               <React.Fragment>
  //                 <IconButton
  //                   color={mode === "dark" ? "warning" : "primary"}
  //                   disabled={store.BoilStore.state.filter.boil === ""}
  //                   onClick={() => {
  //                     store.BoilStore.changeFilter({ key: props.filterParameter, value: "" });
  //                     store.BoilStore.fetchBoils();
  //                   }}
  //                 >
  //                   <ClearOutlinedIcon />
  //                 </IconButton>
  //               </React.Fragment>
  //             }
  //           />
  //           <FormHelperText>{props.helperText}</FormHelperText>
  //         </FormControl>
  //       </Box>
  //     </React.Fragment>
  //   );
  // });

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
                      mode === "light" ? "var(--joy-palette-primary-400)" : "var(--joy-palette-neutral-400)",
                  },
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
                startDecorator={<SearchIcon />}
                endDecorator={
                  <React.Fragment>
                    <IconButton
                      color={mode === "dark" ? "neutral" : "primary"}
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
                      mode === "light" ? "var(--joy-palette-primary-400)" : "var(--joy-palette-neutral-400)",
                  },
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
                      color={mode === "dark" ? "neutral" : "primary"}
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
                      mode === "light" ? "var(--joy-palette-primary-400)" : "var(--joy-palette-neutral-400)",
                  },
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
                      color={mode === "dark" ? "neutral" : "primary"}
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
          <Box sx={{ display: "flex", pl: 2 }}>
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
                  color={mode === "dark" ? "neutral" : "primary"}
                />
                <Radio
                  value={false}
                  label={<Typography level="body-xs">Не важно</Typography>}
                  variant="plain"
                  size="sm"
                  color={mode === "dark" ? "neutral" : "primary"}
                />
              </RadioGroup>
              {/* <FormHelperText>Наличие записей</FormHelperText> */}
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
          <Button
            color={mode === "dark" ? "neutral" : "primary"}
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
            color={mode === "dark" ? "neutral" : "primary"}
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

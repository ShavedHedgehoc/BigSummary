import * as React from "react";

import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import FormHelperText from "@mui/joy/FormHelperText";
import Select, { SelectStaticProps } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";

import { useOccupationsFilterStore } from "./hooks/useOccupationsFilterStore";
import { useNameSortOrderStore } from "./hooks/useNameSortOrderStore";
import { useNameFilterStore } from "./hooks/useNameFilterStore";
import { useAddModalStore } from "./hooks/useAddModalStore";
import OccupationService from "../../../services/OccupationService";

const clearFilter = () => {
  useNameFilterStore.getState().clearNameFilter();
  useOccupationsFilterStore.getState().clearOccupations();
  useNameSortOrderStore.getState().changeSortOrder();
};

const ClearFilterButtonComponent = () => {
  const { nameFilter } = useNameFilterStore();
  const { occupations } = useOccupationsFilterStore();
  const client = useQueryClient();
  return (
    <Button
      color="neutral"
      variant="outlined"
      startDecorator={<DeleteOutlineIcon />}
      size={"sm"}
      sx={{ fontWeight: "normal", fontSize: "small" }}
      disabled={nameFilter === "" && occupations.length === 0}
      onClick={() => {
        clearFilter();
        client.invalidateQueries({ queryKey: ["employees"] });
      }}
    >
      Сбросить
    </Button>
  );
};

const NameInput = () => {
  const { nameFilter, changeNameFilter, clearNameFilter } = useNameFilterStore();
  const { asc, changeSortOrder } = useNameSortOrderStore();
  const client = useQueryClient();
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={"NameInput"}>
        <Input
          sx={{
            "&:focus-within": {
              "--Input-focusedHighlight": "var(--joy-palette-neutral-400)",
            },
            minWidth: "200px",
            maxWidth: "150px",
            display: "flex",
            flexShrink: 1,
          }}
          autoComplete="false"
          value={nameFilter}
          onChange={(e) => changeNameFilter(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              client.invalidateQueries({ queryKey: ["employees"] });
            }
          }}
          placeholder="ФИО"
          startDecorator={
            <IconButton
              variant="plain"
              onClick={() => {
                changeSortOrder();
                client.fetchQuery({ queryKey: ["employees"] });
              }}
              sx={[asc ? { "& svg": { transform: "rotate(0deg)" } } : { "& svg": { transform: "rotate(180deg)" } }]}
            >
              <FilterListOutlinedIcon />
            </IconButton>
          }
          endDecorator={
            <React.Fragment>
              <IconButton
                color={"neutral"}
                disabled={nameFilter === ""}
                onClick={() => {
                  clearNameFilter();
                  client.invalidateQueries({ queryKey: ["employees"] });
                }}
              >
                <ClearOutlinedIcon />
              </IconButton>
            </React.Fragment>
          }
        />
        <FormHelperText>Поиск по ФИО</FormHelperText>
      </FormControl>
    </Box>
  );
};

const OccupationSelector = () => {
  const { isPending, data, isSuccess, error } = useQuery({
    queryKey: ["occupation"],
    queryFn: () => OccupationService.getOccupation(),
  });

  const client = useQueryClient();
  const { occupations, changeOccupations, clearOccupations } = useOccupationsFilterStore();

  const handleChange = (newValue: number | null) => {
    changeOccupations(newValue ? [newValue] : []);
    client.invalidateQueries({ queryKey: ["employees"] });
  };

  const action: SelectStaticProps["action"] = React.useRef(null);

  if (isPending) {
    return <Typography level="body-xs">Loading...</Typography>;
  }
  if (error) {
    return <Typography level="body-xs">Smth wrong...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={"occupation"}>
        <Select
          action={action}
          size="sm"
          placeholder="Выберите роль"
          value={occupations.length ? occupations[0] : null}
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
          {...(occupations.length > 0 && {
            endDecorator: (
              <IconButton
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  clearOccupations();
                  client.invalidateQueries({ queryKey: ["employees"] });
                  action.current?.focusVisible();
                }}
              >
                <CloseRounded />
              </IconButton>
            ),
            indicator: null,
          })}
        >
          {isSuccess &&
            data.map((occupation) => (
              <Option value={occupation.id} key={occupation.id}>
                <FormControl size="sm">{occupation.description}</FormControl>
              </Option>
            ))}
        </Select>
        <FormHelperText>Поиск по роли</FormHelperText>
      </FormControl>
    </Box>
  );
};

export const FilterComponent = () => {
  const client = useQueryClient();
  const openAddModal = useAddModalStore(useShallow((state) => state.setOpen));

  return (
    <React.Fragment>
      <Sheet
        className="BoilsListTableFilterContainer"
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
          <NameInput />
          <OccupationSelector />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
          <Button
            color="neutral"
            variant="outlined"
            startDecorator={<AddOutlinedIcon />}
            size={"sm"}
            sx={{ fontWeight: "normal", fontSize: "small" }}
            onClick={() => {
              openAddModal(true);
            }}
          >
            Добавить
          </Button>
          <Button
            color="neutral"
            variant="outlined"
            startDecorator={<CachedIcon />}
            size={"sm"}
            sx={{ fontWeight: "normal", fontSize: "small" }}
            onClick={() => {
              client.refetchQueries({ queryKey: ["employees"] });
            }}
          >
            Обновить
          </Button>
          <ClearFilterButtonComponent />
        </Box>
      </Sheet>
    </React.Fragment>
  );
};

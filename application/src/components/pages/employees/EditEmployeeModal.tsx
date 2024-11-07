import React from "react";
import Select from "@mui/joy/Select";
import Input from "@mui/joy/Input";
import Option from "@mui/joy/Option";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { useShallow } from "zustand/shallow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EmployeeService, { IOccupation } from "../../../services/EmployeeService";
import ModalLayout, { ModalLayoutProps } from "../../modals/ModalLayout";
import { useEditModalStore } from "./hooks/useEditModalStore";
import { enqueueSnackbar } from "notistack";
import handleError from "../../../shared/api/http/handleError";

const NameInput = () => {
  const name = useEditModalStore(useShallow((state) => state.name));
  const setName = useEditModalStore(useShallow((state) => state.setName));
  return (
    <Input
      sx={{
        "&:focus-within": {
          "--Input-focusedHighlight": "var(--joy-palette-neutral-400)",
        },
        minWidth: "200px",

        display: "flex",
        flexShrink: 1,
      }}
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Введите ФИО"
    />
  );
};

const BarcodeInput = () => {
  const barcode = useEditModalStore(useShallow((state) => state.barcode));
  const setBarcode = useEditModalStore(useShallow((state) => state.setBarcode));
  return (
    <Input
      sx={{
        "&:focus-within": {
          "--Input-focusedHighlight": "var(--joy-palette-neutral-400)",
        },
        minWidth: "200px",

        display: "flex",
        flexShrink: 1,
      }}
      value={barcode}
      onChange={(e) => setBarcode(e.target.value)}
      placeholder="Введите штрихкод"
    />
  );
};

const OccupationSelector = () => {
  const client = useQueryClient();
  const occupations: IOccupation[] | undefined = client.getQueryData(["occupation"]);
  const occupation = useEditModalStore(useShallow((state) => state.occupation));
  const setOccupation = useEditModalStore(useShallow((state) => state.setOccupation));

  return (
    <Select
      placeholder="Выберите роль"
      size="sm"
      value={occupation}
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
        event && newValue && setOccupation(newValue);
      }}
    >
      {occupations &&
        occupations.map((occupation) => (
          <Option value={occupation.id} key={occupation.id}>
            {occupation.description}
          </Option>
        ))}
    </Select>
  );
};

const ContentComponent = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl size="sm">
        <NameInput />
        <FormHelperText>
          <Typography level="body-xs" sx={{ pl: 1 }}>
            Фамилия и инициалы сотрудника
          </Typography>
        </FormHelperText>
      </FormControl>
      <FormControl size="sm">
        <BarcodeInput />
        <FormHelperText>
          <Typography level="body-xs" sx={{ pl: 1 }}>
            Штрихкод в формате EAN-13
          </Typography>
        </FormHelperText>
      </FormControl>
      <FormControl size="sm">
        <OccupationSelector />
        <FormHelperText>
          <Typography level="body-xs" sx={{ pl: 1 }}>
            Роль сотрудника
          </Typography>
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

const ButtonComponent = () => {
  const client = useQueryClient();
  const setOpen = useEditModalStore(useShallow((state) => state.setOpen));
  const clearData = useEditModalStore(useShallow((state) => state.clearData));

  const id = useEditModalStore(useShallow((state) => state.id));
  const name = useEditModalStore(useShallow((state) => state.name));
  const barcode = useEditModalStore(useShallow((state) => state.barcode));
  const occupation = useEditModalStore(useShallow((state) => state.occupation));

  const { mutate: update } = useMutation({
    mutationFn: EmployeeService.updateEmployee,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["employees"] });
      enqueueSnackbar("Данные сотрудника успешно обновлены", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(error, { variant: "error", anchorOrigin: { vertical: "top", horizontal: "right" } });
      }
    },
  });

  const updateEmployee = () => {
    // const name = useEditModalStore.getState().name;
    // const barcode = useEditModalStore.getState().barcode;
    // const occupation_id = useEditModalStore.getState().occupation;
    if (name !== "" && barcode !== "" && occupation && id) {
      update({ id: id, name: name, barcode: barcode, occupationId: occupation });
      setOpen(false);
      clearData();
    }
  };

  const cancelUpdate = () => {
    setOpen(false);
    clearData();
  };

  return (
    <React.Fragment>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        disabled={!(name !== "" && barcode !== "" && occupation !== null)}
        onClick={() => updateEmployee()}
      >
        Изменить
      </Button>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        onClick={() => cancelUpdate()}
      >
        Отмена
      </Button>
    </React.Fragment>
  );
};

export const EditEmployeeModal = () => {
  const open = useEditModalStore(useShallow((state) => state.open));
  const setOpen = useEditModalStore(useShallow((state) => state.setOpen));

  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Редактирование данных сотрудника",
    content: <ContentComponent />,
    height: 400,
    minHeight: 0,
    width: 400,
    onlyCloseButton: false,
    buttons: <ButtonComponent />,
  };

  return <ModalLayout {...modalProps} />;
};

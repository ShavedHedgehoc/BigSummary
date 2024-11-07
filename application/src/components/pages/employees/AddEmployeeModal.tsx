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
import { useAddModalStore } from "./hooks/useAddModalStore";
import { enqueueSnackbar } from "notistack";
import handleError from "../../../shared/api/http/handleError";

const NameInput = () => {
  const name = useAddModalStore(useShallow((state) => state.name));
  const setName = useAddModalStore(useShallow((state) => state.setName));
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
  const barcode = useAddModalStore(useShallow((state) => state.barcode));
  const setBarcode = useAddModalStore(useShallow((state) => state.setBarcode));
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
  const occupation = useAddModalStore(useShallow((state) => state.occupation));
  const setOccupation = useAddModalStore(useShallow((state) => state.setOccupation));

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
  const setOpen = useAddModalStore(useShallow((state) => state.setOpen));
  const clearData = useAddModalStore(useShallow((state) => state.clearData));

  const name = useAddModalStore(useShallow((state) => state.name));
  const barcode = useAddModalStore(useShallow((state) => state.barcode));
  const occupation = useAddModalStore(useShallow((state) => state.occupation));

  const { mutate: create } = useMutation({
    mutationFn: EmployeeService.createEmployee,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["employees"] });
      enqueueSnackbar("Сотрудник успешно добавлен", {
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

  const createEmployee = () => {
    // const name = useAddModalStore.getState().name;
    // const barcode = useAddModalStore.getState().barcode;
    // const occupation_id = useAddModalStore.getState().occupation;
    if (name !== "" && barcode !== "" && occupation) {
      create({ name: name, barcode: barcode, occupationId: occupation });
      setOpen(false);
      clearData();
    }
  };

  const cancelCreation = () => {
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
        onClick={() => createEmployee()}
      >
        Создать
      </Button>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        onClick={() => cancelCreation()}
      >
        Отмена
      </Button>
    </React.Fragment>
  );
};

export const AddEmployeeModal = () => {
  const open = useAddModalStore(useShallow((state) => state.open));
  const setOpen = useAddModalStore(useShallow((state) => state.setOpen));

  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Создание нового сотрудника",
    content: <ContentComponent />,
    height: 400,
    minHeight: 0,
    width: 400,
    onlyCloseButton: false,
    buttons: <ButtonComponent />,
  };

  return <ModalLayout {...modalProps} />;
};

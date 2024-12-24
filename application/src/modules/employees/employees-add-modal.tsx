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
import { useQuery } from "@tanstack/react-query";
import { useEmployeeAddModalStore } from "./store/use-employees-add-modal-store";
import { useCreateEmployee } from "./use-create-employee";
import ModalLayout, { ModalLayoutProps } from "../../shared/layouts/modal-layout";
import OccupationService from "../../services/OccupationService";

const NameInput = () => {
  const name = useEmployeeAddModalStore(useShallow((state) => state.name));
  const setName = useEmployeeAddModalStore(useShallow((state) => state.setName));
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
  const barcode = useEmployeeAddModalStore(useShallow((state) => state.barcode));
  const setBarcode = useEmployeeAddModalStore(useShallow((state) => state.setBarcode));
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
  const occupationsOptions = useEmployeeAddModalStore(useShallow((state) => state.occupationsOptions));
  const fillOccupationsOptions = useEmployeeAddModalStore(useShallow((state) => state.fillOccupationOptions));
  const occupation = useEmployeeAddModalStore(useShallow((state) => state.occupation));
  const setOccupation = useEmployeeAddModalStore(useShallow((state) => state.setOccupation));

  useQuery({
    queryKey: ["occupations_options", "employees"],
    queryFn: async () => {
      const data = await OccupationService.getOccupations();
      if (data) {
        fillOccupationsOptions(data);
        setOccupation(data[1].id);
        return data;
      }
    },
  });
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
      {occupationsOptions &&
        occupationsOptions.map((occupation) => (
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
  const setOpen = useEmployeeAddModalStore(useShallow((state) => state.setOpen));
  const clearData = useEmployeeAddModalStore(useShallow((state) => state.clearData));

  const name = useEmployeeAddModalStore(useShallow((state) => state.name));
  const barcode = useEmployeeAddModalStore(useShallow((state) => state.barcode));
  const occupation = useEmployeeAddModalStore(useShallow((state) => state.occupation));

  const { createEmployee, isPending } = useCreateEmployee();

  const handleCreateEmployee = () => {
    if (name !== "" && barcode !== "" && occupation) {
      createEmployee({ name: name, barcode: barcode, occupationId: occupation });
      setOpen(false);
      clearData();
    }
  };

  const handleCancelCreation = () => {
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
        disabled={!(name !== "" && barcode !== "" && occupation !== null) || isPending}
        onClick={() => handleCreateEmployee()}
      >
        Создать
      </Button>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        disabled={isPending}
        onClick={() => handleCancelCreation()}
      >
        Отмена
      </Button>
    </React.Fragment>
  );
};

export default function EmployeesAddModal() {
  const open = useEmployeeAddModalStore(useShallow((state) => state.open));
  const setOpen = useEmployeeAddModalStore(useShallow((state) => state.setOpen));

  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Создание нового сотрудника",
    height: 400,
    minHeight: 0,
    width: 400,
    onlyCloseButton: false,
  };

  return (
    <ModalLayout props={modalProps} buttons={<ButtonComponent />}>
      <ContentComponent />
    </ModalLayout>
  );
}

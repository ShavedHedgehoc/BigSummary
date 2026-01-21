import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import { useShallow } from "zustand/react/shallow";
import { useEmployeeAddModalStore } from "../store/use-employees-add-modal-store";
import ModalLayout, { ModalLayoutProps } from "../../../shared/layouts/modal-layout";
import BarcodeInput from "./employees-add-modal-barcode-input";
import EmployeesAddModalOccupationSelector from "./employees-add-modal-occupations-selector";
import EmployeesAddModalButtons from "./employees-add-modal-buttons";
import EmployeesAddModalNameInput from "./employees-add-modal-name-input";

export default function EmployeesAddModal() {
  const open = useEmployeeAddModalStore(useShallow((state) => state.open));
  const setOpen = useEmployeeAddModalStore(useShallow((state) => state.setOpen));
  const occupationsOptions = useEmployeeAddModalStore(useShallow((state) => state.occupationsOptions));
  const setOccupation = useEmployeeAddModalStore(useShallow((state) => state.setOccupation));

  const handleClose = () => {
    setOpen(false);
    if (occupationsOptions.length) {
      setOccupation(occupationsOptions[1].id);
    }
  };

  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => handleClose(),
    title: "Создание нового сотрудника",
    height: 400,
    minHeight: 0,
    width: 400,
    onlyCloseButton: false,
  };

  return (
    <ModalLayout props={modalProps} buttons={<EmployeesAddModalButtons />}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl size="sm">
          <EmployeesAddModalNameInput />
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
          <EmployeesAddModalOccupationSelector />
          <FormHelperText>
            <Typography level="body-xs" sx={{ pl: 1 }}>
              Роль сотрудника
            </Typography>
          </FormHelperText>
        </FormControl>
      </Box>
    </ModalLayout>
  );
}

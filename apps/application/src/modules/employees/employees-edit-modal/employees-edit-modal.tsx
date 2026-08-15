import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import { useShallow } from "zustand/react/shallow";
import { useEmployeesEditModalStore } from "../store/use-employees-edit-modal-store";
import ModalLayout, { ModalLayoutProps } from "../../../shared/layouts/modal-layout";
import EmployeesEditModalOccupationSelector from "./employees-edit-modal-occupation-selector";
import EmployeesEditModalButtonComponent from "./employees-edit-modal-buttons";
import EmployeesEditModalNameInput from "./employees-edit-modal-name-input";
import EmployeesEditModalBarcodeInput from "./employees-edit-modal-barcode-input";

export default function EmployeesEditModal() {
  const open = useEmployeesEditModalStore(useShallow((state) => state.open));
  const setOpen = useEmployeesEditModalStore(useShallow((state) => state.setOpen));

  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Редактирование данных сотрудника",
    height: 400,
    minHeight: 0,
    width: 400,
    onlyCloseButton: false,
  };

  return (
    <ModalLayout props={modalProps} buttons={<EmployeesEditModalButtonComponent />}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl size="sm">
          <EmployeesEditModalNameInput />
          <FormHelperText>
            <Typography level="body-xs" sx={{ pl: 1 }}>
              Фамилия и инициалы сотрудника
            </Typography>
          </FormHelperText>
        </FormControl>
        <FormControl size="sm">
          <EmployeesEditModalBarcodeInput />
          <FormHelperText>
            <Typography level="body-xs" sx={{ pl: 1 }}>
              Штрихкод в формате EAN-13
            </Typography>
          </FormHelperText>
        </FormControl>
        <FormControl size="sm">
          <EmployeesEditModalOccupationSelector />
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

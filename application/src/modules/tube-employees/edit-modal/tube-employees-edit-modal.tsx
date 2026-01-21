import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import { useShallow } from "zustand/react/shallow";
import ModalLayout, { ModalLayoutProps } from "../../../shared/layouts/modal-layout";
import TubeEmployeesEditModalButtonComponent from "./tube-employees-edit-modal-buttons";
import TubeEmployeesEditModalNameInput from "./tube-employees-edit-modal-name-input";
import TubeEmployeesEditModalBarcodeInput from "./tube-employees-edit-modal-barcode-input";
import { useTubeEmployeesEditModalStore } from "../store/use-tube-employees-edit-modal-store";
import TubeTubeEmployeesEditModalRankSelector from "./tube-employees-edit-modal-rank-selector";

export default function TubeEmployeesEditModal() {
  const open = useTubeEmployeesEditModalStore(useShallow((state) => state.open));
  const setOpen = useTubeEmployeesEditModalStore(useShallow((state) => state.setOpen));

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
    <ModalLayout props={modalProps} buttons={<TubeEmployeesEditModalButtonComponent />}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl size="sm">
          <TubeEmployeesEditModalNameInput />
          <FormHelperText>
            <Typography level="body-xs" sx={{ pl: 1 }}>
              Фамилия и инициалы сотрудника
            </Typography>
          </FormHelperText>
        </FormControl>
        <FormControl size="sm">
          <TubeEmployeesEditModalBarcodeInput />
          <FormHelperText>
            <Typography level="body-xs" sx={{ pl: 1 }}>
              Штрихкод в формате EAN-13
            </Typography>
          </FormHelperText>
        </FormControl>
        <FormControl size="sm">
          <TubeTubeEmployeesEditModalRankSelector />
          <FormHelperText>
            <Typography level="body-xs" sx={{ pl: 1 }}>
              Разряд
            </Typography>
          </FormHelperText>
        </FormControl>
      </Box>
    </ModalLayout>
  );
}

import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import { useShallow } from "zustand/react/shallow";
import { useTubeEmployeesAddModalStore } from "../store/use-tube-employees-add-modal-store";
import ModalLayout, { ModalLayoutProps } from "../../../shared/layouts/modal-layout";
import BarcodeInput from "./tube-employees-add-modal-barcode-input";

import TubeEmployeesAddModalButtons from "./tube-employees-add-modal-buttons";
import TubeEmployeesAddModalNameInput from "./tube-employees-add-modal-name-input";
import TubeEmployeesAddModalRankSelector from "./tube-employees-add-modal-rank-selector";

export default function TubeEmployeesAddModal() {
  const open = useTubeEmployeesAddModalStore(useShallow((state) => state.open));
  const setOpen = useTubeEmployeesAddModalStore(useShallow((state) => state.setOpen));
  const rankOptions = useTubeEmployeesAddModalStore(useShallow((state) => state.rankOptions));
  const setRank = useTubeEmployeesAddModalStore(useShallow((state) => state.setRank));

  const handleClose = () => {
    setOpen(false);
    if (rankOptions.length) {
      setRank(rankOptions[0].id);
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
    <ModalLayout props={modalProps} buttons={<TubeEmployeesAddModalButtons />}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl size="sm">
          <TubeEmployeesAddModalNameInput />
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
          <TubeEmployeesAddModalRankSelector />
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

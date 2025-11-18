import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useExtrusionInputParametersAlertModalStore } from "../../store/use-extrusion-input-parameters-alert-modal-store";
import { useShallow } from "zustand/react/shallow";
import { useExtrusionInputParametersModalStore } from "../../store/use-extrusion-input-parameters-modal-store";
import { useExtrusionInputCurrentParametersStore } from "../../store/use-extrusion-input-current-parameters-store";
import { useExtrusionCreateHardwareParameter } from "../../hooks/use-extrusion-create-hardware-parameter";

export default function ExtrusionInputParametersAlertModal() {
  const open = useExtrusionInputParametersAlertModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionInputParametersAlertModalStore(useShallow((state) => state.setOpen));
  const dto = useExtrusionInputParametersAlertModalStore(useShallow((state) => state.dto));
  const clearDto = useExtrusionInputParametersAlertModalStore(useShallow((state) => state.clearDto));
  const setOpenParent = useExtrusionInputParametersModalStore(useShallow((state) => state.setOpen));
  const initData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.initData));
  const { createExtrusionHardwareParameter } = useExtrusionCreateHardwareParameter();

  const handleOkClick = () => {
    setOpenParent(false);
    dto && createExtrusionHardwareParameter(dto);
    initData();
    clearDto();
  };

  return (
    <Dialog.Root
      role="alertdialog"
      open={open}
      onOpenChange={(e) => {
        setOpen(e.open);
      }}
    >
      <Dialog.Trigger asChild></Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Вы уверены?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>Некоторые параметры выходят за границы регламентных значений</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Назад</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={() => handleOkClick()}>
                Я уверен
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

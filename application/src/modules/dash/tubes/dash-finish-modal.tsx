import ModalLayout from "../../../shared/layouts/modal-layout";
import { useShallow } from "zustand/react/shallow";
import { useDashFinishModalStore } from "../store/use-dash-finish-modal-store";
import { Stack, Typography } from "@mui/joy";
import ModalButton, { ModalButtonProps } from "../../../shared/ui/modal-button";
import { useFinishTubeSummary } from "../../../shared/api/use-finish-tube-summary";
import { IChangeTubeRecorStatedDto } from "../../../shared/api/services/tube-records-service";

export default function DashFinishModal() {
  const open = useDashFinishModalStore(useShallow((state) => state.open));
  const summary_id = useDashFinishModalStore(useShallow((state) => state.summary_id));
  const boil_value = useDashFinishModalStore(useShallow((state) => state.boil_value));
  const setBoilValue = useDashFinishModalStore(useShallow((state) => state.setBoilValue));
  const setSummaryId = useDashFinishModalStore(useShallow((state) => state.setSummaryId));
  const title = useDashFinishModalStore(useShallow((state) => state.title));
  const setOpen = useDashFinishModalStore(useShallow((state) => state.setOpen));

  const { finishTubeSummary } = useFinishTubeSummary();

  const modalProps = {
    open: open,
    onClose: () => setOpen(false),
    title: title,
    height: 600,
    minHeight: 100,
    width: 600,
    onlyCloseButton: false,
  };

  const handleClose = () => {
    setOpen(false);
    setBoilValue(null);
    setSummaryId(null);
  };

  const handleFinish = () => {
    if (summary_id) {
      const dto: IChangeTubeRecorStatedDto = {
        id: summary_id,
      };
      finishTubeSummary(dto);
    }

    handleClose();
  };

  const closeButtonProps: ModalButtonProps = {
    label: "Отмена",
    onClick: () => handleClose(),
  };

  const finishButtonProps: ModalButtonProps = {
    label: "Закончить",
    onClick: () => handleFinish(),
  };

  const Buttons = () => (
    <Stack direction="row" sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 2 }}>
      <ModalButton {...finishButtonProps} />
      <ModalButton {...closeButtonProps} />
    </Stack>
  );

  return (
    <ModalLayout props={modalProps} buttons={<Buttons />}>
      <Typography>{`Вы действительно хотите завершить партию  ${boil_value}?`}</Typography>
    </ModalLayout>
  );
}

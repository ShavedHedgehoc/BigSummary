import ModalLayout from "../../../shared/layouts/modal-layout";
import { useShallow } from "zustand/react/shallow";

import { Stack, Typography } from "@mui/joy";
import ModalButton, { ModalButtonProps } from "../../../shared/ui/modal-button";
import { useDashStartModalStore } from "../store/use-dash-start-modal-store";
import { useStartTubeSummary } from "../../../shared/api/use-start-tube-summary";
import { IChangeTubeRecorStatedDto } from "../../../shared/api/services/tube-records-service";
import { useDashSelectSummaryModalStore } from "../store/use-dash-select-summary-modal-store";

export default function DashStartModal() {
  const open = useDashStartModalStore(useShallow((state) => state.open));
  const summary_id = useDashStartModalStore(useShallow((state) => state.summary_id));
  const boil_value = useDashStartModalStore(useShallow((state) => state.boil_value));
  const setBoilValue = useDashStartModalStore(useShallow((state) => state.setBoilValue));
  const setSummaryId = useDashStartModalStore(useShallow((state) => state.setSummaryId));
  const title = useDashStartModalStore(useShallow((state) => state.title));
  const setOpen = useDashStartModalStore(useShallow((state) => state.setOpen));
  const setOpenParent = useDashSelectSummaryModalStore(useShallow((state) => state.setOpen));

  const { startTubeSummary } = useStartTubeSummary();

  const modalProps = {
    open: open,
    onClose: () => setOpen(false),
    title: title,
    height: 600,
    minHeight: 100,
    width: 800,
    onlyCloseButton: false,
  };

  const handleClose = () => {
    setOpen(false);
    setBoilValue(null);
    setSummaryId(null);
  };

  const handleStart = () => {
    if (summary_id) {
      const dto: IChangeTubeRecorStatedDto = {
        id: summary_id,
      };
      startTubeSummary(dto);
    }

    handleClose();
    setOpenParent(false);
  };

  const closeButtonProps: ModalButtonProps = {
    label: "Отмена",
    onClick: () => handleClose(),
  };

  const startButtonProps: ModalButtonProps = {
    label: "Начать",
    onClick: () => handleStart(),
  };

  const Buttons = () => (
    <Stack direction="row" sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 2 }}>
      <ModalButton {...startButtonProps} />
      <ModalButton {...closeButtonProps} />
    </Stack>
  );

  return (
    <ModalLayout props={modalProps} buttons={<Buttons />}>
      <Typography>{`Вы действительно хотите начать партию  ${boil_value}?`}</Typography>
    </ModalLayout>
  );
}

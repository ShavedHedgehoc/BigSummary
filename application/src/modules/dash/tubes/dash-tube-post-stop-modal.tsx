import ModalLayout from "../../../shared/layouts/modal-layout";
import { useShallow } from "zustand/react/shallow";
import { Stack, Typography, Input } from "@mui/joy";
import ModalButton, { ModalButtonProps } from "../../../shared/ui/modal-button";

import { useDashTubePostStopModalStore } from "../store/use-dash-tube-post-stop-modal-store";
import { useTubeCreateExtrusionStatus } from "../../../shared/api/use-tube-create-extrusion-status";
import { CreateTubeStatusDto } from "../../../shared/api/services/tube-statuses-service";
import { useTubeCreateVarnishStatus } from "../../../shared/api/use-tube-create-varnish-status";
import { useTubeCreateOffsetStatus } from "../../../shared/api/use-tube-create-offset-status";
import { useTubeCreateSealantStatus } from "../../../shared/api/use-tube-create-sealant-status";

export default function DashTubePostStopModal() {
  const open = useDashTubePostStopModalStore(useShallow((state) => state.open));
  const title = useDashTubePostStopModalStore(useShallow((state) => state.title));
  const summary_id = useDashTubePostStopModalStore(useShallow((state) => state.summary_id));
  const defectValue = useDashTubePostStopModalStore(useShallow((state) => state.defectValue));
  const post_id = useDashTubePostStopModalStore(useShallow((state) => state.post_id));
  const setSummaryId = useDashTubePostStopModalStore(useShallow((state) => state.setSummaryId));
  const setDefectValue = useDashTubePostStopModalStore(useShallow((state) => state.setDefectValue));
  const clearData = useDashTubePostStopModalStore(useShallow((state) => state.clearData));
  const setOpen = useDashTubePostStopModalStore(useShallow((state) => state.setOpen));

  const { createTubeExtrusionStatus } = useTubeCreateExtrusionStatus();
  const { createTubeVarnishStatus } = useTubeCreateVarnishStatus();
  const { createTubeOffsetStatus } = useTubeCreateOffsetStatus();
  const { createTubeSealantStatus } = useTubeCreateSealantStatus();

  const modalProps = {
    open: open,
    onClose: () => handleClose(),
    title: title,
    height: 600,
    minHeight: 100,
    width: 600,
    onlyCloseButton: false,
  };

  const handleClose = () => {
    setOpen(false);
    clearData();
    setSummaryId(null);
  };

  const handleStop = () => {
    if (summary_id && post_id) {
      const dto: CreateTubeStatusDto = {
        summary_id: summary_id,
        operation_id: null,
        idle: false,
        finished: true,
        employee_id: null,
        defect_value: defectValue,
      };
      switch (post_id) {
        case 1:
          createTubeExtrusionStatus(dto);
          break;
        case 2:
          createTubeVarnishStatus(dto);
          break;
        case 3:
          createTubeOffsetStatus(dto);
          break;
        case 4:
          createTubeSealantStatus(dto);
          break;
        default:
          break;
      }
    }

    handleClose();
  };

  const closeButtonProps: ModalButtonProps = {
    label: "Отмена",
    onClick: () => handleClose(),
  };

  const startButtonProps: ModalButtonProps = {
    label: "Завершить",
    disabled: Number(defectValue) === 0,
    onClick: () => handleStop(),
  };

  const Buttons = () => (
    <Stack direction="row" sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 2 }}>
      <ModalButton {...startButtonProps} />
      <ModalButton {...closeButtonProps} />
    </Stack>
  );

  return (
    <ModalLayout props={modalProps} buttons={<Buttons />}>
      <Stack gap={2}>
        <Typography level="body-sm">
          Вы действительно хотите закончить работу поста? Дальнейшее введение данных будет невозможно...
        </Typography>
        <Typography level="body-sm">Для завершения работы поста необходимо внести количество брака</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={4} justifyContent="flex-start">
        <Typography level="body-md">Брак: </Typography>
        <Input
          type="number"
          value={defectValue}
          onChange={(e) => setDefectValue(e.target.value)}
          sx={{ width: "100px" }}
          slotProps={{
            input: {
              min: 0,
              max: 999,
              step: 0.01,
            },
          }}
        />
      </Stack>
    </ModalLayout>
  );
}

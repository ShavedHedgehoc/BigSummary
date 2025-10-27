import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import { useShallow } from "zustand/shallow";
import ModalMobileLayout from "../../shared/layouts/modal-mobile-layout";
import { useColorScheme } from "@mui/joy";
import { useCreateHistoryMobile } from "../../shared/api/use-create-history-mobile";
import { useCreateHistoryDirectMobile } from "../../shared/api/use-create-history-direct-mobile";
import { useForemanActionModalStore } from "./store/use-foreman-action-modal-store";
import { formatTimeToString } from "../../shared/helpers/date-time-formatters";
import { useAuthStore } from "../auth/store/auth-store";

export default function ForemanActionModal() {
  const open = useForemanActionModalStore(useShallow((state) => state.open));
  const record = useForemanActionModalStore(useShallow((state) => state.record));
  const startButtonEnabled = useForemanActionModalStore(useShallow((state) => state.startButtonEnabled));
  const finishButtonEnabled = useForemanActionModalStore(useShallow((state) => state.finishButtonEnabled));
  const cancelStartButtonEnabled = useForemanActionModalStore(useShallow((state) => state.cancelStartButtonEnabled));
  const cancelFinishButtonEnabled = useForemanActionModalStore(useShallow((state) => state.cancelFinishButtonEnabled));
  const setOpen = useForemanActionModalStore(useShallow((state) => state.setOpen));
  const user = useAuthStore(useShallow((state) => state.user));
  const addHistoryDirectMobile = useCreateHistoryDirectMobile();
  const addHistoryMobile = useCreateHistoryMobile();

  const makeHistoryRecord = (id: number, state: string) => {
    if (user) {
      const data: AddHistoryDto = {
        record_id: id,
        boil_value: null,
        historyType: state,
        userId: user.id,
        employeeId: null,
        note: null,
        history_note: null,
      };
      addHistoryMobile(data);
    }
  };

  const modalProps = {
    open: open,
    onClose: () => setOpen(false),

    height: 600,
    minHeight: 600,
    width: 800,
    onlyCloseButton: false,
  };

  const handleStartButtonClick = () => {
    setOpen(false);
    record && record.id && makeHistoryRecord(record.id, "product_in_progress");
  };

  const handleFinishButtonClick = () => {
    setOpen(false);
    record && record.id && makeHistoryRecord(record.id, "product_finished");
  };

  const handleCancelStartButtonClick = () => {
    if (user) {
      const data: AddHistoryDto = {
        record_id: record ? record.id : null,
        boil_value: null, //add state to store
        historyType: "product_pass", // condition between boil & record = > state
        userId: user.id,
        employeeId: null,
        note: null,
        history_note: "Отмена ошибочного внесения",
      };
      setOpen(false);
      addHistoryDirectMobile(data);
    }
  };

  const handleCancelFinishButtonClick = () => {
    if (user) {
      const data: AddHistoryDto = {
        record_id: record ? record.id : null,
        boil_value: null, //add state to store
        historyType: "product_in_progress", // condition between boil & record = > state
        userId: user.id,
        employeeId: null,
        note: null,
        history_note: "Отмена ошибочного внесения",
      };
      setOpen(false);
      addHistoryDirectMobile(data);
    }
  };

  const CardComponent = () => {
    const { mode } = useColorScheme();
    if (!record) {
      return <div>Запись на присвоена</div>;
    }
    return (
      <Sheet
        variant="outlined"
        // slotProps={{ root: { onClick: () => handleOpenHistoryModalButtonClick() } }}
        sx={[
          {
            borderRadius: "sm",
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            gap: 1,
            px: 2,
            py: 1,
          },
          () => ({
            //   bgcolor: "neutral.softBg",
            //   color: mode === "light" ? "var(--joy-palette-neutral-400)" : "white",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#94a3b8" : "#1f2937",
            ...(record.stateValue === "product_pass" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#4ade80" : "#15803d",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#16a34a" : "#bbf7d0",
            }),
            ...(record.stateValue === "product_finished" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#e879f9" : "#a21caf",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#c026d3" : "#f5d0fe",
            }),
            ...(record.stateValue === "product_in_progress" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#38bdf8" : "#0369a1",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#0284c7" : "#bae6fd",
            }),
            ...(record.stateValue === "product_fail" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#f87171" : "#b91c1c",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#dc2626" : "#fecaca",
            }),
            ...(record.stateValue === "product_check" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#facc15" : "#a16207",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#ca8a04" : "#fef08a",
            }),
            ...(record.stateValue === "product_correct" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#facc15" : "#a16207",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#ca8a04" : "#fef08a",
            }),
            ...(!record.stateValue &&
              record.isSet && {
                //   color: "common.white",
                //   bgcolor: mode === "light" ? "#94a3b8" : "#475569",
                color: mode === "light" ? "common.white" : "common.black",
                bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
              }),

            ...(record.stateValue === "plug_pass" && {
              // color: "common.white",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
            }),
            ...(record.stateValue === "base_check" && {
              // color: "common.white",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
            }),
            ...(record.stateValue === "base_correct" && {
              // color: "common.white",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
            }),
            ...(record.stateValue === "base_continue" && {
              // color: "common.white",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
            }),
          }),
        ]}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start", fontSize: "2rem", fontWeight: "semibold" }}>
          <Box>{record.conveyor}</Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "1rem" }}>
          <Box>{record.product}</Box>
          <Box>{record.boil}</Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "1rem" }}>
          <Box>План:</Box>
          <Box>{record.plan}</Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "1rem" }}>
          <Box>Годен до:</Box>
          <Box>{record.bbf}</Box>
        </Box>
        {record.history_note && (
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 1, justifyContent: "space-between", fontSize: "1rem" }}
          >
            <Box>Комментарий лаборатории:</Box>

            <Box>{record.history_note}</Box>
          </Box>
        )}
        {/* <Box sx={{ display: "flex", width: "100%", fontSize: "1rem" }}>
          <Box sx={{ textAlign: "justify" }}>Примечание: {record.note}</Box>
        </Box> */}
        {/* {record.state !== "-" &&
          record.stateValue !== "base_check" &&
          record.stateValue !== "base_correct" &&
          record.stateValue !== "base_continue" &&
          record.stateValue !== "plug_pass" &&
          record.stateValue !== "base_fail" && (
            <Box
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                display: "flex",
                justifyContent: "flex-start",
                color: "white",
                fontSize: "1rem",
              }}
            >
              {formatTimeToString(record.stateTime)}
            </Box>
          )} */}
      </Sheet>
    );
  };
  const StatusComponent = () => {
    const { mode } = useColorScheme();
    if (!record) {
      return <div>Запись на присвоена</div>;
    }
    if (record.state === "-") {
      return;
    }
    return (
      <Sheet
        variant="outlined"
        // slotProps={{ root: { onClick: () => handleOpenHistoryModalButtonClick() } }}
        sx={[
          {
            borderRadius: "sm",
            display: "flex",
            //    flexGrecord: 1,
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 3,
          },
          () => ({
            //   bgcolor: "neutral.softBg",
            //   color: mode === "light" ? "var(--joy-palette-neutral-400)" : "white",
            color: mode === "light" ? "common.white" : "common.black",
            bgcolor: mode === "light" ? "#94a3b8" : "#1f2937",
            ...(record.stateValue === "product_pass" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#4ade80" : "#15803d",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#16a34a" : "#bbf7d0",
            }),
            ...(record.stateValue === "product_finished" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#e879f9" : "#a21caf",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#c026d3" : "#f5d0fe",
            }),
            ...(record.stateValue === "product_in_progress" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#38bdf8" : "#0369a1",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#0284c7" : "#bae6fd",
            }),
            ...(record.stateValue === "product_fail" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#f87171" : "#b91c1c",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#dc2626" : "#fecaca",
            }),
            ...(record.stateValue === "product_check" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#facc15" : "#a16207",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#ca8a04" : "#fef08a",
            }),
            ...(record.stateValue === "product_correct" && {
              // color: "common.white",
              // bgcolor: mode === "light" ? "#facc15" : "#a16207",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#ca8a04" : "#fef08a",
            }),
            ...(!record.stateValue &&
              record.isSet && {
                //   color: "common.white",
                //   bgcolor: mode === "light" ? "#94a3b8" : "#475569",
                color: mode === "light" ? "common.white" : "common.black",
                bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
              }),

            ...(record.stateValue === "plug_pass" && {
              // color: "common.white",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
            }),
            ...(record.stateValue === "base_check" && {
              // color: "common.white",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
            }),
            ...(record.stateValue === "base_correct" && {
              // color: "common.white",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
            }),
            ...(record.stateValue === "base_continue" && {
              // color: "common.white",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#4b5563" : "#e5e7eb",
            }),
          }),
        ]}
      >
        <Box
          sx={[
            {
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "1rem",
            },
            // () => ({
            //   ...(record.stateValue === "base_check" && {
            //     color: mode === "light" ? "#fef08a" : "#fde047",
            //   }),
            //   ...(record.stateValue === "base_correct" && {
            //     color: mode === "light" ? "#fef08a" : "#fde047",
            //   }),
            //   ...(record.stateValue === "base_continue" && {
            //     color: mode === "light" ? "#fef08a" : "#fde047",
            //   }),
            //   ...(record.stateValue === "plug_pass" && {
            //     color: mode === "light" ? "#bbf7d0" : "#86efac",
            //   }),
            //   ...(record.stateValue === "base_fail" && {
            //     color: mode === "light" ? "#fecaca" : "#fca5a5",
            //   }),
            // }),
          ]}
        >
          <Box sx={{ width: "100%", textAlign: "center" }}>
            {record.state !== "-" &&
              record.stateValue !== "base_check" &&
              record.stateValue !== "base_correct" &&
              record.stateValue !== "base_continue" &&
              record.stateValue !== "plug_pass" &&
              record.stateValue !== "base_fail" &&
              `${record.state} - ${formatTimeToString(record.stateTime)}`}
            {(record.stateValue === "base_check" ||
              record.stateValue === "base_correct" ||
              record.stateValue === "base_continue" ||
              record.stateValue === "plug_pass" ||
              record.stateValue === "base_fail") &&
              `${record.state}`}
          </Box>
        </Box>
      </Sheet>
    );
  };

  const ButtonsComponent = () => {
    const { mode } = useColorScheme();
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          width: "100%",
        }}
      >
        {startButtonEnabled && (
          <Sheet
            variant="outlined"
            slotProps={{ root: { onClick: () => handleStartButtonClick() } }}
            sx={[
              {
                borderRadius: "sm",
                display: "flex",
                width: "100%",
                flexDirection: "record",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 3,
              },
              () => ({
                // bgcolor: "var(--joy-palette-success-500)",
                // color: mode === "light" ? "var(--joy-palette-neutral-400)" : "white",
                color: mode === "light" ? "common.white" : "common.black",
                bgcolor: mode === "light" ? "#0d9488" : "#99f6e4",
              }),
            ]}
          >
            <Box sx={{ width: "100%", textAlign: "center" }}>Начать фасовку</Box>
          </Sheet>
        )}
        {finishButtonEnabled && (
          <Sheet
            variant="outlined"
            slotProps={{ root: { onClick: () => handleFinishButtonClick() } }}
            sx={[
              {
                borderRadius: "sm",
                display: "flex",
                width: "100%",
                flexDirection: "record",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 3,
              },
              () => ({
                // bgcolor: "var(--joy-palette-success-500)",
                // color: mode === "light" ? "var(--joy-palette-neutral-400)" : "white",
                color: mode === "light" ? "common.white" : "common.black",
                bgcolor: mode === "light" ? "#0d9488" : "#99f6e4",
              }),
            ]}
          >
            <Box sx={{ width: "100%", textAlign: "center" }}>Закончить фасовку</Box>
          </Sheet>
        )}
        {cancelStartButtonEnabled && (
          <Sheet
            variant="outlined"
            slotProps={{ root: { onClick: () => handleCancelStartButtonClick() } }}
            sx={[
              {
                borderRadius: "sm",
                display: "flex",
                width: "100%",
                flexDirection: "record",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 3,
              },
              () => ({
                // bgcolor: "var(--joy-palette-danger-500)",
                // color: mode === "light" ? "var(--joy-palette-neutral-400)" : "white",
                color: mode === "light" ? "common.white" : "common.black",
                bgcolor: mode === "light" ? "#e11d48" : "#fecdd3",
              }),
            ]}
          >
            <Box sx={{ width: "100%", textAlign: "center" }}>Отменить начало фасовки</Box>
          </Sheet>
        )}
        {cancelFinishButtonEnabled && (
          <Sheet
            variant="outlined"
            slotProps={{ root: { onClick: () => handleCancelFinishButtonClick() } }}
            sx={[
              {
                borderRadius: "sm",
                display: "flex",
                width: "100%",
                flexDirection: "record",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 3,
              },
              () => ({
                // bgcolor: "var(--joy-palette-danger-500)",
                // color: mode === "light" ? "var(--joy-palette-neutral-400)" : "white",
                color: mode === "light" ? "common.white" : "common.black",
                bgcolor: mode === "light" ? "#e11d48" : "#fecdd3",
              }),
            ]}
          >
            <Box sx={{ width: "100%", textAlign: "center" }}>Отменить окончание фасовки</Box>
          </Sheet>
        )}

        <Sheet
          variant="outlined"
          slotProps={{ root: { onClick: () => setOpen(false) } }}
          sx={[
            {
              borderRadius: "sm",
              display: "flex",
              width: "100%",
              flexDirection: "record",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 3,
            },
            () => ({
              //   bgcolor: "var(--joy-palette-neutral-500)",
              //   color: mode === "light" ? "var(--joy-palette-neutral-400)" : "white",
              color: mode === "light" ? "common.white" : "common.black",
              bgcolor: mode === "light" ? "#525252 " : "#e5e5e5",
            }),
          ]}
        >
          <Box sx={{ width: "100%", textAlign: "center" }}>Закрыть</Box>
        </Sheet>
      </Box>
    );
  };

  return (
    <ModalMobileLayout props={modalProps}>
      <CardComponent />
      <StatusComponent />
      <ButtonsComponent />
    </ModalMobileLayout>
  );
}

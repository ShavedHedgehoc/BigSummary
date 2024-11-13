import React from "react";

import Input from "@mui/joy/Input";

import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { useShallow } from "zustand/shallow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";

import { useEditModalStore } from "./store/use-edit-modal-store";
import ConveyorService from "../../shared/api/services/conveyor-service";
import handleError from "../../shared/api/http/handleError";
import ModalLayout, { ModalLayoutProps } from "../../shared/layouts/modal-layout";

const ValueInput = () => {
  const value = useEditModalStore(useShallow((state) => state.value));
  const setValue = useEditModalStore(useShallow((state) => state.setValue));
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
      value={value}
      disabled={true}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Введите наименование конвейера"
    />
  );
};

const BarcodeInput = () => {
  const barcode = useEditModalStore(useShallow((state) => state.barcode));
  const setBarcode = useEditModalStore(useShallow((state) => state.setBarcode));
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

const ContentComponent = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl size="sm">
        <ValueInput />
        <FormHelperText>
          <Typography level="body-xs" sx={{ pl: 1 }}>
            Наименование конвейера
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
    </Box>
  );
};

const ButtonComponent = () => {
  const client = useQueryClient();
  const setOpen = useEditModalStore(useShallow((state) => state.setOpen));
  const clearData = useEditModalStore(useShallow((state) => state.clearData));

  const id = useEditModalStore(useShallow((state) => state.id));
  const value = useEditModalStore(useShallow((state) => state.value));
  const barcode = useEditModalStore(useShallow((state) => state.barcode));

  const { mutate: update } = useMutation({
    mutationFn: ConveyorService.updateConveyor,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["conveyors"] });
      enqueueSnackbar("Данные конвейера успешно обновлены", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(error, { variant: "error", anchorOrigin: { vertical: "top", horizontal: "right" } });
      }
    },
  });

  const updateConveyor = () => {
    if (value !== "" && barcode !== "" && id) {
      update({ id: id, value: value, barcode: barcode });
      setOpen(false);
      clearData();
    }
  };

  const cancelUpdate = () => {
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
        disabled={!(value !== "" && barcode !== "")}
        onClick={() => updateConveyor()}
      >
        Изменить
      </Button>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        onClick={() => cancelUpdate()}
      >
        Отмена
      </Button>
    </React.Fragment>
  );
};

export default function ConveyorEditModal() {
  const open = useEditModalStore(useShallow((state) => state.open));
  const setOpen = useEditModalStore(useShallow((state) => state.setOpen));

  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Редактирование данных конвейера",
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

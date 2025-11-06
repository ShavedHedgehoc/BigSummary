import { Box, Button, Typography } from "@mui/joy";
import { useShallow } from "zustand/react/shallow";

import { useBoilsUploadFormStore } from "./store/use-boils-upload-form-store";
import { useBoilsUploadUploadModalStore } from "./store/use-boils-upload-upload-modal-store";
import { useBoilsUploadEndUploadModalStore } from "./store/use-boils-upload-end-upload-modal";
import { useUploadBoil } from "./use-upload-boil";

export default function BoilsUploadFormLoader() {
  const { uploadBoil } = useUploadBoil();

  const dataForUpload = useBoilsUploadFormStore(useShallow((state) => state.dataForUpload));
  const isValid = useBoilsUploadFormStore(useShallow((state) => state.isValid));
  const setOpenUploadModal = useBoilsUploadUploadModalStore(useShallow((state) => state.setOpen));
  const setToProcess = useBoilsUploadUploadModalStore(useShallow((state) => state.setToProcess));
  const increaseSuccess = useBoilsUploadUploadModalStore(useShallow((state) => state.increaseSuccess));
  const increaseFail = useBoilsUploadUploadModalStore(useShallow((state) => state.increaseFail));
  const increaseProcessed = useBoilsUploadUploadModalStore(useShallow((state) => state.increaseProcessed));
  const setOpenEndUploadModal = useBoilsUploadEndUploadModalStore(useShallow((state) => state.setOpen));

  const upload = async () => {
    if (dataForUpload.length > 0) {
      setToProcess(dataForUpload.length);
      setOpenUploadModal(true);
      for (let i = 0; i < dataForUpload.length; i++) {
        const result = await uploadBoil(dataForUpload[i]);
        if (result.value === 1) {
          increaseSuccess();
        } else {
          increaseFail();
          //   console.log(dataForUpload[i]);
        }
        increaseProcessed();
      }
    }
    setOpenUploadModal(false);
    setOpenEndUploadModal(true);
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography level="body-sm" color="neutral">
          Загрузите варки
        </Typography>

        <Button
          color="neutral"
          variant="outlined"
          size="sm"
          component="span"
          disabled={!isValid}
          sx={{
            display: "flex",
            fontWeight: "normal",
            fontSize: "small",
            width: "200px",
          }}
          onClick={() => upload()}
        >
          Загрузка
        </Button>
      </Box>
    </>
  );
}

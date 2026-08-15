import { Box, Typography } from "@mui/joy";
import { useDocumentDetailAddHistoryModalStore } from "../store/use-document-detail-add-history-modal-store";
import { useShallow } from "zustand/react/shallow";

export default function DocumentDetailAddHistoryModalInfo() {
  const row = useDocumentDetailAddHistoryModalStore(useShallow((state) => state.row));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box>
        <Typography level="body-sm">Код 1С: {row?.productId}</Typography>
      </Box>
      <Box>
        <Typography level="body-sm">Артикул: {row?.product}</Typography>
      </Box>
      <Box>
        <Typography level="body-sm">Партия: {row?.boil}</Typography>
      </Box>
    </Box>
  );
}

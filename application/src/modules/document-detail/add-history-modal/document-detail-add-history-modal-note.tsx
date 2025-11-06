import { Box, Button, FormControl, Textarea, Typography } from "@mui/joy";
import { useDocumentDetailAddHistoryModalFormStore } from "../store/use-document-detail-add-history-modal-form-store";
import { useShallow } from "zustand/react/shallow";

export default function DocumentDetailAddHistoryModalNote() {
  const historyNote = useDocumentDetailAddHistoryModalFormStore(useShallow((state) => state.historyNote));
  const setHistoryNote = useDocumentDetailAddHistoryModalFormStore(useShallow((state) => state.setHistoryNote));
  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <FormControl size="sm" sx={{ display: "flex", flexGrow: 1 }}>
        <Textarea
          placeholder="Введите комментарий..."
          minRows={4}
          size="sm"
          required
          value={historyNote}
          onChange={(e) => setHistoryNote(e.target.value)}
          sx={[
            {
              "&:focus-within": {
                "--Textarea-focusedHighlight": "var(--joy-palette-neutral)",
              },
            },
            { display: "flex", width: "100%", flexGrow: 1 },
          ]}
          endDecorator={
            <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", pb: 0.5, pr: 0.5 }}>
              <Button
                color="neutral"
                variant="outlined"
                size="sm"
                disabled={historyNote === ""}
                onClick={() => setHistoryNote("")}
              >
                <Typography level="body-xs">Очистить</Typography>
              </Button>
            </Box>
          }
        />
      </FormControl>
    </Box>
  );
}

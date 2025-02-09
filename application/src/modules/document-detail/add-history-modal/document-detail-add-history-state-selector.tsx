import * as React from "react";
import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";
import { useDocumentDetailAddHistoryModalFormStore } from "../store/use-document-detail-add-history-modal-form-store";

import HistoryTypeService from "../../../shared/api/services/history-types-service";
import { Box, FormControl, FormHelperText, Option, Select, SelectStaticProps } from "@mui/joy";
import { useDocumentDetailAddHistoryModalStore } from "../store/use-document-detail-add-history-modal-store";

export default function DocumentDetailAddHistoryModalStateSelector() {
  const action: SelectStaticProps["action"] = React.useRef(null);
  const selectedHistoryType = useDocumentDetailAddHistoryModalFormStore(
    useShallow((state) => state.selectedHistoryType)
  );
  const setSelectedHistoryType = useDocumentDetailAddHistoryModalFormStore(
    useShallow((state) => state.setSelectedHistoryType)
  );
  const historyTypeSelectorOptions = useDocumentDetailAddHistoryModalFormStore(
    useShallow((state) => state.historyTypeSelectorOptions)
  );
  const fillHistoryTypeSelectorOptions = useDocumentDetailAddHistoryModalFormStore(
    useShallow((state) => state.fillHistoryTypeSelectorOptions)
  );
  const row = useDocumentDetailAddHistoryModalStore(useShallow((state) => state.row));

  useQuery({
    queryKey: ["history_types_options"],
    queryFn: async () => {
      const data = row?.water_base_id
        ? await HistoryTypeService.getAllHistoryTypes()
        : await HistoryTypeService.getProductsHistoryTypes();

      if (data) {
        fillHistoryTypeSelectorOptions(data);
        setSelectedHistoryType(data[0].value);
        return data;
      }
    },
  });

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl size="sm" id={"plants"} sx={{ width: "100%" }}>
        <FormHelperText>Выбор статуса</FormHelperText>
        <Select
          action={action}
          size="sm"
          placeholder={"Выберите статус"}
          value={selectedHistoryType}
          slotProps={{
            button: { sx: { whiteSpace: "nowrap" } },
            listbox: { sx: { zIndex: 999999 } },
          }}
          sx={{
            // minWidth: "220px",
            // maxWidth: "220px",
            display: "flex",
            flexGrow: 1,
            mt: 1,
          }}
          onChange={(event: React.SyntheticEvent | null, newValue: string | null) => {
            event && newValue && setSelectedHistoryType(newValue);
          }}
        >
          {historyTypeSelectorOptions.map((state) => (
            <Option value={state.value} key={state.id}>
              <FormControl size="sm">{state.description}</FormControl>
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

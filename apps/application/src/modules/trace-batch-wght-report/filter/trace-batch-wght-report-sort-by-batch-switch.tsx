import { useShallow } from "zustand/react/shallow";

import { Box, FormControl, FormHelperText, Switch } from "@mui/joy";
import { Typography } from "@mui/joy";
import { useTraceBatchWghtReportFilterStore } from "../store/use-trace-batch-wght-report-filter-store";
import { TraceBatchWghtReportFilterParams } from "./trace-batch-wght-report-filter-params";

export default function TraceBatchWghtReportFilterSortByBatchSwitch() {
  const toFilter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.filter.sortByBatch));
  const changeFilter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.changeFilter));

  return (
    <Box sx={{ display: "flex", pt: 2, alignItems: "stretch" }}>
      <FormControl size="sm" id={TraceBatchWghtReportFilterParams.COMPARE}>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "stretch", gap: 2 }}>
          {toFilter ? <Typography color="neutral">НЕТ</Typography> : <Typography>НЕТ</Typography>}

          <Switch
            color="neutral"
            disabled={false}
            size="md"
            variant="outlined"
            checked={toFilter}
            onChange={(event) =>
              changeFilter({
                key: TraceBatchWghtReportFilterParams.SORT_BY_BATCH,
                value: event.target.checked ? "true" : "false",
              })
            }
          />
          {toFilter ? <Typography>ДА</Typography> : <Typography color="neutral">ДА</Typography>}
        </Box>
        <FormHelperText>Сортировка по партиям</FormHelperText>
      </FormControl>
    </Box>
  );
}

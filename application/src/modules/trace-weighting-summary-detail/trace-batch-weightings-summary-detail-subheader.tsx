import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Params } from "../../shared/router/params";
import { Box, Typography } from "@mui/joy";

export default function TraceBatchWeightingsSummaryDetailSubHeader() {
  const [searchParams] = useSearchParams();
  const authorName: string | null = searchParams.get(Params.TRACE_BATCH_WGHT_SUMMARY_AUTHOR_NAME);
  const startDate: string | null = searchParams.get(Params.TRACE_BATCH_WGHT_SUMMARY_START_DATE);
  const endDate: string | null = searchParams.get(Params.TRACE_BATCH_WGHT_SUMMARY_END_DATE);
  return (
    <React.Fragment>
      <Box>
        <Typography sx={{ paddingTop: 1, paddingBottom: 1 }}>
          Сотрудник: {authorName}, период: {startDate === endDate ? startDate : `с ${startDate} по ${endDate}`}
        </Typography>
      </Box>
    </React.Fragment>
  );
}

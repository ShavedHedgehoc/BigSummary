import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Params } from "../../shared/router/params";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";

export default function TraceBatchWeightingsSummaryDetailHeader() {
  const [searchParams] = useSearchParams();
  const authorName: string | null = searchParams.get(Params.TRACE_BATCH_WGHT_SUMMARY_AUTHOR_NAME);
  const startDate: string | null = searchParams.get(Params.TRACE_BATCH_WGHT_SUMMARY_START_DATE);
  const endDate: string | null = searchParams.get(Params.TRACE_BATCH_WGHT_SUMMARY_END_DATE);
  return (
    <React.Fragment>
      <BreadCrumbHeader
        breadcrumbs={["Весовой участок", "Выработка сотрудников", `${authorName}, ${startDate} - ${endDate}`]}
      />
      <MainPageHeader pageTitle={"Выработка"} />
    </React.Fragment>
  );
}

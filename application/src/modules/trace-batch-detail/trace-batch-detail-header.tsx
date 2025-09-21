import * as React from "react";
import { useParams } from "react-router-dom";
import { Params } from "../../shared/router/params";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import { formatDateToString } from "../../shared/helpers/date-time-formatters";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import { useTraceBatch } from "./use-trace-batch";

export default function TraceBatchDetailHeader() {
  const params = useParams<Params.TRACE_BATCH_PARAMS>();
  const batch_id: string | undefined = params.batch_id;
  const { isSuccess, data } = useTraceBatch(batch_id);
  return (
    <React.Fragment>
      <BreadCrumbHeader
        breadcrumbs={[
          "Варка",
          isSuccess && data.batch_id
            ? `${data.marking}, партия ${data.batch_name} - ${formatDateToString(data.date)} (${data.plant})`
            : "",
        ]}
      />
      <MainPageHeader
        pageTitle={`Варка ${
          isSuccess && data.batch_id
            ? `${data.marking}, партия ${data.batch_name} - ${formatDateToString(data.date)} (${data.plant})`
            : ""
        }`}
      />
    </React.Fragment>
  );
}

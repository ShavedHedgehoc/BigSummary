import * as React from "react";

import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";

import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import { FetchTraceBatchWghtReportDetailDto } from "../../shared/api/services/trace-batchs-service";

export default function TraceBatchWghtReportDetailHeader({ dto }: { dto: FetchTraceBatchWghtReportDetailDto }) {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Весовой участок", "Отчет по взвешиваниям", `${dto.batchName}`]} />
      <MainPageHeader pageTitle={`Варка ${dto.batchName}`} />
    </React.Fragment>
  );
}

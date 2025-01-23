import * as React from "react";
import { useParams } from "react-router-dom";
import { Params } from "../../shared/router/params";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
import { useDoc } from "./use-doc";
import { formatDateToString } from "../../shared/helpers/date-time-formatters";
import MainPageHeader from "../../components/headers/MainPageHeader";

export default function DocumentDetailHeader() {
  const params = useParams<Params.SUMMARY_PARAMS>();
  const doc_id: string | undefined = params.summary_id;
  const { isSuccess, data } = useDoc(doc_id);
  return (
    <React.Fragment>
      <BreadCrumbHeader
        breadcrumbs={["Сводка", isSuccess && data.id ? `${data.plants.value} - ${formatDateToString(data.date)}` : ""]}
      />
      <MainPageHeader
        pageTitle={`Подробная сводка (${
          isSuccess && data.id ? `${data.plants.value} - ${formatDateToString(data.date)}` : ""
        })`}
      />
    </React.Fragment>
  );
}

import * as React from "react";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
export default function TubeRecordsUploadHeader() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Загрузка сводок (тубы)"]} />
      <MainPageHeader pageTitle={"Загрузка сводок (тубы)"} />
    </React.Fragment>
  );
}

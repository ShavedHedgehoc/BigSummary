import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";

export default function TubeRecordDetailHeader() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Тубы"]} />
      <MainPageHeader pageTitle={`Подробные записи`} />
    </React.Fragment>
  );
}

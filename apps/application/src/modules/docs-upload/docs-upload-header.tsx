import * as React from "react";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
export default function DocsUploadHeader() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Загрузка сводок"]} />
      <MainPageHeader pageTitle={"Загрузка сводок"} />
    </React.Fragment>
  );
}

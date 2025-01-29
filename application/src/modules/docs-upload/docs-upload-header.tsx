import * as React from "react";
import MainPageHeader from "../../components/headers/MainPageHeader";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
export default function DocsUploadHeader() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Загрузка сводок"]} />
      <MainPageHeader pageTitle={"Загрузка сводок"} />
    </React.Fragment>
  );
}

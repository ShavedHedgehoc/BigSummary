import * as React from "react";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
export default function BasesUploadHeader() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Обновление основ"]} />
      <MainPageHeader pageTitle={"Обновление основ"} />
    </React.Fragment>
  );
}

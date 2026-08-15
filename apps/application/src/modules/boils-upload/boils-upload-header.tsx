import * as React from "react";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
export default function BoilsUploadHeader() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Прослеживаемость", "Загрузка варок"]} />
      <MainPageHeader pageTitle={"Загрузка варок"} />
    </React.Fragment>
  );
}

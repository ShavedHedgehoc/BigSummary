import * as React from "react";
import MainPageHeader from "../../components/headers/MainPageHeader";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
export default function RegulationsUpsertHeader() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Обновление регламента"]} />
      <MainPageHeader pageTitle={"Обновление регламента"} />
    </React.Fragment>
  );
}

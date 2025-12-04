import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";

export default function TubeEmployees() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Тубы", "Сотрудники"]} />
      <MainPageHeader pageTitle={"Сотрудники"} />
    </React.Fragment>
  );
}

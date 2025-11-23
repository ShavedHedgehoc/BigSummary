import * as React from "react";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
export default function UploadTubePicturesHeader() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Админитратор", "Загрузка картинок"]} />
      <MainPageHeader pageTitle={"Загрузка картинок"} />
    </React.Fragment>
  );
}

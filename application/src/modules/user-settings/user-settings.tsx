import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";

export default function UserSettings() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Настройки"]} />
    </React.Fragment>
  );
}

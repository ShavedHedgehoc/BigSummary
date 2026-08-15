import * as React from "react";
import { useParams } from "react-router-dom";
import { Params } from "../../shared/router/params";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import { formatDateToString } from "../../shared/helpers/date-time-formatters";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import { useInventory } from "./use-inventory";

export default function InventoryDetailHeader() {
  const params = useParams<Params.INVENTORY_PARAMS>();
  const inventory_id: string | undefined = params.inventory_id;
  const { isSuccess, data } = useInventory(inventory_id);
  return (
    <React.Fragment>
      <BreadCrumbHeader
        breadcrumbs={["Переучет", isSuccess && data.id ? `${data.plant_name} - ${formatDateToString(data.date)}` : ""]}
      />
      <MainPageHeader
        pageTitle={`Данные переучета (
          ${isSuccess && data.id ? `${data.plant_name} - ${formatDateToString(data.date)}` : ""}
          )`}
      />
    </React.Fragment>
  );
}

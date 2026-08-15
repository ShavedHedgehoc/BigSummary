import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import TrademarksPagination from "./trademarks-pagination";
import TrademarksFilter from "./filter/trademark-filter";
import TrademarksTable from "./trademarks-table";

export default function Trademarks() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Прослеживаемость", "Торговые названия"]} />
      <MainPageHeader pageTitle={"Торговые названия"} />
      <TrademarksFilter />
      <TrademarksTable />
      <TrademarksPagination />
    </React.Fragment>
  );
}

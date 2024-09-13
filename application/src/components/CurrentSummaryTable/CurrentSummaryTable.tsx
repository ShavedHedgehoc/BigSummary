import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import withVisible from "../common/WithVisible";
import TableComponent from "./TableComponent";
import TableMdComponent from "./TableMdComponent";
import TableListComponent from "./TableListComponent";
import TableLoaderComponent from "../tables/TableLoaderComponent";
import TableNotFoundComponent from "../tables/TableNotFoundComponent";

export interface CurrentSummaryTableProps {
  role: "user" | "technologist" | "laboratory";
}

function CurrentSummaryTable(props: CurrentSummaryTableProps) {
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    if (store.PlantStore.currentPlant != null) {
      // console.log(`render all table after change plant ${store.PlantStore.currentPlant.value}`);
      store.SummaryStore.fetchRecords(store.PlantStore.currentPlant?.id?.toString());
    }
  }, [store.PlantStore.currentPlant]);

  const Loader = withVisible(TableLoaderComponent);
  const NotFound = withVisible(TableNotFoundComponent);

  return (
    <React.Fragment>
      <Loader visible={store.SummaryStore.renderLoader} />
      <NotFound visible={store.SummaryStore.noRecordsFound} />
      {store.SummaryStore.renderTable && <TableComponent role={props.role} />}
      {store.SummaryStore.renderTable && <TableMdComponent role={props.role} />}
      {store.SummaryStore.renderTable && <TableListComponent role={props.role} />}
    </React.Fragment>
  );
}
export default observer(CurrentSummaryTable);

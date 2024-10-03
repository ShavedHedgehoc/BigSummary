import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import withVisible from "../../common/WithVisible";
import TableLoaderComponent from "../TableLoaderComponent";
import TableNotFoundComponent from "../TableNotFoundComponent";
import SummaryListTableComponent from "./SummaryListTableComponent";

export interface SummaryListTableProps {
  role: "planner" | "reports";
}

function SummaryListTable(props: SummaryListTableProps) {
  const { store } = React.useContext(Context);
  const Loader = withVisible(TableLoaderComponent);
  const NotFound = withVisible(TableNotFoundComponent);

  return (
    <React.Fragment>
      <Loader visible={store.DocStore.renderLoader} />
      <NotFound visible={store.DocStore.noRecordsFound} />
      {store.DocStore.renderTable && <SummaryListTableComponent role={props.role} />}
      {/* {store.SummaryStore.renderTable && <TableMdComponent role={props.role} />} */}
      {/* {store.SummaryStore.renderTable && <TableListComponent role={props.role} />} */}
    </React.Fragment>
  );
}

export default observer(SummaryListTable);

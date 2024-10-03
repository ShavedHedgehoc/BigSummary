import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import withVisible from "../../common/WithVisible";
import TableLoaderComponent from "../TableLoaderComponent";
import TableNotFoundComponent from "../TableNotFoundComponent";
import RecordDetailTableComponent from "./RecordDetailTableComponent";

function RecordDetailTable() {
  const { store } = React.useContext(Context);

  const Loader = withVisible(TableLoaderComponent);
  const NotFound = withVisible(TableNotFoundComponent);

  return (
    <React.Fragment>
      <Loader visible={store.RecordDetailStore.renderLoader} />
      <NotFound visible={store.RecordDetailStore.noHistoriesFound} />
      {store.RecordDetailStore.renderTable && <RecordDetailTableComponent />}
      {/* {store.SummaryStore.renderTable && <SummaryDetailTableComponent role={props.role} />}
      {store.SummaryStore.renderTable && <TableMdComponent role={props.role} />}
      {store.SummaryStore.renderTable && <TableListComponent role={props.role} />} */}
    </React.Fragment>
  );
}
export default observer(RecordDetailTable);

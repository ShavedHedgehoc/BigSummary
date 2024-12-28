import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import { Context } from "../../main";
import { useParams } from "react-router-dom";
import { Params } from "../../shared/router/AppRouter";
import SummaryDetailTable from "../tables/summary_detail_table/SummaryDetailTable";
import MainPageHeaderWithRenewProp from "../headers/MainPageHeaderWithRenewProp";
import { formatDateToString } from "../../utils";

export default function SummaryDetail() {
  const [initial, setInitial] = React.useState(false);
  const { store } = React.useContext(Context);
  const params = useParams<Params.SUMMARY_PARAMS>();
  const summaryId: string | undefined = params.summary_id;

  const reloadData = () => {
    if (summaryId) {
      store.SummaryStore.fetchRecordsByDocId(summaryId);
    }
  };

  React.useEffect(() => {
    if (summaryId) {
      store.SummaryStore.fetchRecordsByDocId(summaryId).then(() => setInitial(true));
    }
  });

  return (
    <React.Fragment>
      {initial && (
        <BreadCrumbHeader
          breadcrumbs={[
            "Сводка",
            store.SummaryStore.doc
              ? `${store.SummaryStore.doc.plant} - ${formatDateToString(store.SummaryStore.doc.date)}`
              : "",
          ]}
        />
      )}
      {initial && store.SummaryStore.doc && (
        <MainPageHeaderWithRenewProp
          title={`Подробная сводка (${store.SummaryStore.doc.plant} - ${formatDateToString(
            store.SummaryStore.doc.date
          )})`}
          renewData={() => reloadData()}
        />
      )}
      {initial && <SummaryDetailTable />}
    </React.Fragment>
  );
}

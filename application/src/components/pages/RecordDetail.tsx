import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import { Context } from "../../main";
import { useParams } from "react-router-dom";
import { Params } from "../../router/AppRouter";
import MainPageHeaderWithRenewProp from "../headers/MainPageHeaderWithRenewProp";

export default function RecordDetail() {
  const [initial, setInitial] = React.useState(false);
  const { store } = React.useContext(Context);
  const params = useParams<Params.RECORD_PARAMS>();
  const recordId: string | undefined = params.record_id;

  const reloadData = () => {
    if (recordId) {
      //   store.DocDetailStore.fetchDocByid(summaryId);
    }
  };

  React.useEffect(() => {
    if (recordId) {
      //   store.DocDetailStore.fetchDocByid(summaryId).then(() => setInitial(true));
      setInitial(true);
    }
  });

  return (
    <React.Fragment>
      {/* {initial && (
        <BreadCrumbHeader
          breadcrumbs={[
            "Планировщик",
            "Список сводок",
            // store.DocDetailStore.doc
            //   ? `${store.DocDetailStore.doc?.plants.value} - ${store.DocDetailStore.stringDate}`
            //   : "",
          ]}
        />
      )} */}

      {/* {initial && store.DocDetailStore.doc && (
        <MainPageHeaderWithRenewProp
          title={`Подробная сводка (${store.DocDetailStore.doc?.plants.value} - ${store.DocDetailStore.stringDate})`}
          renewData={() => reloadData()}
        />
      )} */}

      {/* {initial && <SummaryDetailTable />} */}
    </React.Fragment>
  );
}

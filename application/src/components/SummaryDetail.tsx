import * as React from "react";
// import { useParams } from "react-router-dom";
// import { Params } from "../router/params";
// import BreadCrumbHeader from "./BreadCrumbHeader";
// import MainPageHeader from "./MainPageHeader";
import { IDoc } from "../types";
// import { Context } from "../main";
// import { observer } from "mobx-react-lite";

// function getParams() {
//   const params = useParams<Params.SUMMARY_PARAMS>();
//   return params.summary_id;
// }

export default function SummaryDetail() {
  //   const location = useLocation();
  //   const { summaryId } = useParams();
  //   const params = useParams<Params.SUMMARY_PARAMS>();
  // const sm = getParams();

  // const { store } = React.useContext(Context);
  const [doc, _] = React.useState<IDoc | null>(null);

  React.useEffect(() => {
    console.log("ffff");
    // store.DocStore.fetchDocByid(location.key).then(() => {
    //   console.log(location.key);
    //   if (store.DocStore.doc) {
    //     setDoc(null);
    //   } else {
    //     setDoc(store.DocStore.doc);
    //   }
    // });
  }, []);

  //   const getDoc = () => {
  //     if (summaryId !== undefined) {
  //       console.log("fetch");
  //       store.DocStore.fetchDocByid(summaryId).then(() => {
  //         // console.log(store.DocStore.doc);
  //         if (store.DocStore.doc) {
  //           setDoc(null);
  //         } else {
  //           setDoc(store.DocStore.doc);
  //         }
  //       });
  //     }
  //   };

  return (
    <React.Fragment>
      {/* <BreadCrumbHeader breadcrumbs={["Планировщик", "Список сводок"]} />
      <MainPageHeader pageTitle={"Список сводок"} /> */}
      {/* {summaryId} */}
      {doc?.plants.value}
    </React.Fragment>
  );
}

// export default observer(SummaryDetail);

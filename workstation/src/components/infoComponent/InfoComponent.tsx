import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import LoadingComponent from "../loadingComponent/LoadingComponent";
import InfoTable from "./InfoTable";
import NotFoundComponent from "./NotFoundComponent";

function InfoComponent() {
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    store.PlantStore.plant && store.RecordsStore.fetchRecords(store.PlantStore.plant.id);
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      store.PlantStore.plant && store.RecordsStore.fetchRecords(store.PlantStore.plant.id);
    }, 30 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <React.Fragment>
      {store.RecordsStore.renderLoader && <LoadingComponent />}
      {store.RecordsStore.renderTable && <InfoTable />}
      {store.RecordsStore.noRecordsFound && <NotFoundComponent />}
    </React.Fragment>
  );
}

export default observer(InfoComponent);

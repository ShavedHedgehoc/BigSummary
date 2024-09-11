import * as React from "react";
import BreadCrumbHeader from "./BreadCrumbHeader";
import MainPageHeaderWithRenew from "./MainPageHeaderWithRenew";
import PlantSelector from "./PlantSelector";
// import CurrentSummaryTable from "./CurrentSummaryTable";
import CurrentSummaryTableTest from "./CurrentSummaryTable/CurrentSummaryTable";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

// export interface CurrentSummaryProps {
//   role: "user" | "technologist" | "laboratory";
// }

// function getPageTitle(role: "user" | "technologist" | "laboratory" | null): string {
//   if (role == "user") {
//     return "Текущая сводка";
//   }
//   if (role == "technologist") {
//     return "Главный технолог";
//   }
//   if (role == "laboratory") {
//     return "Лаборатория";
//   }
//   return "";
// }

// function CurrentSummary(props: CurrentSummaryProps) {
function Technologist() {
  const [initial, setInitial] = React.useState(false);
  const Selector = withVisible(PlantSelector);
  // const title = getPageTitle(props.role);
  const { store } = React.useContext(Context);
  React.useEffect(() => {
    console.log("render page technologist");
    store.PlantStore.fetchPlants().then(() => setInitial(true));
  }, []);
  // React.useEffect(() => {
  //   if (store.PlantStore.currentPlant != null) {
  //     console.log(`fetch records ${store.PlantStore.currentPlant.value}`);
  //     store.SummaryStore.fetchRecords(store.PlantStore.currentPlant?.id?.toString());
  //   }
  // }, [store.PlantStore.currentPlant]);

  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Главный технолог"]} />

      <MainPageHeaderWithRenew
        title={"Главный технолог"}
        // renewData={() => store.SummaryStore.fetchRecords(store.PlantStore.currentPlant.id.toString())}
      />
      {/* <PlantSelector /> */}
      <Selector visible={store.PlantStore.currentPlantExists && initial} />
      {initial && <CurrentSummaryTableTest role={"technologist"} />}
    </React.Fragment>
  );
}

export default observer(Technologist);
function withVisible(wrappedComponent: React.ComponentType) {
  function Visible({ visible, ...otherProps }: { visible: boolean }) {
    if (!visible) return null;
    const WrappedComponent = wrappedComponent;
    return <WrappedComponent {...otherProps} />;
  }
  return Visible;
}

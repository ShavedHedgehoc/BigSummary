import * as React from "react";
import SinglePageWrapper from "../../ui/singlePageWrapper/SinglePageWrapper";
import classes from "./home.module.css";
import { Context } from "../../../main";
import { IPlant } from "../../../services/PlantService";
import { IRecord } from "../../../services/SummaryService";
import SummaryTable from "../../tables/SummaryTable";

export default function Home() {
  const { store } = React.useContext(Context);
  const [plants, setPlants] = React.useState({} as IPlant[]);
  const [selectedPlant, setSelectedPlant] = React.useState<string>();
  const [records, setRecords] = React.useState({} as IRecord[]);

  React.useEffect(() => {
    store.PlantStore.fetchPlants()
      .then(() => setPlants([...store.PlantStore.plants]))
      .then(() => setSelectedPlant(store.PlantStore.plants?.[0].id.toString()))
      .then(() => fillRecords(store.PlantStore.plants?.[0].id.toString()));
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      selectedPlant && fillRecords(selectedPlant);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const onChangeSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlant(e.target.value);
    fillRecords(e.target.value);
  };

  const fillRecords = (plantId: string) => {
    store.SummaryStore.fetchRecords(plantId).then(() => {
      if (store.SummaryStore.error.length > 0) {
        setRecords(() => []);
      } else {
        setRecords(() => [...store.SummaryStore.records]);
      }
    });
  };

  return (
    <SinglePageWrapper>
      <div className={classes.summary_page_container}>
        <div className={classes.summary_page_header}>Текущая сводка</div>
        <div className={classes.summary_page_selector}>
          {plants.length && (
            <select value={selectedPlant} onChange={(e) => onChangeSelector(e)}>
              {plants.map((plant) => (
                <option value={plant.id} key={plant.id}>
                  {plant.value}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className={classes.summary_page_tabs}>
          {records.length > 0 ? <SummaryTable records={records} /> : <div>No records</div>}
        </div>
      </div>
    </SinglePageWrapper>
  );
}

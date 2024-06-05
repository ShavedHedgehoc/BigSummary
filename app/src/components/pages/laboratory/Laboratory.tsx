import * as React from "react";
import SinglePageWrapper from "../../ui/singlePageWrapper/SinglePageWrapper";
import classes from "./laboratory.module.css";
import { Context } from "../../../main";
import { IPlant } from "../../../services/PlantService";
import { IRecord } from "../../../services/SummaryService";
import LaboratoryTable from "../../tables/LaboratoryTable";
import { HistoryCreateDto } from "../../../services/HistoryService";
import Message from "../../message/Message";

export default function Laboratory() {
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

  const onChangeSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlant(e.target.value);
    fillRecords(e.target.value);
  };

  const renewRecords = () => {
    if (typeof selectedPlant === "string") {
      fillRecords(selectedPlant);
    }
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

  const makeHistoryRecord = (boil: string, code: string | null, historyType: string) => {
    const data: HistoryCreateDto = {
      boil: boil,
      historyType: historyType,
      code: code,
      userId: store.AuthStore.user.id,
      employeeId: null,
      note: null,
    };

    store.HistoryStore.createHistory(data)
      .then(() => {
        if (store.HistoryStore.error.length) {
          setMsgText([...store.HistoryStore.error]);
          setMsgSeverity("fail");
          setMsgVisible(true);
        } else {
          renewRecords();
        }
      })
      .then(() => {
        setTimeout(() => {
          setMsgVisible(false);
        }, 2000);
      });
  };

  const [msgVisible, setMsgVisible] = React.useState(false);
  const [msgSeverity, setMsgSeverity] = React.useState("fail");
  const [msgText, setMsgText] = React.useState<string[]>([]);

  return (
    <SinglePageWrapper errorElement={<Message visible={msgVisible} severity={msgSeverity} message={msgText} />}>
      <div className={classes.laboratory_page__container}>
        <div className={classes.laboratory_page__header}>Операционный контроль</div>
        <div className={classes.laboratory_page__subheader}>
          <div className={classes.laboratory_page__selector_field}>
            <p>Площадка:</p>
            {plants.length && (
              <select
                className={classes.laboratory_page__plant_selector}
                value={selectedPlant}
                onChange={(e) => onChangeSelector(e)}
              >
                {plants.map((plant) => (
                  <option value={plant.id} key={plant.id}>
                    {plant.value}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <button className={classes.laboratory_page__button} onClick={() => renewRecords()}>
              Обновить
            </button>
          </div>
        </div>
        <div className={classes.laboratory_page__table}>
          {store.SummaryStore.pending ? (
            <div className={classes.laboratory_page__message}>Загружаю...</div>
          ) : records.length > 0 ? (
            <LaboratoryTable
              records={records}
              pending={store.HistoryStore.pending || store.SummaryStore.pending || msgVisible}
              makeHistoryRecord={(boil, code, historyType) => makeHistoryRecord(boil, code, historyType)}
            />
          ) : (
            <div className={classes.laboratory_page__message}>Записей не найдено...</div>
          )}
        </div>
      </div>
    </SinglePageWrapper>
  );
}

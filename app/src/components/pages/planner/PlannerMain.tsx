import * as React from "react";
import classes from "./plannerMain.module.css";
import { Context } from "../../../main";
import { IDoc } from "../../../services/SummaryService";

export default function PlannerMain() {
  const { store } = React.useContext(Context);
  const [docs, setDocs] = React.useState({} as IDoc[]);

  React.useEffect(() => {
    fillDocs();
  }, []);

  const fillDocs = () => {
    store.DocStore.fetchDocs().then(() => {
      if (store.DocStore.error.length > 0) {
        setDocs(() => []);
      } else {
        setDocs(() => [...store.DocStore.docs]);
      }
    });
  };
  return (
    <div className={classes.planner_main__container}>
      <div className={classes.planner_main__header}> Spisok сводок</div>
      <div className={classes.planner_main__button_container}>
        <button className={classes.planner_main_page__button} onClick={() => fillDocs()}>
          Обновить
        </button>
      </div>
      <div>
        {store.DocStore.pending ? (
          <div className={classes.planner_main_page__message}>Загружаю...</div>
        ) : docs.length > 0 ? (
          docs.map((item) => (
            <div>
              {item.plants.value} - {item.records_count} - {item.histories_count}
            </div>
          ))
        ) : (
          // <planner_mainTable
          //   records={records}
          //   pending={store.HistoryStore.pending || store.SummaryStore.pending || msgVisible}
          //   makeHistoryRecord={(boil, code, historyType) => makeHistoryRecord(boil, code, historyType)}
          // />
          <div className={classes.planner_main_page__message}>Записей не найдено...</div>
        )}
      </div>
    </div>
  );
}

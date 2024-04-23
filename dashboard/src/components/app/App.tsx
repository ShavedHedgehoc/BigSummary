import { useContext, useEffect, useState } from "react";

import "./App.css";
import "@fontsource/roboto";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import Card from "../card/Card";
import { IRecord } from "../../services/SummaryService";

function App() {
  const { store } = useContext(Context);
  const [records, setRecords] = useState({} as IRecord[]);

  let currPage: number;
  currPage = 0;
  const cardsPerPage = 12;

  const setData = (perPage: number) => {
    const recCount = store.SummaryStore.count;
    const start = currPage * cardsPerPage;
    const end = Math.min((currPage + 1) * cardsPerPage, recCount + 1);
    setRecords(store.SummaryStore.records.slice(start, end));
    if (currPage < Math.ceil(recCount / perPage) - 1) {
      currPage = currPage + 1;
    } else {
      currPage = 0;
    }
  };

  useEffect(() => {
    store.SummaryStore.fetchRecords(1).then(() => setData(cardsPerPage));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      store.SummaryStore.fetchRecords(1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(cardsPerPage);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main_container">
      <div className="main_header">
        <h2>{`Сводка по производству ${store.SummaryStore.plants.value} ${new Date()
          .toLocaleString("ru-RU")
          .slice(0, 10)}`}</h2>
      </div>
      <div className="main_content">
        {records.length > 0 ? (
          records.map((item) => (
            <div className="main_card_container" key={`cnt_${item.id}`}>
              <Card item={item} key={item.id} />
            </div>
          ))
        ) : (
          <>"Нет записей"</>
        )}
      </div>
      <div className="main_footer"></div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(App);

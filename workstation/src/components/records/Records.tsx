/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import classes from "./records.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { IHistorieRecord } from "../../store/RecordsStore";

function Record(item: IHistorieRecord) {
  return (
    <div key={item.id}>
      <div>
        {item.historyType.description} {item.record.product.marking} - {item.record.boil.value}
      </div>
      <div>
        {item.employee.name} -{" "}
        {new Date(item.createdAt).toLocaleTimeString("en-US", {
          timeZone: "Europe/Moscow",
          hour12: false,
        })}
      </div>
    </div>
  );
}

function Records() {
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    store.RecordsStore.fetchRecords();
  }, []);
  return (
    <div className={classes.record_container}>
      {store.RecordsStore.records.length > 0 && store.RecordsStore.records.map((item) => Record(item))}
      <p>...</p>
    </div>
  );
}

export default observer(Records);

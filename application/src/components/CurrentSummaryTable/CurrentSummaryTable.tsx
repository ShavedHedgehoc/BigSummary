import * as React from "react";
import { Box, Typography } from "@mui/joy";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import withVisible from "../common/WithVisible";
import TableComponent from "./TableComponent";
import TableMdComponent from "./TableMdComponent";
import TableListComponent from "./TableListComponent";

export interface CurrentSummaryTableProps {
  role: "user" | "technologist" | "laboratory";
}

function CurrentSummaryTable(props: CurrentSummaryTableProps) {
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    if (store.PlantStore.currentPlant != null) {
      // console.log(`render all table after change plant ${store.PlantStore.currentPlant.value}`);
      store.SummaryStore.fetchRecords(store.PlantStore.currentPlant?.id?.toString());
    }
  }, [store.PlantStore.currentPlant]);

  const Loader = withVisible(LoaderComponent);
  const NotFound = withVisible(NotFoundComponent);

  return (
    <React.Fragment>
      <Loader visible={store.SummaryStore.renderLoader} />
      <NotFound visible={store.SummaryStore.noRecordsFound} />
      {store.SummaryStore.renderTable && <TableComponent role={props.role} />}
      {store.SummaryStore.renderTable && <TableMdComponent role={props.role} />}
      {store.SummaryStore.renderTable && <TableListComponent role={props.role} />}
    </React.Fragment>
  );
}
export default observer(CurrentSummaryTable);

const LoaderComponent = () => {
  React.useEffect(() => {
    console.log("Render lodaer component");
  }, []);
  return (
    <React.Fragment>
      <Box
        className="PendingInfoContainer"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Typography color="neutral" level="title-md" variant="plain">
          Загружаю...
        </Typography>
      </Box>
    </React.Fragment>
  );
};

const NotFoundComponent = () => (
  <React.Fragment>
    <Box
      className="NoRecordsFoundContainer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        flexShrink: 1,
        overflow: "auto",
        minHeight: 0,
      }}
    >
      <Typography color="neutral" level="title-md" variant="plain">
        Записей не найдено
      </Typography>
    </Box>
  </React.Fragment>
);

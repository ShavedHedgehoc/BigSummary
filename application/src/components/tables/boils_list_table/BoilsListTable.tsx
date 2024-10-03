import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import withVisible from "../../common/WithVisible";
import TableLoaderComponent from "../TableLoaderComponent";
import TableNotFoundComponent from "../TableNotFoundComponent";
import BoilsListTableComponent from "./BoilsListTableComponent";
import { IBoilsListItem } from "../../../types";

import { AddHistoryDto } from "../../../services/HistoryService";
import BoilAddHistoryModal from "../../modals/BoilsAddHistoryModal";

export interface BoilListTableProps {
  role: "reports" | "laboratory";
}

function BoilsListTable(props: BoilListTableProps) {
  const { store } = React.useContext(Context);
  const [openModal, setOpenModal] = React.useState(false);
  const [currBoil, setCurrBoil] = React.useState({} as IBoilsListItem);
  const [state, setState] = React.useState("");

  const makeRecord = (boil: IBoilsListItem, state: string) => {
    setCurrBoil({ ...boil });
    setState(state);
    setOpenModal(true);
  };

  const processRecord = () => {
    const data: AddHistoryDto = {
      record_id: null,
      boil_value: currBoil.value,
      historyType: state,
      userId: store.AuthStore.user.id,
      employeeId: null,
      note: null,
    };
    store.HistoryStore.createHistory(data).then(() => store.BoilStore.updateBoil(currBoil.id));
  };

  const Loader = withVisible(TableLoaderComponent);
  const NotFound = withVisible(TableNotFoundComponent);

  return (
    <React.Fragment>
      <Loader visible={store.BoilStore.renderLoader} />
      <NotFound visible={store.BoilStore.noRecordsFound} />
      {store.BoilStore.renderTable && (
        <BoilsListTableComponent
          role={props.role}
          makeRecord={({ boil, state }: { boil: IBoilsListItem; state: string }) => makeRecord(boil, state)}
        />
      )}
      {store.BoilStore.renderTable && props.role === "laboratory" && (
        <BoilAddHistoryModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          state={state}
          boil={currBoil}
          processRecord={() => processRecord()}
        />
      )}
      {/* {store.SummaryStore.renderTable && <SummaryDetailTableComponent role={props.role} />}
      {store.SummaryStore.renderTable && <TableMdComponent role={props.role} />}
      {store.SummaryStore.renderTable && <TableListComponent role={props.role} />} */}
    </React.Fragment>
  );
}
export default observer(BoilsListTable);

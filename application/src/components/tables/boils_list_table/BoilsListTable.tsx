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
import BoilsListTableFilterComponent from "./BoilsListTableFilterComponent";
import PaginationComponent from "../PaginationComponent";
import BoilHistoriesListModal from "../../modals/BoilHistoriesListModal";
import NoteModal from "../../modals/NoteModal";

export interface BoilListTableProps {
  role: "reports" | "laboratory";
}

function BoilsListTable(props: BoilListTableProps) {
  const { store } = React.useContext(Context);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openInfoModal, setOpenInfoModal] = React.useState(false);
  const [openNoteModal, setOpenNoteModal] = React.useState(false);
  const [currBoil, setCurrBoil] = React.useState({} as IBoilsListItem);
  const [state, setState] = React.useState("");
  // const [historyNote, setHistoryNote] = React.useState<string>("");

  const makeRecord = (boil: IBoilsListItem, state: string) => {
    setCurrBoil({ ...boil });
    setState(state);
    setOpenAddModal(true);
  };

  const showStatesList = (boil: IBoilsListItem) => {
    setCurrBoil({ ...boil });
    store.BoilDetailStore.fetchHistoriesByBoilId(boil.id.toString());
    setOpenInfoModal(true);
  };

  const showNote = (noteId: number) => {
    store.NoteStore.fetchNoteById(noteId);
    setOpenNoteModal(true);
  };

  // const processRecord = () => {
  // const processRecord = (note:string) => {  state менять в модалке !!!
  const processRecord = (historyNote: string) => {
    const data: AddHistoryDto = {
      record_id: null,
      boil_value: currBoil.value,
      historyType: state,
      userId: store.AuthStore.user.id,
      employeeId: null,
      note: null,
      history_note: historyNote,
    };
    store.HistoryStore.createHistory(data).then(() => store.BoilStore.updateBoil(currBoil.id));
    // .then(() => setHistoryNote(""));
  };

  const processCloseAddModal = () => {
    setOpenAddModal(false);
    // setHistoryNote("");
  };

  const processCloseInfoModal = () => {
    setOpenInfoModal(false);
    //
  };

  const processCloseNoteModal = () => {
    setOpenNoteModal(false);
    //
  };

  const Loader = withVisible(TableLoaderComponent);
  const NotFound = withVisible(TableNotFoundComponent);
  // const Pagination = withVisible(PaginationComponent);
  const Filter = withVisible(BoilsListTableFilterComponent);

  return (
    <React.Fragment>
      <Filter visible={true} />
      <Loader visible={store.BoilStore.renderLoader} />
      <NotFound visible={store.BoilStore.noRecordsFound} />

      {store.BoilStore.renderTable && (
        <BoilsListTableComponent
          role={props.role}
          makeRecord={({ boil, state }: { boil: IBoilsListItem; state: string }) => makeRecord(boil, state)}
          showStatesList={(boil: IBoilsListItem) => showStatesList(boil)}
        />
      )}
      {store.BoilStore.renderTable && props.role === "laboratory" && (
        <BoilAddHistoryModal
          open={openAddModal}
          onClose={() => processCloseAddModal()}
          stateDescription={store.HistoryTypeStore.historyTypeDecription(state)}
          boil={currBoil}
          processRecord={(note) => processRecord(note)}
          // historyNote={historyNote}
          // setHistoryNote={(val) => setHistoryNote(val)}
        />
      )}

      {store.BoilStore.renderTable && props.role === "laboratory" && (
        <BoilHistoriesListModal
          open={openInfoModal}
          onClose={() => processCloseInfoModal()}
          boil={currBoil}
          showNote={(noteId: number) => showNote(noteId)}
        />
      )}
      {store.BoilStore.renderTable && props.role === "laboratory" && (
        <NoteModal open={openNoteModal} onClose={() => processCloseNoteModal()} />
      )}
      {/* {store.SummaryStore.renderTable && <SummaryDetailTableComponent role={props.role} />}
      {store.SummaryStore.renderTable && <TableMdComponent role={props.role} />}
      {store.SummaryStore.renderTable && <TableListComponent role={props.role} />} */}
      <PaginationComponent />
    </React.Fragment>
  );
}
export default observer(BoilsListTable);

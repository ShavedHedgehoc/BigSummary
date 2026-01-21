import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import DashFilter from "./dash-filter";
import DashView from "./dash-view";
import DashHistoryModal from "./dash-history-modal";
import NoteModal from "../../shared/components/note-modal/note-modal";
import { useDashModeStore } from "./store/use-dash-mode-store";
import { useShallow } from "zustand/react/shallow";
import DashTubeView from "./tubes/dash-tube-view";
import DashFinishModal from "./tubes/dash-finish-modal";
import DashTubesConveyorSummariesModal from "./tubes/dash-tubes-conveyor-summaries-modal";
import DashStartModal from "./tubes/dash-start-modal";
import DashTubePostStopModal from "./tubes/dash-tube-post-stop-modal";

export default function Dash() {
  const mode = useDashModeStore(useShallow((state) => state.mode));
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Текущая сводка"]} />
      <MainPageHeader pageTitle={"Текущая сводка"} />
      <DashFilter />
      {mode === "packaging" ? <DashView /> : <DashTubeView />}
      <DashHistoryModal />
      <NoteModal />
      <DashFinishModal />
      <DashStartModal />
      <DashTubesConveyorSummariesModal />
      <DashTubePostStopModal />
    </React.Fragment>
  );
}

import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import DashFilter from "./dash-filter";
import DashView from "./dash-view";
import DashHistoryModal from "./dash-history-modal";
import NoteModal from "../../shared/components/note-modal/note-modal";
import { useDashModeStore } from "./store/use-dash-mode-store";
import { useShallow } from "zustand/react/shallow";
import DashTubeView from "./dash-tube-view";

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
    </React.Fragment>
  );
}

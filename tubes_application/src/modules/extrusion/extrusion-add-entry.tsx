import type { Params } from "@/shared/router/params";
import { useParams } from "react-router-dom";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { PostNames } from "@/shared/helpers/post-names";
import { AppMessages } from "@/shared/resources/app-messages";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useShallow } from "zustand/shallow";
import HeaderComponent from "../../shared/components/headers/header-component";
import TimeComponent from "../../shared/components/lines/time-component";
import UserComponent from "../../shared/components/lines/user-component";
import { useExtrusionConveyorStore } from "./store/use-extrusion-conveyor-store";
import { useExtrusionEmployeeStore } from "./store/use-extrusion-employee-store";
import { useConveyor } from "@/shared/api/use-conveyor";
import Loader from "../../shared/components/info/loader";
import ExtrusionNumericEntryModal from "./entry/modals/extrusion-numeric-entry-modal";
import ExtrusionAddEntryMenu from "./entry/menu/extrusion-add-entry-menu";
import type { AddEntryPageLayoutProps } from "../../shared/components/layouts/add-entry-page-layout";
import AddEntryPageLayout from "../../shared/components/layouts/add-entry-page-layout";
import Info from "../../shared/components/info/info";
import ExtrusionEntries from "./entry/extrusion-entries";
import ExtrusionCloseConfirmModal from "./entry/modals/extrusion-close-confirm-modal";
import ExtrusionEntryAlertModal from "./entry/modals/extrusion-entry-alert-modal";
import ExtrusionBooleanEntryModal from "./entry/modals/extrusion-boolean-entry-modal";
import ExtrusionRadioEntryModal from "./entry/modals/extrusion-radio-entry-modal";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Theme } from "@chakra-ui/react";

export default function ExtrusionAddEntry() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const { data: summaryData, isPending: isPendingSummary } = useActiveSummary(extrusionConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!extrusionConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const addEntryPageLayoutProps: AddEntryPageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={extrusionConveyor.name} postName={PostNames.EXTRUSION} />,
    entriesComponent: <ExtrusionEntries summaryData={summaryData ?? null} />,
    menuComponent: <ExtrusionAddEntryMenu summaryData={summaryData ?? null} />,
    userComponent: <UserComponent employee={employee} />,
    loaderComponent: <Loader />,
    notFoundComponent: <Info message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />,
    isLoading: isPendingSummary,
    isNotFound: !summaryData && !isPendingSummary,
  };

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <AddEntryPageLayout {...addEntryPageLayoutProps} />
        <ExtrusionNumericEntryModal />
        <ExtrusionBooleanEntryModal />
        <ExtrusionRadioEntryModal />
        <ExtrusionCloseConfirmModal />
        <ExtrusionEntryAlertModal />
      </Theme>
    </ColorModeProvider>
  );
}

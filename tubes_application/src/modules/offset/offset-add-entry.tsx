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
import { useConveyor } from "@/shared/api/use-conveyor";
import Loader from "../../shared/components/info/loader";
import type { AddEntryPageLayoutProps } from "../../shared/components/layouts/add-entry-page-layout";
import AddEntryPageLayout from "../../shared/components/layouts/add-entry-page-layout";
import Info from "../../shared/components/info/info";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Theme } from "@chakra-ui/react";
import { useOffsetConveyorStore } from "./store/use-offset-conveyor-store";
import { useOffsetEmployeeStore } from "./store/use-offset-employee-store";
import OffsetEntries from "./entry/offset-entries";
import OffsetAddEntryMenu from "./entry/menu/offset-add-entry-menu";
import OffsetNumericEntryModal from "./entry/modals/offset-numeric-entry-modal";
import OffsetBooleanEntryModal from "./entry/modals/offset-boolean-entry-modal";
import OffsetCloseConfirmModal from "./entry/modals/offset-close-confirm-modal";
import OffsetEntryAlertModal from "./entry/modals/offset-entry-alert-modal";
import OffsetIntegerEntryModal from "./entry/modals/offset-integer-entry-modal";

export default function OffsetAddEntry() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const offsetConveyor = useOffsetConveyorStore(useShallow((state) => state.offsetConveyor));
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));
  const { data: summaryData, isPending: isPendingSummary, isError } = useActiveSummary(offsetConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!offsetConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const addEntryPageLayoutProps: AddEntryPageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={offsetConveyor.name} postName={PostNames.OFFSET} />,
    entriesComponent: <OffsetEntries summaryData={summaryData ?? null} />,
    menuComponent: <OffsetAddEntryMenu summaryData={summaryData ?? null} />,
    userComponent: <UserComponent employee={employee} />,
    loaderComponent: <Loader />,
    notFoundComponent: <Info message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />,
    isLoading: isPendingSummary,
    isNotFound: isError,
  };

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <AddEntryPageLayout {...addEntryPageLayoutProps} />
        <OffsetNumericEntryModal />
        <OffsetIntegerEntryModal />
        <OffsetBooleanEntryModal />
        <OffsetCloseConfirmModal />
        <OffsetEntryAlertModal />
      </Theme>
    </ColorModeProvider>
  );
}

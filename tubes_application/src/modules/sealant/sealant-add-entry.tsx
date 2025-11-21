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
import { useSealantConveyorStore } from "./store/use-sealant-conveyor-store";
import { useSealantEmployeeStore } from "./store/use-sealant-employee-store";
import SealantEntries from "./entry/sealant-entries";
import SealantAddEntryMenu from "./entry/menu/sealant-add-entry-menu";
import SealantNumericEntryModal from "./entry/modals/sealant-numeric-entry-modal";
import SealantBooleanEntryModal from "./entry/modals/sealant-boolean-entry-modal";
import SealantCloseConfirmModal from "./entry/modals/sealant-close-confirm-modal";
import SealantEntryAlertModal from "./entry/modals/sealant-entry-alert-modal";

export default function SealantAddEntry() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const employee = useSealantEmployeeStore(useShallow((state) => state.sealantEmployee));
  const { data: summaryData, isPending: isPendingSummary } = useActiveSummary(sealantConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!sealantConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const addEntryPageLayoutProps: AddEntryPageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={sealantConveyor.name} postName={PostNames.OFFSET} />,
    entriesComponent: <SealantEntries summaryData={summaryData ?? null} />,
    menuComponent: <SealantAddEntryMenu summaryData={summaryData ?? null} />,
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
        <SealantNumericEntryModal />
        <SealantBooleanEntryModal />
        <SealantCloseConfirmModal />
        <SealantEntryAlertModal />
      </Theme>
    </ColorModeProvider>
  );
}

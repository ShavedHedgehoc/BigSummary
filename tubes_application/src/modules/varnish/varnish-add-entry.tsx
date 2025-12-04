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
import { useVarnishConveyorStore } from "./store/use-varnish-conveyor-store";
import { useVarnishEmployeeStore } from "./store/use-varnish-employee-store";
import VarnishEntries from "./entry/varnish-entries";
import VarnishAddEntryMenu from "./entry/menu/varnish-add-entry-menu";
import VarnishNumericEntryModal from "./entry/modals/varnish-numeric-entry-modal";
import VarnishBooleanEntryModal from "./entry/modals/varnish-boolean-entry-modal";
import VarnishCloseConfirmModal from "./entry/modals/varnish-close-confirm-modal";
import VarnishEntryAlertModal from "./entry/modals/varnish-entry-alert-modal";
import VarnishIntegerEntryModal from "./entry/modals/varnish-integer-entry-modal";

export default function VarnishAddEntry() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const varnishConveyor = useVarnishConveyorStore(useShallow((state) => state.varnishConveyor));
  const employee = useVarnishEmployeeStore(useShallow((state) => state.varnishEmployee));
  const { data: summaryData, isPending: isPendingSummary, isError } = useActiveSummary(varnishConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!varnishConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const addEntryPageLayoutProps: AddEntryPageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={varnishConveyor.name} postName={PostNames.VARNISH} />,
    entriesComponent: <VarnishEntries summaryData={summaryData ?? null} />,
    menuComponent: <VarnishAddEntryMenu summaryData={summaryData ?? null} />,
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
        <VarnishNumericEntryModal />
        <VarnishIntegerEntryModal />
        <VarnishBooleanEntryModal />
        <VarnishCloseConfirmModal />
        <VarnishEntryAlertModal />
      </Theme>
    </ColorModeProvider>
  );
}

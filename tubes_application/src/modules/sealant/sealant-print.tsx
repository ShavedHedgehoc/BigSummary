import { useConveyor } from "@/shared/api/use-conveyor";
import { useParams } from "react-router-dom";
import { useSealantConveyorStore } from "./store/use-sealant-conveyor-store";
import { useShallow } from "zustand/shallow";
import { useSealantEmployeeStore } from "./store/use-sealant-employee-store";
import Loader from "@/shared/components/info/loader";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import type { PrintPageLayoutProps } from "@/shared/components/layouts/print-page-layout";
import TimeComponent from "@/shared/components/lines/time-component";
import HeaderComponent from "@/shared/components/headers/header-component";
import { PostNames } from "@/shared/helpers/post-names";
import UserComponent from "@/shared/components/lines/user-component";
import Info from "@/shared/components/info/info";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Theme } from "@chakra-ui/react";
import PrintPageLayout from "@/shared/components/layouts/print-page-layout";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import type { Params } from "@/shared/router/params";
import SealantPrintMenu from "./print/menu/sealant-print-menu";
import SealantBoxConfirmModal from "./print/modals/sealant-box-confirm-modal";
import PrintContent from "./print/print-content";
import { usePrinter } from "./use-printer";

import PrintModal from "./print/modals/print-modal";

export default function SealantPrint() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const employee = useSealantEmployeeStore(useShallow((state) => state.sealantEmployee));
  const { data: summaryData, isPending: isPendingSummary, isError } = useActiveSummary(sealantConveyor?.id ?? null);
  const { data: printerData } = usePrinter(sealantConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!sealantConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const pageLayoutProps: PrintPageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={sealantConveyor.name} postName={PostNames.SEALANT} />,
    mainComponent: <PrintContent summaryData={summaryData ?? null} printerData={printerData ?? null} />,
    menuComponent: <SealantPrintMenu summaryData={summaryData ?? null} />,
    userComponent: <UserComponent employee={employee} />,
    loaderComponent: <Loader />,
    notFoundComponent: <Info message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />,
    isLoading: isPendingSummary,
    isNotFound: isError,
  };

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <PrintPageLayout {...pageLayoutProps} />
        <SealantBoxConfirmModal />
        <PrintModal summaryData={summaryData ?? null} />
      </Theme>
    </ColorModeProvider>
  );
}

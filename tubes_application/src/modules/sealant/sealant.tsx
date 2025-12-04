import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useConveyor } from "@/shared/api/use-conveyor";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import type { Params } from "@/shared/router/params";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import type { PageLayoutProps } from "../../shared/components/layouts/page-layout";
import PageLayout from "../../shared/components/layouts/page-layout";
import TimeComponent from "../../shared/components/lines/time-component";
import HeaderComponent from "../../shared/components/headers/header-component";
import UserComponent from "../../shared/components/lines/user-component";
import ProductionCard from "../../shared/components/cards/production-card/production-card";
import MaterialPieChartComponent from "../../shared/components/charts/material-pie-chart-component";
import Loader from "../../shared/components/info/loader";
import Info from "../../shared/components/info/info";
import ProductionLineChart from "@/shared/components/charts/production-line-chart";
import { PostNames } from "@/shared/helpers/post-names";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Theme } from "@chakra-ui/react";
import SealantMenu from "./dash/menu/sealant-menu";
import SealantAuthModal from "./dash/modals/sealant-auth-modal";
import SealantLogoutAlertModal from "./dash/modals/sealant-logout-alert-modal";
import SealantMaterialScanModal from "./dash/modals/sealant-material-scan-modal";
import SealantParameters from "./dash/sealant-parameters";
import { useSealantConveyorStore } from "./store/use-sealant-conveyor-store";
import { useSealantEmployeeStore } from "./store/use-sealant-employee-store";
import SealantCloseSummaryAlertModal from "./dash/modals/sealant-close-summary-alert-modal";

export default function Sealant() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const employee = useSealantEmployeeStore(useShallow((state) => state.sealantEmployee));
  const { data: summaryData, isPending: isPendingSummary, isError } = useActiveSummary(sealantConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!sealantConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const pageLayoutProps: PageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={sealantConveyor.name} postName={PostNames.SEALANT} />,
    parameterComponent: <SealantParameters summaryData={summaryData ?? null} />,
    materialPieChartComponent: <MaterialPieChartComponent summaryData={summaryData ?? null} postId={4} />,
    productionLineChartComponent: <ProductionLineChart summaryData={summaryData ?? null} postId={4} />,
    productionCardComponent: <ProductionCard summaryData={summaryData ?? null} postId={4} />,
    menuComponent: <SealantMenu />,
    userComponent: <UserComponent employee={employee} />,
    loaderComponent: <Loader />,
    notFoundComponent: <Info message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />,
    isLoading: isPendingSummary,
    isNotFound: isError,
  };

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <PageLayout {...pageLayoutProps} />
        <SealantAuthModal />
        <SealantLogoutAlertModal />
        <SealantMaterialScanModal summary_id={summaryData?.data.id} />
        <SealantCloseSummaryAlertModal />
      </Theme>
    </ColorModeProvider>
  );
}

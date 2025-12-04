import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useConveyor } from "@/shared/api/use-conveyor";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import type { Params } from "@/shared/router/params";
import { useParams } from "react-router-dom";
import { useExtrusionConveyorStore } from "./store/use-extrusion-conveyor-store";
import { useShallow } from "zustand/react/shallow";
import type { PageLayoutProps } from "../../shared/components/layouts/page-layout";
import PageLayout from "../../shared/components/layouts/page-layout";
import TimeComponent from "../../shared/components/lines/time-component";
import HeaderComponent from "../../shared/components/headers/header-component";
import UserComponent from "../../shared/components/lines/user-component";
import { useExtrusionEmployeeStore } from "./store/use-extrusion-employee-store";
import ProductionCard from "../../shared/components/cards/production-card/production-card";
import MaterialPieChartComponent from "../../shared/components/charts/material-pie-chart-component";
import Loader from "../../shared/components/info/loader";
import Info from "../../shared/components/info/info";
import ProductionLineChart from "@/shared/components/charts/production-line-chart";
import ExtrusionParameters from "./dash/extrusion-parameters";
import ExtrusionMenu from "./dash/menu/extrusion-menu";
import ExtrusionAuthModal from "./dash/modals/extrusion-auth-modal";
import { PostNames } from "@/shared/helpers/post-names";
import ExtrusionMaterialScanModal from "./dash/modals/extrusion-material-scan-modal";
import ExtrusionLogoutAlertModal from "./dash/modals/extrusion-logout-alert-modal";
import { Theme } from "@chakra-ui/react";
import { ColorModeProvider } from "@/components/ui/color-mode";
import ExtrusionCloseSummaryAlertModal from "./dash/modals/extrusion-close-summary-alert-modal";

export default function Extrusion() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const { data: summaryData, isPending: isPendingSummary, isError } = useActiveSummary(extrusionConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!extrusionConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const pageLayoutProps: PageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={extrusionConveyor.name} postName={PostNames.EXTRUSION} />,
    parameterComponent: <ExtrusionParameters summaryData={summaryData ?? null} />,
    materialPieChartComponent: <MaterialPieChartComponent summaryData={summaryData ?? null} postId={1} />,
    productionLineChartComponent: <ProductionLineChart summaryData={summaryData ?? null} postId={1} />,

    productionCardComponent: <ProductionCard summaryData={summaryData ?? null} postId={1} />,
    menuComponent: <ExtrusionMenu />,
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
        <ExtrusionAuthModal />
        <ExtrusionLogoutAlertModal />
        <ExtrusionMaterialScanModal summary_id={summaryData?.data.id} />
        <ExtrusionCloseSummaryAlertModal />
      </Theme>
    </ColorModeProvider>
  );
}

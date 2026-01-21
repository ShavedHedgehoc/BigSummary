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
import VarnishMenu from "./dash/menu/varnish-menu";
import VarnishAuthModal from "./dash/modals/varnish-auth-modal";
import VarnishLogoutAlertModal from "./dash/modals/varnish-logout-alert-modal";
import VarnishMaterialScanModal from "./dash/modals/varnish-material-scan-modal";
import VarnishParameters from "./dash/varnish-parameters";
import { useVarnishConveyorStore } from "./store/use-varnish-conveyor-store";
import { useVarnishEmployeeStore } from "./store/use-varnish-employee-store";
import VarnishDefectEntryModal from "./dash/modals/varnish-defect-entry-modal";
import VarnishCloseSummaryModal from "./dash/modals/varnish-close-summary-modal";

export default function Varnish() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const varnishConveyor = useVarnishConveyorStore(useShallow((state) => state.varnishConveyor));
  const employee = useVarnishEmployeeStore(useShallow((state) => state.varnishEmployee));
  const { data: summaryData, isPending: isPendingSummary, isError } = useActiveSummary(varnishConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!varnishConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const pageLayoutProps: PageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={varnishConveyor.name} postName={PostNames.VARNISH} />,
    parameterComponent: <VarnishParameters summaryData={summaryData ?? null} />,
    materialPieChartComponent: <MaterialPieChartComponent summaryData={summaryData ?? null} postId={2} />,
    productionLineChartComponent: <ProductionLineChart summaryData={summaryData ?? null} postId={2} />,
    productionCardComponent: <ProductionCard summaryData={summaryData ?? null} postId={2} />,
    menuComponent: <VarnishMenu />,
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
        <VarnishAuthModal />
        <VarnishLogoutAlertModal />
        <VarnishMaterialScanModal summary_id={summaryData?.data.id} />
        <VarnishCloseSummaryModal />
        <VarnishDefectEntryModal />
      </Theme>
    </ColorModeProvider>
  );
}

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
import ProductionLineChart from "../../shared/components/charts/production-line-chart";
import OffsetMenu from "./dash/menu/offset-menu";
import { useOffsetConveyorStore } from "./store/use-offset-conveyor-store";
import { useOffsetEmployeeStore } from "./store/use-offset-employee-store";
import { PostNames } from "@/shared/helpers/post-names";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Theme } from "@chakra-ui/react";
import OffsetAuthModal from "./dash/modals/offset-auth-modal";
import OffsetLogoutAlertModal from "./dash/modals/offset-logout-alert-modal";
import OffsetMaterialScanModal from "./dash/modals/offset-material-scan-modal";
import OffsetParameters from "./dash/offset-parameters";

export default function Offset() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const offsetConveyor = useOffsetConveyorStore(useShallow((state) => state.offsetConveyor));
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));
  const { data: summaryData, isPending: isPendingSummary } = useActiveSummary(offsetConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!offsetConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const pageLayoutProps: PageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={offsetConveyor.name} postName={PostNames.OFFSET} />,
    parameterComponent: <OffsetParameters summaryData={summaryData ?? null} />,
    materialPieChartComponent: <MaterialPieChartComponent summaryData={summaryData ?? null} postId={3} />,
    productionLineChartComponent: <ProductionLineChart summaryData={summaryData ?? null} postId={3} />,
    productionCardComponent: <ProductionCard summaryData={summaryData ?? null} postId={3} />,
    menuComponent: <OffsetMenu />,

    userComponent: <UserComponent employee={employee} />,
    loaderComponent: <Loader />,
    notFoundComponent: <Info message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />,
    isLoading: isPendingSummary,
    isNotFound: !summaryData && !isPendingSummary,
  };

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <PageLayout {...pageLayoutProps} />
        <OffsetAuthModal />
        <OffsetLogoutAlertModal />
        <OffsetMaterialScanModal summary_id={summaryData?.data.id} />
      </Theme>
    </ColorModeProvider>
  );
}

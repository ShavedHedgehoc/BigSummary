import React from "react";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useConveyor } from "@/shared/api/use-conveyor";
import NotFound from "@/shared/components/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import type { Params } from "@/shared/router/params";
import { useParams } from "react-router-dom";
import { useExtrusionConveyorStore } from "./store/use-extrusion-conveyor-store";
import { useShallow } from "zustand/react/shallow";
import type { PageLayoutProps } from "../common/page-layout";
import PageLayout from "../common/page-layout";
import TimeComponent from "../common/time-component";
import HeaderComponent from "../common/header-component";
import UserComponent from "../common/user-component";
import { useExtrusionEmployeeStore } from "./store/use-extrusion-employee-store";
import ProductionCard from "../common/production-card";
import MaterialPieChartComponent from "../common/material-pie-chart-component";
import Loader from "../common/loader";
import Info from "../common/info";
import ProductionLineChart from "../common/production-line-chart";
import ExtrusionParameters from "./extrusion/extrusion-parameters";
import ExtrusionMenu from "./extrusion/extrusion-menu";
import ExtrusionAuthModal from "./extrusion/modals/extrusion-auth-modal";
import { PostNames } from "@/shared/helpers/post-names";
import ExtrusionMaterialScanModal from "./extrusion/modals/extrusion-material-scan-modal";
import ExtrusionLogoutAlertModal from "./extrusion/modals/extrusion-logout-alert-modal";

export default function Extrusion() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const { data: summaryData, isPending: isPendingSummary } = useActiveSummary(extrusionConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!extrusionConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const pageLayoutProps: PageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={extrusionConveyor.name} postName={PostNames.EXTRUSION} />,
    parameterComponent: <ExtrusionParameters data={summaryData ?? null} />,
    materialPieChartComponent: <MaterialPieChartComponent summaryId={summaryData?.id} postId={1} />,
    productionLineChartComponent: <ProductionLineChart summaryId={summaryData?.id} postId={1} />,
    productionCardComponent: <ProductionCard data={summaryData ?? null} postId={1} />,
    menuComponent: <ExtrusionMenu />,
    userComponent: <UserComponent employee={employee} />,
    loaderComponent: <Loader />,
    notFoundComponent: <Info message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />,
    isLoading: isPendingSummary,
    isNotFound: !summaryData && !isPendingSummary,
  };

  return (
    <React.Fragment>
      <PageLayout {...pageLayoutProps} />
      <ExtrusionAuthModal />
      <ExtrusionLogoutAlertModal />
      <ExtrusionMaterialScanModal summary_id={summaryData?.id} />
    </React.Fragment>
  );
}

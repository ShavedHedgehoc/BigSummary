import React from "react";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useConveyor } from "@/shared/api/use-conveyor";
import NotFound from "@/shared/components/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import type { Params } from "@/shared/router/params";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import type { PageLayoutProps } from "../common/page-layout";
import PageLayout from "../common/page-layout";
import TimeComponent from "../common/time-component";
import HeaderComponent from "../common/header-component";
import UserComponent from "../common/user-component";
import ProductionCard from "../common/production-card";
import MaterialPieChartComponent from "../common/material-pie-chart-component";
import Loader from "../common/loader";
import Info from "../common/info";
import ProductionLineChart from "../common/production-line-chart";
import OffsetMenu from "./offset-menu";

import OffsetAuthModal from "./offset-auth-modal";
import { useOffsetConveyorStore } from "./store/use-offset-conveyor-store";
import { useOffsetEmployeeStore } from "./store/use-offset-employee-store";
import { PostNames } from "@/shared/helpers/post-names";

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
    parameterComponent: undefined,
    materialPieChartComponent: <MaterialPieChartComponent summaryId={summaryData?.id} postId={3} />,
    productionLineChartComponent: <ProductionLineChart summaryId={summaryData?.id} postId={3} />,
    productionCardComponent: <ProductionCard data={summaryData ?? null} postId={3} />,
    menuComponent: <OffsetMenu />,
    userComponent: <UserComponent employee={employee} />,
    loaderComponent: <Loader />,
    notFoundComponent: <Info message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />,
    isLoading: isPendingSummary,
    isNotFound: !summaryData && !isPendingSummary,
  };

  return (
    <React.Fragment>
      <PageLayout {...pageLayoutProps} />
      <OffsetAuthModal />
    </React.Fragment>
  );
}

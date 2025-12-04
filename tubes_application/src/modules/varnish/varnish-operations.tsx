import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useConveyor } from "@/shared/api/use-conveyor";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import type { Params } from "@/shared/router/params";
import { useParams } from "react-router-dom";
import { useVarnishConveyorStore } from "./store/use-varnish-conveyor-store";
import { useShallow } from "zustand/react/shallow";
import TimeComponent from "../../shared/components/lines/time-component";
import HeaderComponent from "../../shared/components/headers/header-component";
import UserComponent from "../../shared/components/lines/user-component";
import { useVarnishEmployeeStore } from "./store/use-varnish-employee-store";
import Loader from "../../shared/components/info/loader";
import Info from "../../shared/components/info/info";
import { PostNames } from "@/shared/helpers/post-names";
import { Theme } from "@chakra-ui/react";
import { ColorModeProvider } from "@/components/ui/color-mode";
import OperationPageLayout, { type OperationPageLayoutProps } from "@/shared/components/layouts/operation-page-layout";
import VarnishOperationsMenu from "./operations/menu/varnish-operations-menu";
import VarnishOperationContent from "./operations/content/varnish-operations-content";

export default function VarnishOperations() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const varnishConveyor = useVarnishConveyorStore(useShallow((state) => state.varnishConveyor));
  const employee = useVarnishEmployeeStore(useShallow((state) => state.varnishEmployee));
  const { data: summaryData, isPending: isPendingSummary, isError } = useActiveSummary(varnishConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!varnishConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const pageLayoutProps: OperationPageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={varnishConveyor.name} postName={PostNames.VARNISH} />,
    operationComponent: <VarnishOperationContent summaryData={summaryData ?? null} />,
    menuComponent: <VarnishOperationsMenu summaryData={summaryData ?? null} />,
    userComponent: <UserComponent employee={employee} />,
    loaderComponent: <Loader />,
    notFoundComponent: <Info message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />,
    isLoading: isPendingSummary,
    isNotFound: isError,
  };

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <OperationPageLayout {...pageLayoutProps} />
      </Theme>
    </ColorModeProvider>
  );
}

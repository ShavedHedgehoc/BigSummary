import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useConveyor } from "@/shared/api/use-conveyor";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import type { Params } from "@/shared/router/params";
import { useParams } from "react-router-dom";
import { useOffsetConveyorStore } from "./store/use-offset-conveyor-store";
import { useShallow } from "zustand/react/shallow";
import TimeComponent from "../../shared/components/lines/time-component";
import HeaderComponent from "../../shared/components/headers/header-component";
import UserComponent from "../../shared/components/lines/user-component";
import { useOffsetEmployeeStore } from "./store/use-offset-employee-store";
import Loader from "../../shared/components/info/loader";
import Info from "../../shared/components/info/info";
import { PostNames } from "@/shared/helpers/post-names";
import { Theme } from "@chakra-ui/react";
import { ColorModeProvider } from "@/components/ui/color-mode";
import OperationPageLayout, { type OperationPageLayoutProps } from "@/shared/components/layouts/operation-page-layout";
import OffsetOperationsMenu from "./operations/menu/offset-operations-menu";
import OffsetOperationContent from "./operations/content/offset-operations-content";

export default function OffsetOperations() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const offsetConveyor = useOffsetConveyorStore(useShallow((state) => state.offsetConveyor));
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));
  const { data: summaryData, isPending: isPendingSummary, isError } = useActiveSummary(offsetConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!offsetConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const pageLayoutProps: OperationPageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <HeaderComponent conveyorName={offsetConveyor.name} postName={PostNames.OFFSET} />,
    operationComponent: <OffsetOperationContent summaryData={summaryData ?? null} />,
    menuComponent: <OffsetOperationsMenu summaryData={summaryData ?? null} />,
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

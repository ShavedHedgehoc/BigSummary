import { ColorModeProvider } from "@/components/ui/color-mode";
import Loader from "../../shared/components/info/loader";
import TimeComponent from "../../shared/components/lines/time-component";
import { Theme } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import type { Params } from "@/shared/router/params";
import { useExtrusionOperation } from "./use-extrusion-operation";
import { useExtrusionOperationSopStore } from "./store/use-extrusion-operation-sop-store";
import { useShallow } from "zustand/shallow";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import OperationHeaderComponent from "@/shared/components/headers/operation-header-component";
import ExtrusionSopMenu from "./sop/menu/extrusion-sop-menu";
import CarouselSopPageLayout, {
  type CarouselSopPageLayoutProps,
} from "@/shared/components/layouts/carusel-sop-page-layout";
import ExtrusionSopCarousel from "./sop/extrusion-sop-carusel";

export default function ExtrusionSop() {
  const params = useParams<Params.OPERATION_ID>();

  const { isPending } = useExtrusionOperation(params.operation_id ?? null);
  const operation = useExtrusionOperationSopStore(useShallow((state) => state.selectedOperation));

  if (isPending) return <Loader />;
  if (!operation) return <NotFound message={AppMessages.OPERATION_NOT_FOUND} />;

  const pageLayoutProps: CarouselSopPageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <OperationHeaderComponent operation={operation ?? null} />,
    carouselComponent: <ExtrusionSopCarousel operationId={operation.id ?? null} />,
    menuComponent: <ExtrusionSopMenu />,
    loaderComponent: <Loader />,
    notFoundComponent: undefined,
    isLoading: false,
    isNotFound: false,
  };

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <CarouselSopPageLayout {...pageLayoutProps} />
      </Theme>
    </ColorModeProvider>
  );
}

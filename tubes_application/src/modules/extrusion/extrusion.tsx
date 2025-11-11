import type { MainLayoutProps } from "@/shared/layouts/main-page-layout";
import MainPageLayout from "@/shared/layouts/main-page-layout";
import type { ExtrusionLayoutProps } from "./extrusion-layout";
import ExtrusionLayout from "./extrusion-layout";
import ExtrusionReglamentCard from "./extrusion-reglament-card";
import ExtrusionPictureCard from "./extrusion-picture-card";
import ExtrusionUserCard from "./extrusion-user-card";
import ExtrusionTimeCard from "./extrusion-time-card";
import ExtrusionDateCard from "./extrusion-date-card";
import ExtrusionProductCard from "./extrusion-product-card";
import ExtrusionCurrentCard from "./extrusion-current-card";
import ExtrusionNoteCard from "./extrusion-note-card";
import ExtrusionMaterialCard from "./extrusion-material-card";
import ExtrusionMenuCard from "./extrusion-menu-card";
import QualityControlModal from "./extrusion-quality-control-modal/extrusion-quality-control-modal";
import ExtrusionAuthModal from "./extrusion-auth-modal/extruison-auth-modal";
import { useSearchParams } from "react-router-dom";
import { Params } from "@/shared/router/params";
import NotFound from "@/shared/components/not-found";
import { AppMessages } from "@/shared/resources/app-messages";
import { useConveyor } from "@/shared/api/use-conveyor";
import { useExtrusionConveyorStore } from "./store/use-extrusion-conveyor-store";
import { useShallow } from "zustand/react/shallow";
import Loader from "@/shared/components/loader";
import { useActiveSummary } from "./use-active-summary";
import ExtrusionMaterialScanModal from "./extrusion-material-scan-modal";
import ExtrusionRawMaterialTableModal from "./extrusion-raw-material-table-modal/extrusion-raw-material-table-modal";

export default function Extrusion() {
  const [searchParams] = useSearchParams();
  const conveyor: string | null = searchParams.get(Params.CONVEYOR);

  const { isPending } = useConveyor(conveyor);
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const {
    data,
    isPending: isPendingSummary,
    isSuccess,
  } = useActiveSummary(extrusionConveyor ? extrusionConveyor.id : null);

  if (!conveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_SPECIFIED} />;
  if (isPending) return <Loader />;
  if (!extrusionConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const layoutProps: MainLayoutProps = {
    title: `Конвейер ${extrusionConveyor.name}. Экструзия и токарный автомат (Пост 1)`,
  };

  const extrusionLayoutProps: ExtrusionLayoutProps = {
    product: <ExtrusionProductCard />,
    picture: <ExtrusionPictureCard />,
    time: <ExtrusionTimeCard />,
    date: <ExtrusionDateCard />,
    user: <ExtrusionUserCard />,
    reglament: <ExtrusionReglamentCard production_id={data?.production_id} />,
    current: <ExtrusionCurrentCard summary_id={data?.id} production_id={data?.production_id} />,
    note: <ExtrusionNoteCard summary_id={data?.id} />,
    material: <ExtrusionMaterialCard summary_id={data?.id} />,
    menu: <ExtrusionMenuCard />,
  };
  return (
    <MainPageLayout props={layoutProps}>
      {isPendingSummary ? (
        <Loader />
      ) : data && isSuccess ? (
        <>
          <ExtrusionLayout props={extrusionLayoutProps} />
          <QualityControlModal />
          <ExtrusionAuthModal />
          <ExtrusionMaterialScanModal summary_id={data?.id} />
          <ExtrusionRawMaterialTableModal summary_id={data?.id} />
        </>
      ) : (
        <NotFound message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />
      )}
    </MainPageLayout>
  );
}

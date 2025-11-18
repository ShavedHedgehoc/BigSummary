import type { MainLayoutProps } from "@/shared/layouts/main-page-layout";
import MainPageLayout from "@/shared/layouts/main-page-layout";
import type { ExtrusionLayoutProps } from "./extrusion-layout";
import ExtrusionLayout from "./extrusion-layout";
import ExtrusionReglamentCard from "./cards/extrusion-reglament-card";
import ExtrusionPictureCard from "./cards/extrusion-picture-card";
import ExtrusionUserCard from "./cards/extrusion-user-card";
import ExtrusionTimeCard from "./cards/extrusion-time-card";
import ExtrusionDateCard from "./cards/extrusion-date-card";
import ExtrusionProductCard from "./cards/extrusion-product-card";
import ExtrusionCurrentCard from "./cards/extrusion-current-card/extrusion-current-card";
import ExtrusionNoteCard from "./cards/extrusion-note-card";
import ExtrusionMaterialCard from "./cards/extrusion-material-card";
import ExtrusionMenuCard from "./cards/extrusion-menu-card";
import QualityControlModal from "./modals/extrusion-quality-control-modal/extrusion-quality-control-modal";
import ExtrusionAuthModal from "./modals/extrusion-auth-modal/extruison-auth-modal";
import { useParams } from "react-router-dom";
import { Params } from "@/shared/router/params";
import NotFound from "@/shared/components/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import { useConveyor } from "@/shared/api/use-conveyor";
import { useExtrusionConveyorStore } from "./store/use-extrusion-conveyor-store";
import { useShallow } from "zustand/react/shallow";
import Loader from "@/shared/components/loader";
import { useActiveSummary } from "./hooks/use-active-summary";
import ExtrusionMaterialScanModal from "./modals/extrusion-raw-material-scan-modal/extrusion-material-scan-modal";
import ExtrusionRawMaterialTableModal from "./modals/extrusion-raw-material-table-modal/extrusion-raw-material-table-modal";
import ExtrusionInputParametersModal from "./modals/extrusion-input-parameters-modal/extrusion-input-parameters-modal";
import ExtrusionInputParametersAlertModal from "./modals/extrusion-input-parameters-modal/extrusion-input-parameters-alert-modal";
import ExtrusionParamsTableModal from "./modals/extrusion-hardware-params-table-modal/extrusion-hardware-params-table-modal";
import ExtrusionQualityControlCard from "./cards/extrusion-quality-control-card";
import ExtrusionAutLabAssistanthModal from "./modals/extrusion-auth-lab-assistant-modal/extrusion-auth-lab-assistant-modal";
import ExtrusionInputQualityParametersModal from "./modals/extrusion-input-quality-parameters-modal/extrusion-input-quality-parameters-modal";
import ExtrusionQualityParamsTableModal from "./modals/extrusion-quality-params-table-modal/extrusion-quality-params-table-modal";
import { PostNames } from "@/shared/helpers/post-names";

export default function Extrusion() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const conveyor_name: string | undefined = params.conveyor_name;
  if (!conveyor_name) return <NotFound message={AppMessages.CONVEYOR_NOT_SPECIFIED} />;

  const { isPending } = useConveyor(conveyor_name);
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const { data, isPending: isPendingSummary, isSuccess } = useActiveSummary(extrusionConveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!extrusionConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const layoutProps: MainLayoutProps = {
    title: `Конвейер ${extrusionConveyor.name}. ${PostNames.EXTRUSION}`,
  };

  const extrusionLayoutProps: ExtrusionLayoutProps = {
    product: <ExtrusionProductCard />,
    picture: <ExtrusionPictureCard production_code={data?.production.code} />,
    time: <ExtrusionTimeCard />,
    date: <ExtrusionDateCard />,
    user: <ExtrusionUserCard />,
    reglament: <ExtrusionReglamentCard production_id={data?.production_id} />,
    current: <ExtrusionCurrentCard summary_id={data?.id} production_id={data?.production_id} />,
    note: <ExtrusionNoteCard summary_id={data?.id} />,
    material: <ExtrusionMaterialCard summary_id={data?.id} />,
    menu: <ExtrusionMenuCard />,
    quality: <ExtrusionQualityControlCard summary_id={data?.id} />,
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
          <ExtrusionAutLabAssistanthModal />
          <ExtrusionMaterialScanModal summary_id={data?.id} />
          <ExtrusionRawMaterialTableModal summary_id={data?.id} />
          <ExtrusionParamsTableModal summary_id={data?.id} />
          <ExtrusionInputParametersModal summary_id={data?.id} production_id={data?.production_id} />
          <ExtrusionInputQualityParametersModal summary_id={data?.id} production_id={data?.production_id} />
          <ExtrusionInputParametersAlertModal />
          <ExtrusionQualityParamsTableModal summary_id={data?.id} />
        </>
      ) : (
        <NotFound message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />
      )}
    </MainPageLayout>
  );
}

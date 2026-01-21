import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import TubeTresholdsFilter from "./filter/tube-tresholds-filter";
import TubeTresholdsPagination from "./tube-treholds-pagination";
import TubeTresholdsTable from "./tube-tresholds-table";
import { useTubeExtrusionTresholds } from "./use-tube-extrusion-tresholds";
import { useTubeTresholdsFilterStore } from "./store/use-tube-tresholds-filter-store";
import { useTubeTresholdsPaginationStore } from "./store/use-tube-tresholds-pagination-store";
import { useShallow } from "zustand/react/shallow";
import TubeTresholdsToggle from "./tube-tresholds-toggle";
import { useTubeTresholdsPostStore } from "./store/use-tube-tresholds-post-store";
import { useTubeVarnishTresholds } from "./use-tube-varnish-tresholds";
import { useTubeOffsetTresholds } from "./use-tube-offset-tresholds";
import { useTubeSealantTresholds } from "./use-tube-sealant-tresholds";
import TresholdsAddModal from "./add-modal/tresholds-add-modal";

export default function TubeTresholds() {
  const filter = useTubeTresholdsFilterStore(useShallow((state) => state.filter));
  const page = useTubeTresholdsPaginationStore(useShallow((state) => state.page));
  const limit = useTubeTresholdsPaginationStore(useShallow((state) => state.limit));
  const total = useTubeTresholdsPaginationStore(useShallow((state) => state.total));
  const setTotal = useTubeTresholdsPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useTubeTresholdsPaginationStore(useShallow((state) => state.setPage));
  const post = useTubeTresholdsPostStore(useShallow((state) => state.post));

  const {
    isPending: isExtrusionPending,
    data: extrusionData,
    isSuccess: isExtrusionSuccess,
  } = useTubeExtrusionTresholds({ filter: filter, limit: limit, page: page });

  const {
    isPending: isVarnishPending,
    data: varnishData,
    isSuccess: isVarnishSuccess,
  } = useTubeVarnishTresholds({ filter: filter, limit: limit, page: page });

  const {
    isPending: isOffsetPending,
    data: offsetData,
    isSuccess: isOffsetSuccess,
  } = useTubeOffsetTresholds({ filter: filter, limit: limit, page: page });

  const {
    isPending: isSealantPending,
    data: sealantData,
    isSuccess: isSealantSuccess,
  } = useTubeSealantTresholds({ filter: filter, limit: limit, page: page });

  React.useEffect(() => {
    if (extrusionData && extrusionData.total !== total) {
      setTotal(extrusionData.total);
      setPage(1);
    }
  }, [extrusionData?.total]);

  React.useEffect(() => {
    if (varnishData && varnishData.total !== total) {
      setTotal(varnishData.total);
      setPage(1);
    }
  }, [varnishData?.total]);

  React.useEffect(() => {
    if (offsetData && offsetData.total !== total) {
      setTotal(offsetData.total);
      setPage(1);
    }
  }, [offsetData?.total]);

  React.useEffect(() => {
    if (sealantData && sealantData.total !== total) {
      setTotal(sealantData.total);
      setPage(1);
    }
  }, [sealantData?.total]);

  React.useEffect(() => {
    if (limit) {
      setPage(1);
    }
  }, [limit]);

  const table = {
    extrusion: (
      <TubeTresholdsTable data={extrusionData} isPending={isExtrusionPending} isSuccess={isExtrusionSuccess} />
    ),
    varnish: <TubeTresholdsTable data={varnishData} isPending={isVarnishPending} isSuccess={isVarnishSuccess} />,
    offset: <TubeTresholdsTable data={offsetData} isPending={isOffsetPending} isSuccess={isOffsetSuccess} />,
    sealant: <TubeTresholdsTable data={sealantData} isPending={isSealantPending} isSuccess={isSealantSuccess} />,
  }[post];

  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Тубы", "Границы"]} />
      <MainPageHeader pageTitle={"Границы"} />
      <TubeTresholdsToggle />
      <TubeTresholdsFilter />
      {table}
      <TubeTresholdsPagination />
      <TresholdsAddModal />
    </React.Fragment>
  );
}

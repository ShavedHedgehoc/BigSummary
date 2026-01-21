import React from "react";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import TubeRecordDetailExtrusionView from "./extrusion-view/tube-record-detail-extrusion-view";
import TubeRecordDetailToggle from "./tube-record-detail-toggle";
import { useTubeRecordDetail } from "./use-tube-record-detail";
import { useTubeRecordDetailPostStore } from "./store/use-tube-record-detail-post-store";
import { useShallow } from "zustand/react/shallow";
import TubeRecordDetailVarnishView from "./varnish-view/tube-record-detail-varnish-view";
import TubeRecordDetailProduct from "./tube-record-detail-product";
import TubeRecordDetailOffsetView from "./offset-view/tube-record-detail-offset-view";
import TubeRecordDetailSealantView from "./sealant-view/tube-record-detail-sealant-view";

export default function TubeRecordDetailMainView({ summary_id }: { summary_id: string | undefined }) {
  const { data, isError, isPending } = useTubeRecordDetail(summary_id);
  const post = useTubeRecordDetailPostStore(useShallow((state) => state.post));

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isError) {
    return <TableNotFoundComponent />;
  }

  const view = {
    extrusion: <TubeRecordDetailExtrusionView extrusionData={data.extrusion} />,
    varnish: <TubeRecordDetailVarnishView varnishData={data.varnish} />,
    offset: <TubeRecordDetailOffsetView offsetData={data.offset} />,
    sealant: <TubeRecordDetailSealantView sealantData={data.sealant} />,
  }[post];

  return (
    <React.Fragment>
      <TubeRecordDetailProduct productData={data.data} />
      <TubeRecordDetailToggle />
      {view}
    </React.Fragment>
  );
}

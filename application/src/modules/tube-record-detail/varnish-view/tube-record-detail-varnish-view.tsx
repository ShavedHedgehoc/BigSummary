import { TubeRecordDetailDataVarnish } from "../../../shared/api/services/tube-records-service";
import TubeRecordDetailDefect from "../tube-record-detail-defect";
import NotFoundComponent from "../../../shared/components/not-found-component";
import TubeRecordDetailVarnishParamsTable from "./tube-record-varnish-params-table";
import TubeDetailViewLayout from "../../../shared/layouts/tube-detail-view-layout";
import TubeRecordDetailPostState from "../tube-record-detail-post-state";
import TubeRecordDetailOperationsTable from "../operations/tube-record-detail-operations-table";

export default function TubeRecordDetailVarnishView({
  varnishData,
}: {
  varnishData: TubeRecordDetailDataVarnish | null;
}) {
  if (!varnishData) return <NotFoundComponent />;
  return (
    <TubeDetailViewLayout>
      <TubeRecordDetailPostState state={varnishData.status} />
      <TubeRecordDetailVarnishParamsTable paramsData={varnishData.params} />
      <TubeRecordDetailDefect defect={varnishData.defect} />
      <TubeRecordDetailOperationsTable operationsData={varnishData.operations} />
    </TubeDetailViewLayout>
  );
}

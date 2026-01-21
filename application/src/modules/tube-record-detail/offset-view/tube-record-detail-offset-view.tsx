import { TubeRecordDetailDataOffset } from "../../../shared/api/services/tube-records-service";
import TubeRecordDetailOffsetParamsTable from "./tube-record-detail-offset-params-table";
import TubeRecordDetailDefect from "../tube-record-detail-defect";
import NotFoundComponent from "../../../shared/components/not-found-component";
import TubeDetailViewLayout from "../../../shared/layouts/tube-detail-view-layout";
import TubeRecordDetailPostState from "../tube-record-detail-post-state";
import TubeRecordDetailOperationsTable from "../operations/tube-record-detail-operations-table";

export default function TubeRecordDetailOffsetView({ offsetData }: { offsetData: TubeRecordDetailDataOffset | null }) {
  if (!offsetData) return <NotFoundComponent />;
  return (
    <TubeDetailViewLayout>
      <TubeRecordDetailPostState state={offsetData.status} />
      <TubeRecordDetailOffsetParamsTable paramsData={offsetData.params} />
      <TubeRecordDetailDefect defect={offsetData.defect} />
      <TubeRecordDetailOperationsTable operationsData={offsetData.operations} />
    </TubeDetailViewLayout>
  );
}
